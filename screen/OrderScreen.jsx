import { View, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native"

const OrderScreen = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View className="w-screen bg-white  h-screen flex items-center justify-center">
        <View className="w-11/12 h-5/6 ">
          <View className="flex items-center pt-16">
            <View className="w-4/5 h-5/6 flex justify-center items-center ">
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-1449.jpg?w=740&t=st=1701506954~exp=1701507554~hmac=9a39cd0657eab1e209684915697fe6582aef9ed6a248390b3b1495c3418876b4",
                }}
                style={{width:200,height:200}}
              />
              <Text className='mt-5 font-medium'>Your Order Has Been Conformed</Text>
            </View>
           <TouchableOpacity className='bg-sky-300 w-1/2 h-7 rounded-md'
           onPress={()=>navigation.replace("Home")}
           >
            <Text className='text-center mt-1 font-medium text-white'>Home</Text>
           </TouchableOpacity>
       
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;
