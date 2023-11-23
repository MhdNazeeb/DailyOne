import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../config/authentication";
import { loginSchema } from "../validation/login";
import 'expo-dev-client';


const LoginScreen = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  async function loginUser(values) {
    setLoader(true);
    await signInWithEmailAndPassword(Auth, values.email, values.password)
      .then((res) => {
        setLoader(false);
        navigation.replace("Tab");
      })
      .catch((error) => {
        setError(true);
        setTimeout(() => {
          setError(false);
          setLoader(false);
        }, 2000);
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
        <View className="w-full h-full flex justify-around pt-72 pb-10">
          {/* title */}
          <View className="flex items-center">
            <Animated.Text
              entering={BounceIn.duration(1000)}
              className="text-white font-bold tracking-wider text-5xl"
            >
              login
            </Animated.Text>
          </View>
          {/* form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => loginUser(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View className="flex items-center mx-4 space-y-4">
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
                    id="email"
                    placeholderTextColor={"gray"}
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
                  entering={FadeInDown.delay(400)
                    .duration(1000)
                    .springify()
                    .damping(3)}
                  className="w-full"
                >
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
                  >
                    {loader ? (
                      <View className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-25 backdrop-filter backdrop-blur z-50">
                        <ActivityIndicator size="small" color="#ffffff" />
                      </View>
                    ) : (
                      <Text className="text-center font-bold text-white">
                        LOGIN
                      </Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(400)
                    .duration(1000)
                    .springify()
                    .damping(3)}
                  className="flex-row justify-center"
                >
                  <Text>Don't have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.push("Signup")}>
                    <Text className="text-sky-600 ml-1">Signup</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      {error && (
        <Animated.View
          entering={FadeIn.delay(100).duration(1000).springify().damping(3)}
          className="items-center pb-4"
        >
          <View className="w-80 h-9 bg-red-600 rounded-2xl justify-center">
            <Text className="text-white text-center">
              email or password incorrect
            </Text>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
