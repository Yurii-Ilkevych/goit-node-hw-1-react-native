import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default CommentsScreen = () => {
  return (
<SafeAreaView>
    <View style={styles.headerBox}>
    <View style={styles.headerContainer}>
    <Text style={styles.mainText}>Коментарі</Text>
  </View>
  <TouchableOpacity style={styles.iconBtn} onPress={()=>{navigation.navigate("LoginScreen")}}>
  <MaterialIcons name="logout" size={24} color="#BDBDBD"   />
  </TouchableOpacity>
  </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ffffff" },
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
  });