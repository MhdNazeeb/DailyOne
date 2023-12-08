import { View, Text, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { db } from "../config/authentication";

export default function OrderDetails({ data }) {
  console.log(data, "data form eeeeeeeee");
  return (
    <ScrollView>
      {data?.map((val) => (
        <View className="w-11/12 h-36  flex-row justify-around">
          <View className="pt-10 pl-16">
            <Image
              source={{
                uri: val?.image,
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View className="pt-10 w-screen  flex items-end pr-16">
            <View className="pt-2 flex-row">
              <Text className="text-base text-gray-600">name :</Text>
              <Text className="text-base text-gray-600 ml-2 font-medium">{val?.name}</Text>
            </View>
            <View className="pt-2 flex-row">
              <Text className="text-base text-gray-600">price</Text>
              <Text className="text-base text-gray-600 ml-2">${val?.price}</Text>
            </View>
            <View className="pt-2 text-lg flex-row">
              <Text className="text-base text-gray-600">quantity</Text>
              <Text className="text-base text-gray-600 ml-2">{val?.quantity}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
