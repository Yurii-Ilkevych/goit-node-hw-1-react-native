import { View, Text, StyleSheet } from "react-native";

export default HeaderTextCreatePostsScreen = () => {
  return (
      <View>
        <Text style={styles.mainTextAdditional}>Створити публікацію</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  mainTextAdditional: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    paddingVertical: 11,
    color: "#212121",
  },
});
