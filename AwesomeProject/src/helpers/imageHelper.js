import { manipulateAsync } from "expo-image-manipulator";

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const comressorImage = async (uri, newWidth, newHeight) => {
  const actions = [{ resize: { width: newWidth, height: newHeight } }];
  const manipResult = await manipulateAsync(uri, actions, { compress: 0.5 });
  return manipResult.uri
};
