import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BillingHeader = () => {
  const order = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  console.log(order);
  return (
    <SafeAreaView>
      <View>
        <Pressable
          className="pl-3 pt-3"
          onPress={() => navigation.navigate("Pickup")}
        >
          <MaterialIcons name="arrow-back-ios" size={26} color="black" />
        </Pressable>
        <View className="w-11/12 bg-white m-4 flex-row justify-between rounded-md my-16">
          <View className="p-3">
            <Text>Name</Text>
            {order?.map((val) => (
              <View className="pt-3" key={val.id}>
                <Text>{val.name}</Text>
              </View>
            ))}
          </View>
          <View className="p-3">
            <Text>Count</Text>
            {order?.map((val) => (
              <View className="pt-3 pl-2" key={val.id}>
                <Text>{val.quantity}</Text>
              </View>
            ))}
          </View>
          <View className="p-3">
            <Text>Price</Text>

            {order?.map((val) => (
              <View className="pt-3 pl-1" key={val.id}>
                <Text>${val.price}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BillingHeader;
