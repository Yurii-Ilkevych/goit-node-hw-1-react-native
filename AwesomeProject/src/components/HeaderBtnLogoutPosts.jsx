import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default HeaderBtnLogoutPosts = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.iconBtn}
      onPress={() => {
        navigation.navigate("LoginScreen");
      }}
    >
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBtn: {
    right: 16,
  },
});
