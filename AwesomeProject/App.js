import { useFonts } from "expo-font";
import RootNavigator from "./src/routes/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Toast, { DURATION } from "react-native-easy-toast";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
          <Toast
            ref={(toast) => (this.toast = toast)}
            style={{ backgroundColor: "red" }}
            position="top"
            textStyle={{ color: "white", fontSize: 25 }}
          />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
