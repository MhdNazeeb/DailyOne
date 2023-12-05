import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Profile = () => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={{
          uri: "https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp",
        }}
        style={{ width: "100%", height: "85%" }}
      >
        <View className="h-4/5 flex-row justify-around pt-12">
          <View className="bg-white opacity-40 h-12 w-12 flex justify-center items-center rounded-lg">
            <Ionicons name="reorder-four-outline" size={24} color="white" />
          </View>
          <View className="h-8 w-20 flex justify-center items-center rounded-lg">
            <Text className="text-white font-bold">PROFILE</Text>
          </View>
          <View className="bg-white opacity-40 h-12 w-12 flex justify-center items-center rounded-lg">
            <FontAwesome5 name="pen" size={24} color="white" />
          </View>
        </View>
      </ImageBackground>
      <View className="h-2 flex items-center">
        <Pressable className="h-8 bg-sky-300 w-24 rounded-lg flex justify-center items-center">
          <Text className='text-white font-medium'>OPEN</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
