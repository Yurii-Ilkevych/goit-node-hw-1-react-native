import { StyleSheet, View, ImageBackground } from "react-native";
import image from "../../src/assets/Photo_BG-min.jpg";

export default SharedLayout = ({ children, route }) => {
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
    position: "relative",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
