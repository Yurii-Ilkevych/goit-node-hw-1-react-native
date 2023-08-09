import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import imageBg from "../assets/Photo_BG-min.jpg";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default RegistrationScreen = () => {
  const [isFocusInpuLogint, setIsFocusInputLogin] = useState(false);
  const [isFocusInputEmail, setIsFocusInputEmail] = useState(false);
  const [isFocusInputPassword, setIsFocusInputPassword] = useState(false);

  const onHoverInput = (phrase) => {
    switch (phrase) {
      case "login":
        setIsFocusInputLogin(true);
        break;

      case "email":
        setIsFocusInputEmail(true);
        break;
      case "password":
        setIsFocusInputPassword(true);

        break;
      default:
        break;
    }
  };
  const offHoverInput = (phrase) => {
    switch (phrase) {
      case "login":
        setIsFocusInputLogin(false);
        break;
      case "email":
        setIsFocusInputEmail(false);
        break;
      case "password":
        setIsFocusInputPassword(false);
        break;
      default:
        break;
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <View>
        <ImageBackground source={imageBg} style={style.bgImage} />
        <ScrollView
          contentContainerStyle={style.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={style.boxAuth}>
            <View style={style.fotoBox}>
                <TouchableOpacity style={style.addBtn}>
              <AntDesign name="pluscircleo" style={style.addSvg} size={25} />
              </TouchableOpacity>
            </View>
            <Text style={style.registerText}>Реєстрація</Text>
            <View style={style.boxForm}>
              <TextInput
                placeholder="Логін"
                style={[style.commonInput, isFocusInpuLogint && style.isFocus]}
                onFocus={() => {
                  onHoverInput("login");
                }}
                onBlur={() => {
                  offHoverInput("login");
                }}
              />
              <TextInput
                placeholder="Адреса електронної пошти"
                style={[style.commonInput, isFocusInputEmail && style.isFocus]}
                onFocus={() => {
                  onHoverInput("email");
                }}
                onBlur={() => {
                  offHoverInput("email");
                }}
              />
              <View style={style.wrapperPassInput}>
                <TextInput
                  placeholder="Пароль"
                  style={[
                    style.commonInput,
                    isFocusInputPassword && style.isFocus,
                  ]}
                  keyboardType="default"
                  onFocus={() => {
                    onHoverInput("password");
                  }}
                  onBlur={() => {
                    offHoverInput("password");
                  }}
                />
                <TouchableOpacity>
                  <Text style={style.btnShowPasswordText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={style.btnRegister}>
              <Text style={style.btnRegisterText}>Зареєстуватися</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.signInBtn}><Text style={style.signInText}>Вже є акаунт? Увійти</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 2,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    width: screenWidth,
    height: screenHeight,
  },
  boxAuth: {
    backgroundColor: "#FFFFFF",
    flex: 2,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 200,
  },
  fotoBox: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: -60,
  },
  addSvg: {
    color: "#FF6C00",
  },
  addBtn: {
width:25,
height:25,
borderRadius: 100,
marginLeft: "auto",
marginTop: "auto",
marginRight: -12,
marginBottom: 19,
  },
  registerText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 32,
  },
  boxForm: {
    marginTop: 32,
    alignItems: "center",
    rowGap: 16,
  },
  commonInput: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 10,
  },
  wrapperPassInput: {
    position: "relative",
  },
  btnShowPasswordText: {
    color: "#1B4371",
    position: "absolute",
    bottom: 15,
    right: 16,
  },
  isFocus: {
    borderColor: "#FF6C00",
  },
  btnRegisterText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    paddingTop: 16,
    paddingBottom: 16,
    color: "#FFFFFF",
    marginRight: "auto",
    marginLeft: "auto",
  },
  btnRegister: {
    width: 343,
    borderRadius: 100,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 43,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  signInBtn: {
    marginBottom: 32
  },
  signInText: {
    fontFamily: "Roboto-Regular",
    lineHeight: 18.75,
    color: "#1B4371",
    marginRight: "auto",
    marginLeft: "auto",
},
});
