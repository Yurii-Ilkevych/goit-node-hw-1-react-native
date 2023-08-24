import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { EvilIcons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
 import { useNavigation } from "@react-navigation/native";

export default PostsScreen = ({ route }) => {
  const [countValue, setCounterValue] = useState(0);
   const navigation = useNavigation()

  const { newPhoto, coords, address, localText, tittleName } = route?.params || {};

  console.log(address);

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

        <View style={styles.publishedContainer}>
          {!newPhoto ? (
            <View style={styles.publishedBox}></View>
          ) : (
            <ImageBackground style={styles.image} source={newPhoto}></ImageBackground>
          )}

          <Text style={styles.tittlePublished}>{tittleName? tittleName: "Tittle"}</Text>
          <View style={styles.socialBox}>
            <TouchableOpacity
             onPress={()=>{navigation.navigate("CommentsScreen", {newPhoto})}} 
            style={styles.socialBoxStart}>
              {countValue > 0 ? (
                <FontAwesome name="comment" size={24} color="#FF6C00" />
              ) : (
                <EvilIcons name="comment" size={24} color="#BDBDBD" />
              )}

              <Text
                style={[styles.counter, countValue < 1 && { color: "#BDBDBD" }]}
              >
                {countValue}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBoxEnd} onPress={()=>{navigation.navigate("MapScreen")}}
            //  disabled={!coords || !address}
             >
              <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
              <Text style={styles.locationText}>{address ? <>{address[0].city}, {localText}</>:"Location"}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
