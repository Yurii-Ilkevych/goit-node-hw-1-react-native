import { useFonts } from "expo-font";
import RootNavigator from "./src/routes/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    
  );
}
