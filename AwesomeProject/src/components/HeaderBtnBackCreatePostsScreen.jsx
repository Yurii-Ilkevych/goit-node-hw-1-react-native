import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default HeaderBtnBackCreatePostsScreen = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.iconBtn}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={24}
        color="#212121CC"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBtn: {
    left: 16,
  },
});
