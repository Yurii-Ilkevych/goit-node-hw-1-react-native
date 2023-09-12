import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, storage } from "../config";
import { nanoid } from "nanoid";
import "react-native-get-random-values";

const uploadPosts = async (storageRef, file) => {
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.log("uploadPosts", error);
    return error;
  }
};

export const createPost = createAsyncThunk(
  "post/create",
  async ({ blob, coords, city, localTittle, tittlePost }, thunkAPI) => {
    const imageBlob = blob;
    try {
      const format = imageBlob.data.name.slice(-3);
      const storageRef = ref(storage, `posts/${nanoid(5)}.${format}`);
      const postsUrl = await uploadPosts(storageRef, imageBlob);
      const postColection = collection(db, "posts");
      const docRef = await addDoc(postColection, {
        postsUrl,
        coords,
        city,
        localTittle,
        tittlePost,
        comments: [],
        liked: [],
        likes: 0,
        uid: auth.currentUser.uid,
      });
      await updateDoc(docRef, {
        id: docRef.id,
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPosts = createAsyncThunk("post/get", async (_, thunkAPI) => {
  const { uid } = auth.currentUser;
  try {
    const data = [];
    const q = query(collection(db, "posts"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getAllPosts = createAsyncThunk(
  "allPost/get",
  async (_, thunkAPI) => {
    try {
      const allData = [];
      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((doc) => {
        allData.push(doc.data());
      });
      return allData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCommentForCurrentPost = createAsyncThunk(
  "get/comment",
  async (id, thunkAPI) => {
    try {
      let dataComment;
      const q = query(collection(db, "posts"), where("id", "==", id));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        dataComment = doc.data().comments;
      });

      return dataComment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async ({ commentText, id, formattedDate }, thunkAPI) => {
    try {
      const collectionRef = collection(db, "posts");
      const documentRef = doc(collectionRef, id);
      await updateDoc(documentRef, {
        comments: arrayUnion({
          id: nanoid(14),
          text: commentText,
          user: auth.currentUser.displayName,
          userURL: auth.currentUser.photoURL,
          dataTime: formattedDate,
        }),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addLike = createAsyncThunk(
  "post/addLike",
  async ({ id, value }) => {
    try {
      const { uid } = auth.currentUser;
      const collectionRef = collection(db, "posts");
      const documentRef = doc(collectionRef, id);
      await updateDoc(documentRef, {
        likes: value,
        liked: arrayUnion({
          userId: uid,
        }),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeLike = createAsyncThunk(
  "post/removeLike",
  async ({ id, value }) => {
    try {
      const { uid } = auth.currentUser;
      const collectionRef = collection(db, "posts");
      const documentRef = doc(collectionRef, id);
      const docSnapshot = await getDoc(documentRef);
      const likedArray = docSnapshot.data().liked;
      const indexToRemove = likedArray.findIndex((item) => item.userId === uid);
      likedArray.splice(indexToRemove, 1);

      await updateDoc(documentRef, {
        likes: value,
        liked: likedArray,
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const listner = async (id, callback) => {
  try {
    const q = query(collection(db, "posts"), where("id", "==", id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          callback();
          unsubscribe();
        }
      });
    });

  } catch (error) {
    return error.message;
  }
};

export const postListner = async (tittlePost, callback) => {
  try {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (
          change.type === "added" &&
          change.doc.data().tittlePost === tittlePost
        ) {
          callback();
          unsubscribe();
          return;
        }
      });
    });
  } catch (error) {
    return error.message;
  }
};
