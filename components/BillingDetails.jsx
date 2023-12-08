import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { cleanCart } from "../Redux/CartSlice";
import { clearPickUp } from "../Redux/PickUp";
import { Firestore, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/authentication";
import useAuth from "../hooks/useAuth";
import StripeCheckout from "./StripeCheckout";

const BillingDetails = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const OrderDetails = useSelector((state) => state.datePickUp);
  const order = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const price = order.reduce((acc, curr) => {
    return (acc += +curr?.quantity * +curr?.price);
  }, 0);
  async function CashOnDelivery() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    try {
      const myCollection = collection(db, "orders");
      const newDocRef = await addDoc(myCollection, {
        user: user?.uid,
        items: order,
        status: "pending",
        totalAmout:price,
        timestamp: currentDate,
      });
      dispatch(cleanCart());
      dispatch(clearPickUp());
      navigation.replace("Order");
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  return (
    <View>
      <Text className="mx-4 font-medium">BillingDetails</Text>

      <View className="bg-white h-96 w-11/12 mx-4 mt-6">
        <View className="h-1/2 border-b">
          <View className="flex-row justify-between">
            <View>
              <Text className="ml-4 mt-3">Item Total</Text>
            </View>
            <View>
              <Text className="m-4 font-medium">${price}</Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View>
              <Text className="ml-4">Delivery Fee || 1.2 km</Text>
            </View>
            <View>
              <Text className="mr-4  text-green-600 font-medium">FREE</Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View>
              <Text className="ml-4 mt-2">Free Delivery On Your Order</Text>
            </View>
          </View>
        </View>
        <View className="border-b">
          <View className="flex-row justify-between">
            <View>
              <Text className="ml-4 mt-3">PickUp Date</Text>
            </View>
            <View>
              <Text className="m-4 font-medium">
                {OrderDetails?.PickUpDate}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View>
              <Text className="ml-4">PickUp Time</Text>
            </View>
            <View>
              <Text className="mr-4  font-medium">
                {OrderDetails?.PickUpTime}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View>
              <Text className="ml-4 mt-2">Delivery Date</Text>
            </View>
            <View>
              <Text className="mr-4 mt-2 font-medium">
                {OrderDetails?.DeliveryTime}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row  justify-between bg-white">
          <View className="p-6">
            <Text className="ml-2 font-bold">Pay</Text>
          </View>
          <View className="p-6">
            <Text className="mr-2 font-medium">${price}</Text>
          </View>
        </View>
        
      </View>
      <View className="h-80 flex items-center pt-5">
          <TouchableOpacity
            className="bg-sky-300 rounded-md h-9 w-3/4"
            onPress={() => CashOnDelivery()}
          >
            <Text className="text-white text-center mt-2 font-bold">
              Cash On Delivery
            </Text>
          </TouchableOpacity>
          {/* <StripeCheckout /> */}
        </View>
    </View>
  );
};

export default BillingDetails;
