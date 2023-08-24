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
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SharedLayout from "../components/SharedLayout";

export default RegistrationScreen = () => {
  const [isFocusInpuLogint, setIsFocusInputLogin] = useState(false);
  const [isFocusInputEmail, setIsFocusInputEmail] = useState(false);
  const [isFocusInputPassword, setIsFocusInputPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [login, setlogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const onRegister = () => {
    console.log({
      login: login,
      email: email,
      password: password,
    });
    setlogin("");
    setEmail("");
    setPassword("");
    navigation.navigate("BottomNavigator");
  };

  return (
    <SharedLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-187}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>

            <View style={styles.boxAuth}>
              <View style={styles.fotoBox}>
                <TouchableOpacity style={styles.addBtn}>
                  <AntDesign
                    name="pluscircleo"
                    style={styles.addSvg}
                    size={25}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.registerText}>Реєстрація</Text>

              <View style={styles.boxInput}>
                <TextInput
                  onFocus={() => {
                    setIsFocusInputLogin(true);
                  }}
                  onBlur={() => {
                    setIsFocusInputLogin(false);
                  }}
                  autoCapitalize="none"
                  value={login}
                  onChangeText={setlogin}
                  placeholder="Логін"
                  style={[
                    styles.commonInput,
                    isFocusInpuLogint && styles.isFocus,
                  ]}
                ></TextInput>
                <TextInput
                  onFocus={() => {
                    setIsFocusInputEmail(true);
                  }}
                  onBlur={() => {
                    setIsFocusInputEmail(false);
                  }}
                  autoComplete="email"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
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
                    autoComplete="password"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
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
              <TouchableOpacity style={styles.btnRegister} onPress={onRegister}>
                <Text style={styles.btnRegisterText}>Зареєстуватися</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signInBtn}
                onPress={() => {
                  navigation.navigate("LoginScreen");
                }}
              >
                <Text style={styles.signInText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SharedLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  boxAuth: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  fotoBox: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
    marginTop: -60,
  },
  addSvg: {
    color: "#FF6C00",
  },
  addBtn: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: 14,
    marginRight: -13,
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
  boxInput: {
    rowGap: 16,
    marginBottom: 43,
  },
  btnRegister: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
    paddingVertical: 16,
  },
  btnRegisterText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#FFFFFF",
    marginRight: "auto",
    marginLeft: "auto",
  },
  registerText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 32,
  },
  btnShowPasswordText: {
    color: "#1B4371",
    position: "absolute",
    bottom: 15,
    right: 16,
  },
  wrapperPasswordInput: {
    position: "relative",
  },
  isFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  signInBtn: {
    marginBottom: 45,
  },
  signInText: {
    fontFamily: "Roboto-Regular",
    lineHeight: 18.75,
    color: "#1B4371",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
