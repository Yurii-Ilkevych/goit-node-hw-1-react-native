import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SharedLayout from "./SharedLayout";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SharedLayout>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.innerContainer}>
            <View style={styles.profileBox}>
              <View style={styles.fotoBox}>
                <TouchableOpacity style={styles.addBtn}>
                  <AntDesign
                    name="pluscircleo"
                    style={styles.addSvg}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {
                  navigation.navigate("LoginScreen");
                }}
              >
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <Text style={styles.userText}>Natali Romanova</Text>
              <View style={styles.publishedContainer}>
                <View style={styles.publishedBox}></View>
                <Text style={styles.tittlePublished}>Tittle</Text>
                <View style={styles.socialBox}>
                  <View style={styles.socialBoxStart}>
                    <TouchableOpacity>
                      <FontAwesome name="comment" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.counter}>0</Text>
                    <TouchableOpacity style={styles.icon}>
                      <AntDesign name="like2" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.counter}>0</Text>
                  </View>
                  <View style={styles.socialBoxEnd}>
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.locationText}>Location</Text>
                  </View>
                </View>
              </View>
              <View style={styles.publishedContainer}>
                <View style={styles.publishedBox}></View>
                <Text style={styles.tittlePublished}>Tittle</Text>
                <View style={styles.socialBox}>
                  <View style={styles.socialBoxStart}>
                    <TouchableOpacity>
                      <FontAwesome name="comment" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.counter}>0</Text>
                    <TouchableOpacity style={styles.icon}>
                      <AntDesign name="like2" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.counter}>0</Text>
                  </View>
                  <View style={styles.socialBoxEnd}>
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.locationText}>Location</Text>
                  </View>
                </View>
              </View>
              <View style={styles.publishedContainer}>
                <View style={styles.publishedBox}></View>
                <Text style={styles.tittlePublished}>Tittle</Text>
                <View style={styles.socialBox}>
                  <View style={styles.socialBoxStart}>
                    <TouchableOpacity>
                      <FontAwesome name="comment" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.counter}>0</Text>
                    <TouchableOpacity style={styles.icon}>
                      <AntDesign name="like2" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.counter}>0</Text>
                  </View>
                  <View style={styles.socialBoxEnd}>
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.locationText}>Location</Text>
                  </View>
                </View>
              </View>
              <View style={styles.publishedContainer}>
                <View style={styles.publishedBox}></View>
                <Text style={styles.tittlePublished}>Tittle</Text>
                <View style={styles.socialBox}>
                  <View style={styles.socialBoxStart}>
                    <TouchableOpacity>
                      <FontAwesome name="comment" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.counter}>0</Text>
                    <TouchableOpacity style={styles.icon}>
                      <AntDesign name="like2" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.counter}>0</Text>
                  </View>
                  <View style={styles.socialBoxEnd}>
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.locationText}>Location</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SharedLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 103,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileBox: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 43,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  fotoBox: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
    marginTop: -60,
    marginBottom: 32,
  },
  addSvg: {
    color: "#FF6C00",
  },
  addBtn: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: 14,
    marginRight: -13,
  },
  userText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    textAlign: "center",
  },
  iconBtn: {
    paddingHorizontal: 16,
    position: "absolute",
    right: 0,
    top: 22,
  },
  publishedContainer: {
    marginVertical: 32,
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