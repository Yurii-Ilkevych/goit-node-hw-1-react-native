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
import { EvilIcons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks";
import { useDispatch } from "react-redux";
import { getPosts } from "../redux/posts/postsOperators";
import { usePost } from "../hooks";
import Spinner from "react-native-loading-spinner-overlay";

export default PostsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { user } = useUser();
  const dispatch = useDispatch();
  const { isLoading, errorGetPost, dataPost } = usePost();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (errorGetPost) {
      this.toast.show(errorGetPost, 2500);
    }
  }, [errorGetPost]);

  const fetchData = async () => {
    setRefreshing(true);
    dispatch(getPosts());
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.userContainer}>
          <Spinner visible={isLoading} />
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
          data={dataPost}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.publishedContainer}>
              <ImageBackground
                style={styles.image}
                source={{ uri: item.postsUrl }}
              ></ImageBackground>

              <Text style={styles.tittlePublished}>{item.tittlePost}</Text>
              <View style={styles.socialBox}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CommentsScreen", { post: item });
                  }}
                  style={styles.socialBoxStart}
                >
                  {item.comments.length > 0 ? (
                    <FontAwesome name="comment" size={24} color="#FF6C00" />
                  ) : (
                    <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  )}

                  <Text
                    style={[
                      styles.counter,
                      item.comments.length < 1 && { color: "#BDBDBD" },
                    ]}
                  >
                    {item.comments.length}
                  </Text>
                </TouchableOpacity>
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
          ListFooterComponent={<View style={styles.publishedFooter}></View>}
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
