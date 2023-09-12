import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, storage } from "../config";
import { nanoid } from "nanoid";
import "react-native-get-random-values";

const uploadAvatar = async (storageRef, file) => {
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    return "error";
  }
};

export const registerDB = createAsyncThunk(
  "auth/register",
  async ({ login, email, password, imageBlob }, thunkAPI) => {
    let photoURL = null;
    let storageRef = null;

    try {
      if (imageBlob) {
        const format = imageBlob.data.name.slice(-3);
        storageRef = ref(storage, `avatar/${nanoid(14)}.${format}`);
        photoURL = await uploadAvatar(storageRef, imageBlob);
      }

      if (photoURL === "error") {
        return thunkAPI.rejectWithValue("error");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: login,
        photoURL,
      });
      return { displayName: login, email, photoURL };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authStateChanged = (onChange = () => {}) => {
  onAuthStateChanged(auth, (user) => {
    onChange(user);
  });
};

export const updateUserData = createAsyncThunk(
  "auth/getCarrentUser",
  async ({ displayName, email, photoURL }) => {
    return { displayName, email, photoURL };
  }
);

export const loginDB = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { displayName, photoURL } = credentials._tokenResponse;
      return { displayName, email, photoURL };
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    await auth.signOut();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteCarrentAvatar = createAsyncThunk(
  "auth/deleteAvatar",
  async (photoUrl, thunkAPI) => {
    try {
      const desertRef = ref(storage, photoUrl);
      await deleteObject(desertRef);

      await updateProfile(auth.currentUser, {
        photoURL: "",
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCarrentAvatar = createAsyncThunk(
  "auth/addAvatar",
  async (blob, thunkAPI) => {
    try {
      const format = blob.data.name.slice(-3);
      const storageRef = ref(storage, `avatar/${nanoid(14)}.${format}`);
      const photoURL = await uploadAvatar(storageRef, blob);

      await updateProfile(auth.currentUser, {
        photoURL,
      });
      return auth.currentUser.photoURL;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
