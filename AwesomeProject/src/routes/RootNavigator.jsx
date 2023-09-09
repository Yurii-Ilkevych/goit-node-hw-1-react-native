import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import HeaderText from "../components/HeaderText";
import HeaderBtnBack from "../components/HeaderBtnBack";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
import "react-native-gesture-handler";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  authStateChanged,
  updateUserData,
} from "../redux/authUser/authOperators";
import { useUser } from "../hooks/useUser";
import { useDispatch } from "react-redux";
const MainStack = createStackNavigator();

export default RootNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useUser();

  useEffect(() => {
    authStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        dispatch(updateUserData({ displayName, email, photoURL }));
      } else {
        dispatch(
          updateUserData({ displayName: null, email: null, photoURL: null })
        );
      }
    });
  }, []);

  useEffect(() => {
    if (user.displayName) {
      navigation.navigate("BottomNavigator");
    }
  }, [user]);

  return (
    <MainStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <MainStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerTitle: () => <HeaderText Tittle={"Коментарі"} />,
          headerLeft: () => <HeaderBtnBack />,
          headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D" },
          headerTitleAlign: "center",
        }}
      />
      <MainStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerTitle: () => <HeaderText Tittle={"Карта"} />,
          headerLeft: () => <HeaderBtnBack />,
          headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D" },
          headerTitleAlign: "center",
        }}
      />
    </MainStack.Navigator>
  );
};
