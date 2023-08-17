import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default PostsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainText}>Публікації</Text>
        </View>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
        <View style={styles.userContainer}>
          <View style={styles.fotoBox}></View>
          <View>
            <Text style={styles.primaryTextUser}>Natali Romanova</Text>
            <Text style={styles.secondaryTextUser}>email@example.com</Text>
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
  headerContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#0000004D",
    justifyContent: "center",
  },
  headerBox: {
    position: "relative",
  },
  iconBtn: {
    marginLeft: "auto",
    paddingHorizontal: 16,
    position: "absolute",
    right: 0,
    bottom: 10,
  },
  mainText: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    paddingVertical: 11,
  },
  fotoBox: {
    backgroundColor: "#F6F6F6",
    width: 60,
    height: 60,
    borderRadius: 16,
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
});
