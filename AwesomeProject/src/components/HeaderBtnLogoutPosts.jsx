import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../redux/authUser/authOperators";
import { useDispatch } from "react-redux";

export default HeaderBtnLogoutPosts = ({ style }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  handlerLogout = async () => {
    dispatch(logout());
    navigation.navigate("LoginScreen");
  };

  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        handlerLogout();
      }}
    >
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};
