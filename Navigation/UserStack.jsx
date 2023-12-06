import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/LoginScreen";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { persistStore } from "redux-persist";
import TabNavigator from "./TabNavigator";
import CheckoutScreen from "../screen/CheckoutScreen";
import BillingScreen from "../screen/BillingScreen";
import OrderScreen from "../screen/OrderScreen";
import OrdersScreen from "../screen/OrdersScreen";


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
            <Stack.Screen name="Pickup" component={CheckoutScreen} />
            <Stack.Screen name="Billing" component={BillingScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
