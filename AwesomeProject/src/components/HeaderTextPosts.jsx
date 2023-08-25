import { View, Text, StyleSheet } from "react-native";

export default HeaderTextPosts = () => {
  return (
    <View >
      <Text style={styles.mainText}>Публікації</Text>
    </View>
  );
};

const styles = StyleSheet.create({
      mainText: {
        fontFamily: "Roboto-Medium",
        fontSize: 17,
        lineHeight: 22,
        paddingVertical: 11,
      },
})