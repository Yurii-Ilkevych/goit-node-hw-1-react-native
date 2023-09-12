import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../hooks";
import { useDispatch } from "react-redux";
import { deleteCarrentAvatar } from "../redux/authUser/authOperators";
import { addCarrentAvatar } from "../redux/authUser/authOperators";
import Spinner from "react-native-loading-spinner-overlay";
import { uriToBlob, comressorImage } from "../helpers/imageHelper";

export const ChangeAvatar = () => {
  const [image, setImage] = useState(null);
  const [hasRendered, setHasRendered] = useState(false);
  const { isLoading, user, errorDeleteAvatar, errorAddAvatar } = useUser();
  const dispach = useDispatch();

  const hundleDeleteAvatar = () => {
    dispach(deleteCarrentAvatar(user.photoURL));
    setImage(null);
  };
  useEffect(() => {
    if (errorDeleteAvatar && hasRendered) {
      this.toast.show(errorDeleteAvatar, 2500);
    } else {
      setHasRendered(true);
    }
  }, [errorDeleteAvatar]);

  useEffect(() => {
    if (errorAddAvatar && hasRendered) {
      this.toast.show(errorAddAvatar, 2500);
    } else {
      setHasRendered(true);
    }
  }, [errorAddAvatar]);

  const selectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const uri = await comressorImage(result.assets[0].uri, 600, 600)
      const blob = await uriToBlob(uri);
      const fileSizeInBytes = blob.size;
      if (fileSizeInBytes / 1024 > 800) {
        this.toast.show(
          `The selected photo after compression is ${(
            fileSizeInBytes / 1024
          ).toFixed(1)} kb, but must not exceed 250 kb`,
          4000
        );
        return;
      }
      setImage(result.assets[0].uri);
      dispach(addCarrentAvatar(blob));
    }
  };

  return (
    <>
      <Spinner visible={isLoading} />
      {image || user.photoURL ? (
        <View style={styles.box}>
          <ImageBackground
            source={user.photoURL ? { uri: user.photoURL } : { uri: image }}
            style={styles.fotoBoxWithImage}
          ></ImageBackground>
          <TouchableOpacity
            style={styles.addBtnWithImage}
            onPress={hundleDeleteAvatar}
          >
            <AntDesign
              name="closecircleo"
              style={styles.addSvgWithImage}
              size={25}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.fotoBox}>
          <TouchableOpacity style={styles.addBtn} onPress={selectAvatar}>
            <AntDesign name="pluscircleo" style={styles.addSvg} size={25} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fotoBox: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
    marginTop: -60,
    marginBottom: 32,
  },
  fotoBoxWithImage: {
    width: 120,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -60,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 16,
    overflow: "hidden",
  },
  box: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 32,
  },
  addBtn: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: "auto",
    marginTop: "auto",
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
    marginRight: -13,
  },
  addSvg: {
    color: "#FF6C00",
  },
  addSvgWithImage: {
    color: "#BDBDBD",
  },
  addBtnWithImage: {
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    bottom: 14,
    right: -13,
  },
});
