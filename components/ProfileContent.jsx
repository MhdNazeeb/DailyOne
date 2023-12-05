import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { collection, doc } from "firebase/firestore";
import { db } from "../config/authentication";

const ProfileContent = () => {
  const { user } = useAuth();
  const myCollection = collection(db, "users");
  
  return (
    <View>
      <View className="p-5">
        <Text className="text-black font-medium">ProfileContent</Text>
        <View className="pt-3">
          <Text>naseebn819@gmail.com</Text>
        </View>
      </View>
      <View className="flex-row justify-between pr-2 pt-11">
        <View className="flex-row pl-4">
          <View>
            <Feather name="box" size={20} color="black" />
          </View>
          <View className="flex-row pl-4">
            <Text>My Orders</Text>
          </View>
        </View>
        <View className="pl-3">
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </View>
      </View>
      <View className="flex-row justify-between pr-2 pt-11">
        <View className="flex-row pl-4">
          <View>
            <SimpleLineIcons name="bag" size={20} color="black" />
          </View>
          <View className="flex-row pl-4">
            <Text>My Bag</Text>
          </View>
        </View>
        <View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </View>
      </View>
      <View className="flex-row justify-between pr-2 pt-11">
        <View className="flex-row pl-4">
          <View>
            <Ionicons name="help-circle-outline" size={20} color="black" />
          </View>
          <View className="flex-row pl-4">
            <Text>Help Center</Text>
          </View>
        </View>
        <View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </View>
      </View>
      <View className="flex-row justify-between pr-2 pt-11">
        <View className="flex-row pl-4">
          <View>
            <Ionicons name="ios-settings-outline" size={20} color="black" />
          </View>
          <View className="flex-row pl-4">
            <Text>Settings</Text>
          </View>
        </View>
        <View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </View>
      </View>
      <View className="flex-row justify-between pr-2 pt-11">
        <View className="flex-row pl-4">
          <View>
            <AntDesign name="message1" size={20} color="black" />
          </View>
          <View className="flex-row pl-4">
            <Text>Feedback</Text>
          </View>
        </View>
        <View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </View>
      </View>
      <View className="flex-row justify-between pr-2 pt-11">
        <View className="flex-row pl-4">
          <View>
            <AntDesign name="staro" size={20} color="black" />
          </View>
          <View className="flex-row pl-4">
            <Text>Rate Us</Text>
          </View>
        </View>
        <View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </View>
      </View>
    </View>
  );
};

export default ProfileContent;
