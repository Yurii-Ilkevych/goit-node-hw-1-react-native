import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  RefreshControl,
} from "react-native";
import SharedLayout from "../components/SharedLayout";
import {
  AntDesign,
  EvilIcons,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HeaderBtnLogoutPosts from "../components/HeaderBtnLogoutPosts";
import Spinner from "react-native-loading-spinner-overlay";
import { useUser } from "../hooks";
import { usePost } from "../hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ChangeAvatar } from "../components/ChangeAvatar";
import { getPosts } from "../redux/posts/postsOperators";

export default ProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { user } = useUser();
  const { isLoading, errorGetPost, dataPost } = usePost();
  const dispatch = useDispatch();

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
    <SharedLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Spinner visible={isLoading} />
          <View style={styles.profileBox}>
            <ChangeAvatar />
            <HeaderBtnLogoutPosts style={styles.iconBtn} />
            <Text style={styles.userText}>{user.displayName}</Text>

            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
              }
              data={dataPost}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.publishedContainer}>
                  <ImageBackground
                    source={{ uri: item.postsUrl }}
                    style={styles.image}
                  ></ImageBackground>
                  <Text style={styles.tittlePublished}>{item.tittlePost}</Text>
                  <View style={styles.socialBox}>
                    <View style={styles.socialBoxStart}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("CommentsScreen", { post: item });
                        }}
                      >
                        {item.comments.length > 0 ? (
                          <FontAwesome
                            name="comment"
                            size={24}
                            color="#FF6C00"
                          />
                        ) : (
                          <EvilIcons name="comment" size={24} color="#BDBDBD" />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.counter}>{item.comments.length}</Text>
                      <TouchableOpacity style={styles.icon}>
                        <AntDesign
                          name="like2"
                          size={24}
                          color={
                            item.likes > 1
                              ? (color = "#FF6C00")
                              : (color = "#BDBDBD")
                          }
                        />
                      </TouchableOpacity>
                      <Text style={styles.counter}>{item.likes}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.socialBoxEnd}
                      onPress={() => {
                        navigation.navigate("MapScreen", {
                          locate: item.coords,
                        });
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
              showsVerticalScrollIndicator={false}
            ></FlatList>
          </View>
        </View>
      </SafeAreaView>
    </SharedLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    marginTop: 231,
  },
  profileBox: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  userText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    textAlign: "center",
    marginBottom: 32,
  },
  iconBtn: {
    paddingHorizontal: 16,
    position: "absolute",
    right: 0,
    top: 22,
  },
  publishedContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  image: {
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  tittlePublished: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    marginVertical: 8,
  },
  publishedFooter: {
    height: 43,
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
