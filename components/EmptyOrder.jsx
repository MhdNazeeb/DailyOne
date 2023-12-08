import { View, Text, ImageBackground, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const EmptyOrder = () => {
  const navigate = useNavigation();
  return (
    <SafeAreaView className="bg-white">
      <View className="w-screen h-screen  bg-white items-center justify-center mt-8">
        <View className="w-11/12 h-5/6 flex justify-center items-center pb-20">
          <ImageBackground
            source={{uri:'https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-2566.jpg?w=740&t=st=1702029739~exp=1702030339~hmac=55c66bc8196235d5a127bb4bbda9ad27a431ec91a58d3ad5f84f6033793f8320'}}
            style={{ width: 300, height: 300 }}
          ></ImageBackground>

          <Text className="font-bold text-2xl">OOPS!</Text>
          <Text className="text-lg font-serif">YOu Dont Have Any Order Yet!! </Text>
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

export default EmptyOrder;
