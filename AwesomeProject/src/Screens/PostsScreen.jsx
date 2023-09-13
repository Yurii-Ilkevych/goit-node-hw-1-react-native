import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  EvilIcons,
  FontAwesome,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks";
import { useDispatch } from "react-redux";
import {
  getAllPosts,
  addLike,
  removeLike,
  listner,
} from "../redux/posts/postsOperators";
import { usePost } from "../hooks";
import { errorNotifications } from "../helpers/errorNotifications";
import { auth } from "../redux/config";

export default PostsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const navigation = useNavigation();
  const { user } = useUser();
  const dispatch = useDispatch();
  const { errorAddLike, errorGetAllPost, allData } = usePost();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if ((errorGetAllPost || errorAddLike) && hasRendered) {
      errorNotifications();
    } else {
      setHasRendered(true);
    }
  }, [errorGetAllPost]);

  const fetchData = async () => {
    setRefreshing(true);
    dispatch(getAllPosts());
    setRefreshing(false);
  };

  const hundleAddLike = async (id, likes) => {
    const value = (likes += 1);
    dispatch(addLike({ id, value }));

    listner(id, () => {
      dispatch(getAllPosts());
    });
  };

  const hundleRemoveLike = async (id, likes) => {
    const value = (likes -= 1);
    dispatch(removeLike({ id, value }));

    listner(id, () => {
      dispatch(getAllPosts());
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.userContainer}>
          {user.photoURL ? (
            <ImageBackground
              source={{ uri: user.photoURL }}
              style={styles.fotoBoxWithImage}
            ></ImageBackground>
          ) : (
            <View style={styles.fotoBox}></View>
          )}

          <View>
            <Text style={styles.primaryTextUser}>{user.displayName}</Text>
            <Text style={styles.secondaryTextUser}>{user.email}</Text>
          </View>
        </View>

        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          data={allData}
          keyExtractor={(item) => (item.id ? item.id.toString() : "")}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.publishedContainer}>
              <ImageBackground
                style={styles.image}
                source={{ uri: item.postsUrl }}
              ></ImageBackground>

              <Text style={styles.tittlePublished}>{item.tittlePost}</Text>
              <View style={styles.socialBox}>
                <View style={styles.socialBoxStart}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CommentsScreen", { post: item });
                    }}
                  >
                    {item.comments.some(
                      (commentsItem) =>
                        commentsItem.userId === auth.currentUser.uid
                    ) ? (
                      <FontAwesome name="comment" size={24} color="#FF6C00" />
                    ) : (
                      <EvilIcons name="comment" size={24} color="#BDBDBD" />
                    )}
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.counter,
                      item.comments.length < 1 && { color: "#BDBDBD" },
                    ]}
                  >
                    {item.comments.length}
                  </Text>

                  {item.liked.some(
                    (likedItem) => likedItem.userId === auth.currentUser.uid
                  ) ? (
                    <>
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => hundleRemoveLike(item.id, item.likes)}
                      >
                        <AntDesign name="like2" size={24} color={"#FF6C00"} />
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.counter,
                          item.likes < 1 && { color: "#BDBDBD" },
                        ]}
                      >
                        {item.likes}
                      </Text>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => hundleAddLike(item.id, item.likes)}
                      >
                        <AntDesign name="like2" size={24} color={"#BDBDBD"} />
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.counter,
                          item.likes < 1 && { color: "#BDBDBD" },
                        ]}
                      >
                        {item.likes}
                      </Text>
                    </>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.socialBoxEnd}
                  onPress={() => {
                    navigation.navigate("MapScreen", { locate: item.coords });
                  }}
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.locationText}>
                    {item.localTittle} {item.city}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View
              style={[
                styles.publishedFooter,
                allData.length === 0 && { padding: "100%" },
              ]}
            ></View>
          }
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  innerContainer: {
    marginVertical: 32,
    paddingHorizontal: 16,
  },
  fotoBox: {
    backgroundColor: "#F6F6F6",
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  fotoBoxWithImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: "cover",
    overflow: "hidden",
  },
  image: {
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  primaryTextUser: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15.23,
    color: "#212121",
  },
  secondaryTextUser: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 12.89,
    color: "#212121CC",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },

  publishedContainer: {
    marginBottom: 32,
  },
  tittlePublished: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    marginVertical: 8,
  },
  publishedFooter: {
    padding: 25,
  },
  socialBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialBoxStart: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialBoxEnd: {
    flexDirection: "row",
  },
  counter: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    marginLeft: 6,
  },
  locationText: {
    textDecorationLine: "underline",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    marginLeft: 4,
  },
  icon: {
    marginLeft: 24,
  },
});
