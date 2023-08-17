import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default Home = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "CreatePostsScreen") {
            focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
            size = 24;
            if (focused) {
            }
            return (
              <View style={[styles.commonBotton, focused && styles.activeIcon]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CreatePostsScreen");
                  }}
                  style={styles.commonBotton}
                >
                  <Ionicons name="add" size={size} color={color} />
                </TouchableOpacity>
              </View>
            );
          } else if (route.name === "PostsScreen") {
            focused ? "ios-list" : "ios-list-outline";
            size = 24;
            return (
              <View style={[styles.commonBotton, focused && styles.activeIcon]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PostsScreen");
                  }}
                  style={styles.commonBotton}
                >
                  <AntDesign name="appstore-o" size={size} color={color} />
                </TouchableOpacity>
              </View>
            );
          } else if (route.name === "ProfileScreen") {
            size = 24;
            return (
              <View style={[styles.commonBotton, focused && styles.activeIcon]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProfileScreen");
                  }}
                  style={styles.commonBotton}
                >
                  <Feather name="user" size={size} color={color} />
                </TouchableOpacity>
              </View>
            );
          }
        },
        tabBarStyle: { paddingHorizontal: 82 },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#212121CC",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeIcon: {
    backgroundColor: "#FF6C00",
  },
  commonBotton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
