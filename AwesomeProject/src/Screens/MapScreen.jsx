import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default MapScreen = ({route}) => {
  const [location, setLocation] = useState(null);
  const {locate} = route.params || {}

  useEffect(() => {
(async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    if(locate){
      setLocation(locate);
      return
    }
    setLocation(coords);
     
  } catch (error) {
    console.log(error)
  }

    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
      style={styles.mapStyle}
       provider={PROVIDER_GOOGLE}
       region={{
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
        showsUserLocation={true}
         />
      {location && (
        <Marker title="I am here" coordinate={location} description="Hello" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});


// import MapView from 'react-native-maps';
// import { StyleSheet, View } from 'react-native';
// export default MapScreen = () => {



//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });