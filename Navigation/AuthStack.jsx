import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/LoginScreen";
import SignupScreen from "../screen/SignupScreen";
import HomeScreen from "../screen/HomeScreen";
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  console.log("user not authenicated");

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AuthStack;
