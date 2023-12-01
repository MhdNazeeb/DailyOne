import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const BillingDetails = () => {
  const OrderDetails = useSelector((state) => state.datePickUp);
  const order = useSelector((state) => state.cart.cart);
  const price = order.reduce((acc, curr) => {
    return (acc += +curr?.quantity * +curr?.price);
  }, 0);
  return (
    <View>
      <Text className="mx-4 font-medium">BillingDetails</Text>

      <View className="bg-white h-3/5 w-11/12 mx-4  mt-6">
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
              <Text className="mr-4 text-green-600 font-medium">
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
        <View className="flex-row h-44 justify-between bg-white">
          <View>
            <Text className="ml-2">fff</Text>
          </View>
          <View>
            <Text className="mr-2">fff</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BillingDetails;
