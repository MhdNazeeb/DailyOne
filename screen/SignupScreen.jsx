import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  BounceIn,
  FadeInDown,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { signUpValidationSchema } from "../validation/signup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth, db } from "../config/authentication";
import { doc, setDoc } from "firebase/firestore";

const SignupScreen = () => {
  const navigation = useNavigation();

  async function signup(values) {
    console.log(values, "kkkk");
    await createUserWithEmailAndPassword(Auth, values.email, values.password)
      .then((userCredential) => {
        console.log(userCredential, "usercredential");
        const user = userCredential.user;
        console.log(user, "this is user");
        // Add additional user details to Firebase storage.

        (async function addData() {
          await setDoc(doc(db, "users", user.uid), {
            name: values.username,
            email:values.email ,
          });
          
        })();
      }).catch((error) => {
        // Handle error.
        console.log(error.message, "kkkkkkkkkkkkk");
      })
      .then(() => {
        // Profile updated successfully
        console.log("login user7777777777");
        navigation.replace("Login");
      })
      .catch((error) => {
        // Handle errors here
        Alert.alert("This email address already exists");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
      });
  }
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <ScrollView>
        <StatusBar style="light" />
        <Image
          className="w-full h-full absolute"
          source={require("../assets/images/background.png")}
        />
        {/* lights */}
        <View className="flex-row justify-evenly w-full absolute">
          <Animated.Image
            entering={FadeInUp.delay(200).duration(100).springify().damping(3)}
            className="h-[225] w-[90]"
            source={require("../assets/images/light.png")}
          />
          <Animated.Image
            entering={FadeInUp.delay(400).duration(100).springify().damping(3)}
            className="h-[225] w-[65]"
            source={require("../assets/images/light.png")}
          />
        </View>

        {/* title and form */}
        <View className="w-full h-full flex justify-around pt-96">
          {/* title */}

          {/* form */}
          <Formik
            initialValues={{
              email: "",
              username: "",
              ConfirmPassword: "",
              password: "",
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={(values) => signup(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View className="flex items-center mx-4 space-y-4">
                <Animated.View
                  entering={FadeInDown.duration(1000).springify().damping(3)}
                  className="bg-black/5 p-3 rounded-2xl w-full"
                >
                  <TextInput
                    placeholder="username"
                    id="username"
                    placeholderTextColor={"username"}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  {errors.username && (
                    <Text style={{ fontSize: 10, color: "#FF0000" }}>
                      {errors.username}
                    </Text>
                  )}
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.duration(1000).springify().damping(3)}
                  className="bg-black/5 p-3 rounded-2xl w-full"
                >
                  <TextInput
                    placeholder="email"
                    id="email"
                    placeholderTextColor={"gray"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email && (
                    <Text style={{ fontSize: 10, color: "#FF0000" }}>
                      {errors.email}
                    </Text>
                  )}
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(200)
                    .duration(1000)
                    .springify()
                    .damping(3)}
                  className="bg-black/5 p-3 rounded-2xl w-full mb-3"
                >
                  <TextInput
                    placeholder="password"
                    placeholderTextColor={"gray"}
                    id="password"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {errors.password && (
                    <Text style={{ fontSize: 10, color: "#FF0000" }}>
                      {errors.password}
                    </Text>
                  )}
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(200)
                    .duration(1000)
                    .springify()
                    .damping(3)}
                  className="bg-black/5 p-3 rounded-2xl w-full mb-3"
                >
                  <TextInput
                    placeholder="ConfirmPassword"
                    placeholderTextColor={"gray"}
                    id="ConfirmPassword"
                    secureTextEntry
                    onChangeText={handleChange("ConfirmPassword")}
                    onBlur={handleBlur("ConfirmPassword")}
                    value={values.ConfirmPassword}
                  />
                  {errors.ConfirmPassword && (
                    <Text style={{ fontSize: 10, color: "#FF0000" }}>
                      {errors.ConfirmPassword}
                    </Text>
                  )}
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(400)
                    .duration(1000)
                    .springify()
                    .damping(3)}
                  className="w-full"
                >
                  <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                    <Text
                      onPress={handleSubmit}
                      className="text-center font-bold text-white"
                    >
                      SIGNUP
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(400)
                    .duration(1000)
                    .springify()
                    .damping(3)}
                  className="flex-row justify-center"
                >
                  <Text>Already have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.push("Login")}>
                    <Text className="text-sky-600 ml-1">Login</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
