import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SharedLayout from "../components/SharedLayout";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Осінь",
    location: "Київ",
    likes: 234,
    commentLength: 32,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Пляж",
    location: "Одесса",
    likes: 334,
    commentLength: 46,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Тризуб",
    location: "Бахмут",
    likes: 534,
    commentLength: 67,
  },
];

export default ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SharedLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.profileBox}>
            <View style={styles.fotoBox}>
              <TouchableOpacity style={styles.addBtn}>
                <AntDesign name="pluscircleo" style={styles.addSvg} size={25} />
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

            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <View style={styles.publishedContainer}>
                  <View style={styles.publishedBox}></View>
                  <Text style={styles.tittlePublished}>{item.title}</Text>
                  <View style={styles.socialBox}>
                    <View style={styles.socialBoxStart}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("CommentsScreen");
                        }}
                      >
                        <FontAwesome name="comment" size={24} color="#FF6C00" />
                      </TouchableOpacity>
                      <Text style={styles.counter}>{item.commentLength}</Text>
                      <TouchableOpacity style={styles.icon}>
                        <AntDesign name="like2" size={24} color="#FF6C00" />
                      </TouchableOpacity>
                      <Text style={styles.counter}>{item.likes}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.socialBoxEnd}
                      onPress={() => {
                        navigation.navigate("MapScreen");
                      }}
                    >
                      <SimpleLineIcons
                        name="location-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.locationText}>{item.location}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ListFooterComponent={<View style={styles.publishedFooter}></View>}
              keyExtractor={(item) => item.id}
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
    marginTop: 32,
    paddingHorizontal: 16,
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
