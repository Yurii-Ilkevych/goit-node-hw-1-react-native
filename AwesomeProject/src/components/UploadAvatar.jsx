import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uriToBlob, comressorImage } from "../helpers/imageHelper";

export const UploadAvatar = ({ getAvatar }) => {
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

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
          ).toFixed(1)} kb, but must not exceed 800 kb`,
          4000
        );
        return;
      }
      setImage(result.assets[0].uri);
      

      setImageBlob(blob);
    }
  };

  const hundleClearAvatar = () => {
    setImage(null);
    setImageBlob(null);
  };

  useEffect(() => {
    if (imageBlob) {
      getAvatar(imageBlob);
    }
  }, [imageBlob]);

  return (
    <>
      {image ? (
        <View style={styles.box}>
          <ImageBackground
            source={{ uri: image }}
            style={styles.fotoBoxWithImage}
          ></ImageBackground>
          <TouchableOpacity
            style={styles.addBtnWithImage}
            onPress={() => {
              hundleClearAvatar();
            }}
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
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              selectAvatar();
            }}
          >
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
