import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "../screen/SignupScreen";
import LoginScreen from "../screen/LoginScreen";
import HomeScreen from "../screen/HomeScreen";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { persistStore } from "redux-persist";
import TabNavigator from "./TabNavigator";


let persistor = persistStore(store);

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
