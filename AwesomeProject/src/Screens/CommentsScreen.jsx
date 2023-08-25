import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    text: "Really love your most recent photo. I've been trying to capture the same thing for a few months and would love some tips!",
    user: "You",
    dataTime: "09 червня, 2020 | 08:40",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    text: "A fast 50mm like f1.8 would help with the bokeh. I've been using primes as they tend to get a bit sharper images.",
    user: "I",
    dataTime: "09 червня, 2020 | 09:14",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    text: "Thank you! That was very helpful!",
    user: "You",
    dataTime: "09 червня, 2020 | 09:20",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f62",
    text: "A fast 50mm like f1.8 would help with the bokeh. I've been using primes as they tend to get a bit sharper images.",
    user: "I",
    dataTime: "09 червня, 2020 | 09:14",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    text: "Thank you! That was very helpful!",
    user: "You",
    dataTime: "09 червня, 2020 | 09:20",
  },
];

export default CommentsScreen = ({ route }) => {
  const [textComment, setTextComment] = useState("");
  const { newPhoto } = route?.params || {};



const hundleComment=()=>{
  console.log(textComment);
  setTextComment("");
}

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >

          <View style={styles.inner}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {!newPhoto ? (
              <View style={styles.publishedBox}></View>
            ) : (
              <ImageBackground
                style={styles.image}
                source={newPhoto}
              ></ImageBackground>
            )}
        </TouchableWithoutFeedback>
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.mainCommentContainer,
                    item.user === "I" && { flexDirection: "row-reverse" },
                  ]}
                >
                  <View style={styles.userAvatar}>
                    <Text>{item.user}</Text>
                  </View>
                  <View style={styles.commentContainer}>
                    <Text style={styles.commentText}>{item.text}</Text>
                    <Text
                      style={[styles.dataTimeText, item.user === "I" ? {marginRight: "auto"} :   {marginLeft: "auto"} ]}
                    >
                      {item.dataTime}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            ></FlatList>

            <View style={styles.boxComment}>
              <TextInput
                style={styles.commentInput}
                placeholder="Коментувати..."
                value={textComment}
                onChangeText={setTextComment}
              ></TextInput>
              <TouchableOpacity
                style={styles.btnCommentInput}
                onPress={()=>{hundleComment()}}
              >
                <AntDesign name="arrowup" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  inner: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  flexContainer: {
    flex: 1,
  },
  image: {
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  publishedBox: {
    backgroundColor: "#E8E8E8",
    height: 240,
    borderRadius: 8,
    marginVertical: 32,
  },
  boxComment: {
    position: "relative",
    marginTop: "auto",
    marginBottom: 16,
    paddingTop: 16,
  },
  commentInput: {
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19.36,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 30,
    color: "#212121",
  },
  btnCommentInput: {
    position: "absolute",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    transform: [{ translateY: -1 }],
    right: 8,
  },
  mainCommentContainer: {
    flexDirection: "row",
    columnGap: 16,
  },
  userAvatar: {
    backgroundColor: "#00000008",
    width: 28,
    height: 28,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  commentContainer: {
    backgroundColor: "#00000008",
    padding: 16,
    marginBottom: 24,
    flex: 1,
  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  dataTimeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,
    marginTop: 8,
    color: "#BDBDBD",
  },
});
