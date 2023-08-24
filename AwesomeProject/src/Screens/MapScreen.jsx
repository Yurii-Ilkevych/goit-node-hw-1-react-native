import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default MapScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setLocation(coords);
    })();
  }, []);

console.log(location)
  return (
    <View style={styles.container}>
      <MapView
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
