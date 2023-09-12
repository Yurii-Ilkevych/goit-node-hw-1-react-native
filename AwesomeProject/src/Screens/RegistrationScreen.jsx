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
import { useNavigation } from "@react-navigation/native";
import SharedLayout from "../components/SharedLayout";
import { useDispatch } from "react-redux";
import { registerDB } from "../redux/authUser/authOperators";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { UploadAvatar } from "../components/UploadAvatar";
import { errorNotifications } from "../helpers/errorNotifications";

export default RegistrationScreen = () => {
  const [isFocusInpuLogint, setIsFocusInputLogin] = useState(false);
  const [isFocusInputEmail, setIsFocusInputEmail] = useState(false);
  const [isFocusInputPassword, setIsFocusInputPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [hasRendered, setHasRendered] = useState(false);
  const [loginValue, setlogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, errorRegister } = useUser();

  const onRegister = () => {
    const login = loginValue.trim();
    const research = hundleResearchForm()
    if(login.length=== 0|| email.length=== 0|| password=== 0){
      this.toast.show("All fields must be filled", 2500);
      return
    }

if(research !== 200){
  this.toast.show(research, 2500);
  return
}
    dispatch(registerDB({ login, email, password, imageBlob }));
  };


const hundleResearchForm = ()=>{
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if(loginValue.trim().length < 3){
    return "Login must contain min 3 symbol"
  }else if(!emailRegex.test(email)){
    return "Email is not valid"
  }else if(password.length < 3){
    return "Password must contain min 6 symbol"
  }
  return 200
}
  const hundleGetAvatar = (imageBlob) => {
    setImageBlob(imageBlob);
  };
  useEffect(() => {
    if (errorRegister && hasRendered) {
      errorNotifications(errorRegister)
    } else {
      setHasRendered(true);
    }
  }, [errorRegister]);
  return (
    <SharedLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-187}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Spinner visible={isLoading} />
            <View style={styles.boxAuth}>
              <UploadAvatar getAvatar={hundleGetAvatar} />
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
                  value={loginValue}
                  onChangeText={(el) => {
                    setlogin(el);
                  }}
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
                  onChangeText={(el) => {
                    setEmail(el.trim());
                  }}
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
                    onChangeText={(el) => {
                      setPassword(el.trim());
                    }}
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
