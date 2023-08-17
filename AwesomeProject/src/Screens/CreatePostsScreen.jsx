import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign, SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [localText, setlocalText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ineerContainer}>
        <View style={styles.headerBox}>
          <View style={styles.headerContainer}>
            <Text style={styles.mainTextAdditional}>Створити публікацію</Text>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={24}
                color="#212121CC"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.fotobox}>
            <TouchableOpacity style={styles.cameraBox}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.mainText, styles.commoText]}>
            Завантажте фото
          </Text>
          <TextInput
            placeholder="Назва..."
            style={[styles.input, styles.commoText]}
          ></TextInput>
          <View style={styles.containerLocalIcon}>
            {localText.length === 0 && (
              <View style={styles.boxLocalIcon}>
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#BDBDBD"
                />
                <Text style={[styles.commoText, styles.inputPlaceholder]}>
                  Місцевість...
                </Text>
              </View>
            )}
            <TextInput
              style={[styles.input, styles.inputLocation, styles.commoText]}
              value={localText}
              onChangeText={setlocalText}
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.btnPublish}>
            <Text style={[styles.commoText, styles.btnPublishText]}>
              Опубліковати
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxDellBtn}>
          <TouchableOpacity style={styles.btnDell}>
            <AntDesign name="delete" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  headerContainer: {
    borderBottomWidth: 0.5,
    borderColor: "#0000004D",
    justifyContent: "center",
    alignItems: "center",
  },
  ineerContainer: {
    position: "relative",
    flex: 1,
  },
  headerBox: {
    position: "relative",
    justifyContent: "center",
  },
  iconBtn: {
    position: "absolute",
    left: 16,
    bottom: 10,
  },
  mainTextAdditional: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    paddingVertical: 11,
    color: "#212121",
  },
  mainContainer: {
    paddingHorizontal: 16,
  },
  fotobox: {
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBox: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 32,
  },
  input: {
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 15,
    borderColor: "#E8E8E8",
  },
  commoText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
  },
  inputLocation: {
    marginTop: 16,
    marginBottom: 32,
  },
  containerLocalIcon: {
    position: "relative",
  },
  boxLocalIcon: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 45,
  },
  inputPlaceholder: {
    marginLeft: 4,
  },
  btnPublish: {
    backgroundColor: "#F6F6F6",
    paddingVertical: 16,
    borderRadius: 100,
  },
  btnPublishText: {
    textAlign: "center",
  },
  boxDellBtn: {
    marginBottom: -1,
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    left: "50%",
    marginLeft: -35,
  },
  btnDell: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
