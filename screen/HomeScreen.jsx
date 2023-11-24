import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { confirmPasswordReset, signOut } from "firebase/auth";
import { Auth } from "../config/authentication";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ImageCarousel from "../components/ImageCarousel";
import Services from "../components/Services";
import Products from "../components/Products";
import FlashMessage from "react-native-flash-message";

const HomeScreen = () => {
  const [loading, SetLoding] = useState(true);
  const [displayCurrentAddress, setCurrentAddress] = useState("location");
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [cart, SetCart] = useState(false);
  const flashMessageRef = useRef();

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    console.log(enabled, "this is enabled");
    if (!enabled) {
      console.log("firsttttttttttttt");
      alert("Location Is Not Enabled", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjjjjjjjhhhhhhhhhhhh");
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status, "status");
    if (status !== "granted") {
      alert("Permission denied", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords, "this coords");
    if (coords) {
      const { latitude, longitude } = coords;
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        console.log(address, "thusss");
        setCurrentAddress(address);
      }
    }
  };

  // function logut() {
  //   signOut(Auth);
  //   navigation.replace("Login");
  // }
  return (
    <SafeAreaView style={{ backgroundColor: "#FOFOFO", flex: 1 }}>
      <View className="p-3 pt-8 top-0 flex-row fixed  right-0 ">
        <MaterialIcons name="location-on" size={30} color="#E32636" />

        <View className="w-8/12 ">
          <Text className=" text-2xl">HOME</Text>
          <Text className="text-sm">{displayCurrentAddress}</Text>
        </View>

        <Pressable className="ml-auto mr-3 mt-4">
          <Image
            className="w-10 h-10 rounded-full"
            source={require("../assets/images/profile.png")}
          />
        </Pressable>
      </View>
      {/* serch bar */}
      <View className="border border-sky-300 rounded-xl  flex-row p-3 m-3 justify-between">
        <TextInput className="w-5/6" placeholder="sreach" />
        <Feather className="ml-auto" name="search" size={24} color="black" />
      </View>
      {!loading ? (
        <ScrollView>
          {/* image carousel */}
          <ImageCarousel />
          {/* services */}
          <Services />
          {/* products */}
          <Products
            loading={loading}
            SetLoding={SetLoding}
            SetCart={SetCart}
            cart={cart}
          />
        </ScrollView>
      ) : (
        <View>
          <ImageCarousel />
          {/* services */}
          <Services />
          {/* products */}
          <Products
            loading={loading}
            SetLoding={SetLoding}
            SetCart={SetCart}
            cart={cart}
          />
        </View>
      )}
      <FlashMessage ref={flashMessageRef} />
    </SafeAreaView>
  );
};

export default HomeScreen;
