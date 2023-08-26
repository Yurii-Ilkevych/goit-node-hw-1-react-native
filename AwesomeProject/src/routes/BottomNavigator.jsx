import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import HeaderText from "../components/HeaderText";
import HeaderBtnBack from "../components/HeaderBtnBack";
import HeaderTextPosts from "../components/HeaderTextPosts";
import HeaderBtnLogoutPosts from "../components/HeaderBtnLogoutPosts";
const Tab = createBottomTabNavigator();

export default BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "CreatePostsScreen") {
            return (
              <View style={[styles.commonBotton, focused && styles.activeIcon]}>
                <Ionicons name="add" size={size} color={color} />
              </View>
            );
          } else if (route.name === "PostsScreen") {
            return (
              <View style={[styles.commonBotton, focused && styles.activeIcon]}>
                <AntDesign name="appstore-o" size={size} color={color} />
              </View>
            );
          } else if (route.name === "ProfileScreen") {
            return (
              <View style={[styles.commonBotton, focused && styles.activeIcon]}>
                <Feather name="user" size={size} color={color} />
              </View>
            );
          }
        },
        tabBarStyle: {
          paddingHorizontal: 82,
          paddingTop: 9,
          borderTopWidth: 0.5,
          borderColor: "#0000004D",
          paddingBottom: 9
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#212121CC",
        tabBarShowLabel: false,
        headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D"},
        headerTitleAlign: "center",
        unmountOnBlur:true
      })}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerTitle: () => <HeaderTextPosts />,
          headerRight: () => <HeaderBtnLogoutPosts />,
        }}
      />
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerTitle: () => <HeaderText Tittle={"Створити публікацію"}/>,
          headerLeft: () => <HeaderBtnBack />,
          tabBarStyle: { display: "none" },
          
        }}
        
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
