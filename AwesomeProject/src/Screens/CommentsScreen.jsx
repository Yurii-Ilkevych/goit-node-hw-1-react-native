import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useUser } from "../hooks";
import { addComment } from "../redux/posts/postsOperators";
import { useDispatch } from "react-redux";
import { getPosts } from "../redux/posts/postsOperators";
import { usePost } from "../hooks";
import { format } from "date-fns";
import { commentListner } from "../redux/posts/postsOperators";
import Spinner from "react-native-loading-spinner-overlay";

export default CommentsScreen = ({ route }) => {
  const [commentText, setCommentText] = useState("");
  const [hasRendered, setHasRendered] = useState(false);
  const { user } = useUser();
  const { post } = route.params || {};
  const dispatch = useDispatch();
  const { isLoading, errorGetPost, dataPost, errorAddComment } = usePost();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (errorGetPost || (errorAddComment && hasRendered)) {
      this.toast.show(errorGetPost || errorAddComment, 2500);
    } else {
      setHasRendered(true);
    }
  }, [errorGetPost, errorAddComment]);

  const hundleComment = async () => {
    const now = new Date();
    const formattedDate = format(now, "dd MMMM, yyyy | HH:mm");
    const { id } = post;
    dispatch(addComment({ commentText, id, formattedDate }));
    setCommentText("");
    const lisntner = await commentListner(id);
    if (lisntner === "refresh") {
      dispatch(getPosts());
      Keyboard.dismiss();
    } else {
      this.toast.show(lisntner, 2500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <View style={styles.inner}>
          <Spinner visible={isLoading} />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
              style={styles.image}
              source={{ uri: post.postsUrl }}
            ></ImageBackground>
          </TouchableWithoutFeedback>
          <FlatList
            data={dataPost[0]?.comments}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.mainCommentContainer,
                  item.user === user.displayName && {
                    flexDirection: "row-reverse",
                  },
                ]}
              >
                {item.user === user.displayName ? (
                  !user.photoURL ? (
                    <View
                      style={[styles.userAvatar, styles.userAvatarColor]}
                    ></View>
                  ) : (
                    <ImageBackground
                      source={{ uri: user.photoURL }}
                      style={styles.userAvatar}
                    ></ImageBackground>
                  )
                ) : !item.userURL ? (
                  <View style={[styles.userAvatar, styles.userAvatarColor]}>
                    <Text>{item.user}</Text>
                  </View>
                ) : (
                  <ImageBackground
                    source={{ uri: item.userURL }}
                    style={styles.userAvatar}
                  >
                    <Text>{item.user}</Text>
                  </ImageBackground>
                )}

                <View
                  style={[
                    styles.commentContainer,
                    item.user === user.displayName
                      ? { borderTopLeftRadius: 6 }
                      : { borderTopRightRadius: 6 },
                  ]}
                >
                  <Text style={styles.commentText}>{item.text}</Text>
                  <Text
                    style={[
                      styles.dataTimeText,
                      item.user === user.displayName
                        ? { marginRight: "auto" }
                        : { marginLeft: "auto" },
                    ]}
                  >
                    {item.dataTime}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          ></FlatList>

          <View style={styles.boxComment}>
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати..."
              value={commentText}
              onChangeText={setCommentText}
            ></TextInput>
            <TouchableOpacity
              style={styles.btnCommentInput}
              onPress={() => {
                hundleComment();
              }}
            >
              <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  inner: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  flexContainer: {
    flex: 1,
  },
  image: {
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 32,
  },
  publishedBox: {
    backgroundColor: "#E8E8E8",
    height: 240,
    borderRadius: 8,
    marginVertical: 32,
  },
  boxComment: {
    position: "relative",
    marginTop: "auto",
    marginBottom: 16,
    paddingTop: 16,
  },
  commentInput: {
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19.36,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 30,
    color: "#212121",
  },
  btnCommentInput: {
    position: "absolute",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    transform: [{ translateY: -1 }],
    right: 8,
  },
  mainCommentContainer: {
    flexDirection: "row",
    columnGap: 16,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
    justifyContent: "center",
    resizeMode: "cover",
    overflow: "hidden",
    alignItems: "center",
  },
  userAvatarColor: { backgroundColor: "#00000008" },
  commentContainer: {
    backgroundColor: "#00000008",
    padding: 16,
    marginBottom: 24,
    flex: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  dataTimeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,
    marginTop: 8,
    color: "#BDBDBD",
  },
});
