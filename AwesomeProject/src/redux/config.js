

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

// const firebaseConfig = initializeApp({
//   apiKey: "AIzaSyAMFzPdTgQkYjUnhZPjW5foVzEpbio3oqs",
//   authDomain: "dulcet-bonito-396611.firebaseapp.com",
//   databaseURL: "https://dulcet-bonito-396611-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "dulcet-bonito-396611",
//   storageBucket: "dulcet-bonito-396611.appspot.com",
//   messagingSenderId: "562413818025",
//   appId: "1:562413818025:web:6ec210ec4e1034c65699b8",
//   measurementId: "G-V2VE10BXJ6"
// });



const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDjO1iqPJnekyES5PGWMI0xi6_WeyMwPao",
  authDomain: "my-testproject-f3845.firebaseapp.com",
  projectId: "my-testproject-f3845",
  storageBucket: "my-testproject-f3845.appspot.com",
  messagingSenderId: "58405660056",
  appId: "1:58405660056:web:dbfc4e166a2c6374fff7ed",
  measurementId: "G-2Z8LQLMN0X"
});



// const app = initializeApp(firebaseConfig, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

export const auth = initializeAuth(firebaseConfig, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const storage = getStorage(firebaseConfig);
export const db = getFirestore(firebaseConfig);
