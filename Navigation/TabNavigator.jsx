import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screen/HomeScreen";
import CartScreen from "../screen/CartScreen";
import ProfileScreen from "../screen/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: "white", height: 75 }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Simle"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
