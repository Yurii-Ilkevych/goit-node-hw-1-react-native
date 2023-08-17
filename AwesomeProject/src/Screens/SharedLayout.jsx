import { StyleSheet, View, ImageBackground, Text } from "react-native";
import image from "../../src/assets/Photo_BG-min.jpg";

export default SharedLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bgImage}>
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
