import {
  CardField,
  useConfirmPayment,
  ConfirmPaymentSheet,
} from "react-native-payments";
import React, { useState } from "react";
import { View, Button, StyleSheet, Alert, Pressable, Text } from "react-native";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";


const PaymentSheetComponent = () => {


  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePayment = async () => {
    // Fetch the client secret from your server
    console.log('fffllllllllllllllllllllllllllllllllllllllll');
    const amount = 100;
       axios.post("http://localhost:3000/payments/intent", amount)
      .then((response) => {
        console.log('sucess');
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.log('catch');
        console.error("Error:", error,'ddddddddddddd');
      });
    if (response.error) {
      console.log("fffffff");
      Alert.alert("Something went wrong");
      return;
    }

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "dailyOne",
      paymentIntentClientSecret: response.data.paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      console.log("fffffff");
      Alert.alert("Something went wrong");
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
    }
  };

  return (
    <View>
      <Pressable
        className="bg-red-800 px-6 mt-3 rounded-lg"
        onPress={handlePayment}
      >
        <Text className="text-center text-white">online</Text>
      </Pressable>
    </View>
  );
};

export default PaymentSheetComponent;
