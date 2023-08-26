import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { EvilIcons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    tittle: "Осінь",
    location: "Київ",
    commentLength: 32,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    tittle: "Пляж",
    location: "Одесса",
    commentLength: 46,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    tittle: "Тризуб",
    location: "Бахмут",
    commentLength: 67,
  },
];

export default PostsScreen = ({ route }) => {
  const [countValue, setCounterValue] = useState(0);
  const navigation = useNavigation();

  const { newPhoto, coords, address, localText, tittleName } =
    route?.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.userContainer}>
          <View style={styles.fotoBox}></View>
          <View>
            <Text style={styles.primaryTextUser}>Natali Romanova</Text>
            <Text style={styles.secondaryTextUser}>email@example.com</Text>
          </View>
        </View>

        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.publishedContainer}>
              {!newPhoto ? (
                <View style={styles.publishedBox}></View>
              ) : (
                <ImageBackground
                  style={styles.image}
                  source={newPhoto}
                ></ImageBackground>
              )}

              <Text style={styles.tittlePublished}>
                {tittleName ? tittleName : item.tittle}
              </Text>
              <View style={styles.socialBox}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CommentsScreen", { newPhoto });
                  }}
                  style={styles.socialBoxStart}
                >
                  {item.commentLength > 0 && !newPhoto ? (
                    <FontAwesome name="comment" size={24} color="#FF6C00" />
                  ) : (
                    <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  )}

                  <Text
                    style={[
                      styles.counter,
                      countValue < 1 && !newPhoto & { color: "#BDBDBD" },
                    ]}
                  >
                    {newPhoto ? countValue : item.commentLength}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialBoxEnd}
                  onPress={() => {
                    navigation.navigate("MapScreen", { locate: coords });
                  }}
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.locationText}>
                    {address ? (
                      <>
                        {address[0].city}, {localText}
                      </>
                    ) : (
                      item.location
                    )}
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
  image: {
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryTextUser: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15.23,
  },
  secondaryTextUser: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 12.89,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  publishedContainer: {
    marginTop: 32,
  },
  publishedBox: {
    backgroundColor: "#E8E8E8",
    height: 240,
    borderRadius: 8,
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
