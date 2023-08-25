import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import HeaderText from "../components/HeaderText";
import HeaderBtnBack from "../components/HeaderBtnBack";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
import "react-native-gesture-handler";
const MainStack = createStackNavigator();

export default RootNavigator =()=>{

    return (
          <MainStack.Navigator initialRouteName="LoginScreen" >
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
            name="CommentsScreen" component={CommentsScreen}
            options={{
              headerTitle: () => <HeaderText Tittle={"Коментарі"} />,
              headerLeft: () => <HeaderBtnBack />,
              headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D"},
              headerTitleAlign: "center",
            }}
            />
                        <MainStack.Screen
            name="MapScreen" component={MapScreen}
            options={{
              headerTitle: () => <HeaderText Tittle={"Карта"} />,
              headerLeft: () => <HeaderBtnBack />,
              headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D"},
              headerTitleAlign: "center",
            }}
            />
            
          </MainStack.Navigator>
      );
}










