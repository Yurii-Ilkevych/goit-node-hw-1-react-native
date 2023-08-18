import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
import "react-native-gesture-handler";
const MainStack = createStackNavigator();

export default RootNavigator =()=>{

    return (
          <MainStack.Navigator initialRouteName="LoginScreen">
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
          </MainStack.Navigator>
      );
}










