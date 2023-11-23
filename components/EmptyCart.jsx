import { View, Text, ImageBackground, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const EmptyCart = () => {
  const navigate = useNavigation();
  return (
    <SafeAreaView className="bg-white">
      <View className="w-screen h-screen  bg-white items-center justify-center mt-8">
        <View className="w-11/12 h-5/6 flex justify-center items-center pb-20">
          <ImageBackground
            source={require("../assets/images/cart.jpg")}
            style={{ width: 300, height: 300 }}
          ></ImageBackground>

          <Text className="font-bold text-2xl">OOPS!</Text>
          <Text className="text-lg font-serif">This Cart Is Empty </Text>
          <Pressable
            className="w-40 h-8 bg-[#1c9482] rounded-xl mt-16 pt-1"
            onPress={() => navigate.push("Home")}
          >
            <Text className="text-center text-white ">continue shopping</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmptyCart;
