import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign, SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/posts/postsOperators";
import { usePost } from "../hooks";
//import Toast, {DURATION} from 'react-native-easy-toast'

export default CreatePostsScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [localTittle, setlocalTittle] = useState("");
  const [tittlePost, setTittlePost] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [pandingPablish, setPandingPablish] = useState(false);
  const [pandingTakePhoto, setPendingTakePhoto] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { errorCreatePost } = usePost();

  hundleCreatePost = async () => {
    setPandingPablish(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        this.toast.show("Permission to access location was denied", 2500);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      const city = address[0].city;
      const response = await fetch(newPhoto.uri);
      const blob = await response.blob();
      dispatch(createPost({ blob, coords, city, localTittle, tittlePost }));
      hundleAllDelete();
      setPandingPablish(false);
      navigation.navigate("PostsScreen");
    } catch (error) {
      setPandingPablish(false);
      hundleAllDelete();
      this.toast.show(error.message, 2500);
    }
  };
  hundleTakePhoto = async () => {
    setPendingTakePhoto(true);
    if (!hasPermission) {
      try {
        let { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        this.toast.show(error.message, 2500);
      }
    }
    if (isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
        setNewPhoto(photo);
      } catch (error) {
        this.toast.show(error.message, 2500);
      }
    }
    setPendingTakePhoto(false);
  };

  useEffect(() => {
    if (errorCreatePost && hasRendered) {
      console.log(errorCreatePost);
      this.toast.show(errorCreatePost, 2500);
    } else {
      setHasRendered(true);
    }
  }, [errorCreatePost]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        this.toast.show(error.message, 2500);
      }
    })();
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  hundleAllDelete = () => {
    setlocalTittle("");
    setTittlePost("");
    setNewPhoto(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {!pandingPablish ? (
            <View style={styles.ineerContainer}>
              <View style={styles.mainContainer}>
                {!newPhoto ? (
                  <Camera
                    style={[
                      styles.fotoboxCamera,
                      !hasPermission && styles.fotoboxCameraDeactive,
                    ]}
                    type={type}
                    onCameraReady={handleCameraReady}
                    ref={cameraRef}
                  >
                    <TouchableOpacity
                      disabled={newPhoto !== null}
                      style={[
                        styles.cameraBtn,
                        !!newPhoto
                          ? styles.cameraBtnActiv
                          : styles.cameraBtnDeactiv,
                      ]}
                      onPress={hundleTakePhoto}
                    >
                      <FontAwesome
                        name="camera"
                        size={24}
                        color={!!newPhoto ? "#FFFFFF" : "#BDBDBD"}
                      />
                    </TouchableOpacity>
                    <Spinner visible={pandingTakePhoto} />
                  </Camera>
                ) : (
                  <ImageBackground style={styles.image} source={newPhoto}>
                    <TouchableOpacity
                      disabled={true}
                      style={[styles.cameraBtn, styles.cameraBtnActiv]}
                    >
                      <FontAwesome name="camera" size={24} color={"#FFFFFF"} />
                    </TouchableOpacity>
                  </ImageBackground>
                )}
                <View>
                  <Text style={[styles.mainText, styles.commoText]}>
                    Завантажте фото
                  </Text>
                </View>
                <TextInput
                  placeholder="Назва..."
                  style={[styles.input, styles.commoText, styles.colorInput]}
                  value={tittlePost}
                  onChangeText={setTittlePost}
                ></TextInput>
                <View style={styles.containerLocalIcon}>
                  <View style={styles.boxLocalIcon}>
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                  </View>

                  <TextInput
                    placeholder="Місцевість..."
                    style={[
                      styles.input,
                      styles.inputLocation,
                      styles.commoText,
                      styles.colorInput,
                    ]}
                    value={localTittle}
                    onChangeText={setlocalTittle}
                  ></TextInput>
                </View>
                <TouchableOpacity
                  disabled={
                    localTittle.length === 0 ||
                    tittlePost.length === 0 ||
                    newPhoto === null
                  }
                  style={[
                    styles.btnPublish,
                    localTittle.length === 0 ||
                    tittlePost.length === 0 ||
                    newPhoto === null
                      ? styles.btnPublishDeactive
                      : styles.btnPublishActive,
                  ]}
                  onPress={hundleCreatePost}
                >
                  <Text
                    style={[
                      styles.btnPublishText,
                      localTittle.length === 0 ||
                      tittlePost.length === 0 ||
                      newPhoto === null
                        ? styles.btnPublishTextDeactive
                        : styles.btnPublishTextActive,
                    ]}
                  >
                    Опубліковати
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={hundleAllDelete}
                style={[
                  styles.btnDell,
                  tittlePost.length > 0 || newPhoto || localTittle.length > 0
                    ? styles.btnPublishActive
                    : styles.btnPublishDeactive,
                ]}
                disabled={
                  localTittle.length < 1 && tittlePost.length < 1 && !newPhoto
                }
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={
                    localTittle.length < 1 && tittlePost.length < 1 && !newPhoto
                      ? "#BDBDBD"
                      : "#FFFFFF"
                  }
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.saveBox}>
              <Spinner visible={pandingPablish} textContent="Публікую..." />
            </View>
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  flexContainer: {
    flex: 1,
  },
  ineerContainer: {
    flex: 1,
  },
  mainContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
    justifyContent: "flex-end",
  },
  fotoboxCamera: {
    backgroundColor: "#E8E8E8",
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  fotoboxCameraWithPhoto: {
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  fotoboxCameraDeactive: {
    backgroundColor: "#E8E8E8",
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBtnActiv: {
    backgroundColor: "#FFFFFF4D",
    opacity: 0.3,
  },
  cameraBtnDeactiv: {
    backgroundColor: "#FFFFFF",
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
  colorInput: {
    color: "#212121",
  },
  inputLocation: {
    marginTop: 16,
    marginBottom: 32,
    paddingLeft: 28,
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
    paddingVertical: 16,
    borderRadius: 100,
  },
  btnPublishActive: {
    backgroundColor: "#FF6C00",
  },
  btnPublishDeactive: {
    backgroundColor: "#F6F6F6",
  },
  btnPublishText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  btnPublishTextActive: {
    color: "#FFFFFF",
  },
  btnPublishTextDeactive: {
    color: "#BDBDBD",
  },
  btnDell: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
  },
  saveBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    fontFamily: "Roboto-Bold",
    fontSize: 46,
  },
});
