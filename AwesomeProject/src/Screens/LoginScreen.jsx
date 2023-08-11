import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import imageBg from "../assets/Photo_BG-min.jpg";

export default RegistrationScreen = () => {
  const [isFocusInputEmail, setIsFocusInputEmail] = useState(false);
  const [isFocusInputPassword, setIsFocusInputPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={-242}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.boxAuth}>
            <Text style={styles.loginText}>Увійти</Text>

            <View style={styles.boxInput}>
              <TextInput
                onFocus={() => {
                  setIsFocusInputEmail(true);
                }}
                onBlur={() => {
                  setIsFocusInputEmail(false);
                }}
                autoCapitalize="none"
                value={email}
                onChange={() => setEmail()}
                placeholder="Адреса електронної пошти"
                style={[
                  styles.commonInput,
                  isFocusInputEmail && styles.isFocus,
                ]}
              ></TextInput>
              <View style={styles.wrapperPasswordInput}>
                <TextInput
                  onFocus={() => {
                    setIsFocusInputPassword(true);
                  }}
                  onBlur={() => {
                    setIsFocusInputPassword(false);
                  }}
                  secureTextEntry={isShowPassword}
                  autoCapitalize="none"
                  value={password}
                  onChange={() => setPassword()}
                  placeholder="Пароль"
                  style={[
                    styles.commonInput,
                    isFocusInputPassword && styles.isFocus,
                  ]}
                ></TextInput>
                <TouchableOpacity
                  onPress={() => setIsShowPassword((prev) => !prev)}
                >
                  <Text style={styles.btnShowPasswordText}>
                    {isShowPassword ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.btnLoginText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInBtn}>
              <Text style={styles.signInText}>
                Немає акаунту? Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  boxAuth: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  loginText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 32,
  },
  boxInput: {
    rowGap: 16,
  },
  commonInput: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 10,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
  },
  wrapperPasswordInput: {
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
    backgroundColor: "#FFFFFF",
  },
  btnLoginText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#FFFFFF",
    marginRight: "auto",
    marginLeft: "auto",
  },
  btnLogin: {
    borderRadius: 100,
    marginTop: 43,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
    paddingVertical: 16,
  },
  signInBtn: {
    marginBottom: 111,
  },
  signInText: {
    fontFamily: "Roboto-Regular",
    lineHeight: 18.75,
    color: "#1B4371",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
