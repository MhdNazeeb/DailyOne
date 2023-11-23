import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const CartHeader = () => {
    const product = useSelector((state) => state?.cart?.cart);
  return (
    <SafeAreaView>
      <View className="w-sm h-12 mt-3 flex-row justify-between m-6">
        <View>
          <Image
            source={{
              uri: "https://icons.veryicon.com/png/o/business/vscode-program-item-icon/react-3.png",
            }}
            style={{ width: 30, height: 30 }}
          />
        </View>
        <View>
          <Text className='font-bold'>MyCart</Text>
        </View>
        <View >
          <Feather name="shopping-cart" size={24} color="black" />
          <Text className='ml-3 font-bold'>{product.length}</Text>
        </View>
        
      </View>
      <View className="border border-sky-300 rounded-xl  flex-row p-3 m-3 justify-between">
        <TextInput className="w-5/6" placeholder="sreach" />
        <Feather className="ml-auto" name="search" size={24} color="black" />
      </View>
    </SafeAreaView>
  );
};

export default CartHeader;
