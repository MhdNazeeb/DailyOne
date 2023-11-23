import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/LoginScreen";
import SignupScreen from "../screen/SignupScreen";
import HomeScreen from "../screen/HomeScreen";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import TabNavigator from "./TabNavigator";
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={TabNavigator} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </>
  );
};

export default AuthStack;
