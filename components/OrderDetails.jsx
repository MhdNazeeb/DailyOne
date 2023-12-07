import { View, Text, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { db } from "../config/authentication";

export default function OrderDetails({ data }) {
  console.log(data, "data form eeeeeeeee");
  return (
    <ScrollView>
      {data.map((val) => (
        <View className="w-11/12 h-36  flex-row justify-around">
          <View className="pt-10">
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-1449.jpg?w=740&t=st=1701506954~exp=1701507554~hmac=9a39cd0657eab1e209684915697fe6582aef9ed6a248390b3b1495c3418876b4",
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View className="pt-10">
            <View className="pt-2">
              <Text className="text-base text-gray-600">name</Text>
            </View>
            <View className="pt-2">
              <Text className="text-base text-gray-600">price</Text>
            </View>
            <View className="pt-2 text-lg">
              <Text className="text-base text-gray-600">quantity</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
