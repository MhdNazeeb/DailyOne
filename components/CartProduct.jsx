import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "../Redux/CartSlice";

const CartProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.cart?.cart);
  const navigation = useNavigation();

  let total = product?.reduce((acc, curr) => {
    return (acc += +curr?.quantity * curr?.price);
  }, 0);
  function calculetion(action, item) {
    if (action === "increment") {
      dispatch(incrementQuantity(item));
    } else {
      if (item.quantity === 1) {
        Alert.alert("Delete Product", "Do you Want To Remove This Product", [
          {
            text: "Cancel",
            onPress: () => console.log("this is"),
            style: "cancel",
          },
          { text: "OK", onPress: () => dispatch(decrementQuantity(item)) },
        ]);
      } else {
        dispatch(decrementQuantity(item));
      }
    }
  }
  return (
    <>
      <ScrollView>
        {product?.map((item) => {
          return (
            <View className="p-3  border-sky-300 ">
              <View className="flex-row items-center justify-between rounded-lg bg-white p-2 mt-4">
                <View className="ml-4">
                  <Image
                    style={{
                      resizeMode: "cover",
                      height: 60,
                      width: 60,
                    }}
                    source={{ uri: item.image }}
                  />
                </View>
                <View>
                  <Text className="w-20 mb-2 font-medium">{item.name}</Text>
                  <Text>${item.price}</Text>
                </View>
                {item.quantity ? (
                  <>
                    <TouchableOpacity
                      className="border-2  border-sky-300 flex-row w-12 h-6 rounded-md items-center justify-center"
                      onPress={() => calculetion("decrement", item)}
                    >
                      <Text className="w-20 h-8 mt-2 font-bold text-sm text-center text-sky-500">
                        -
                      </Text>
                    </TouchableOpacity>
                    <View>
                      <Text>{item.quantity}</Text>
                    </View>
                    <TouchableOpacity
                      className="border-2  border-sky-300 flex-row w-12 h-6 rounded-md items-center justify-center"
                      onPress={() => calculetion("increment", item)}
                    >
                      <Text className="w-20 h-8 mt-2 font-bold text-sm text-center text-sky-500">
                        +
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity className="border-2 mr-5  border-sky-300 flex-row w-24 h-7 rounded-md items-center justify-center">
                    <Text className="w-20 h-8 mt-2 font-bold text-sm text-center text-red-600">
                      DELETE
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <Pressable className="bg-sky-300 h-20 rounded-t-xl p-3 flex-row ">
        <View className="w-2/4 h-screen">
          <Text className="text-white font-bold text-lg">
            {product.length} item | ${total}
          </Text>
          <Text className="text-white mt-1 w-max">
            Extra Changes May Applay
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Pickup")}>
          <Text className="text-white font-bold text-lg mt-2">
            Proceed to Checkout..
          </Text>
        </TouchableOpacity>
      </Pressable>
    </>
  );
};

export default CartProduct;
