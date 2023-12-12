import { View, Text, Pressable } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProfileContent from "./ProfileContent";
import useAuth from "../hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/authentication";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const { user } = useAuth();
  useEffect(() => {
    (async function () {
      const myCollection = collection(db, "users");
      const querySnapshot = await getDocs(myCollection);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      newArr = documents.filter((val) => {
        return val.id === user?.uid;
      });
      console.log(newArr);
      setUserData(newArr);
    })();
  }, [user]);

  const handleOpenPress = () => {
    bottomSheetRef?.current?.expand();
  };

  // variables
  const snapPoints = useMemo(() => ["70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaView>
      <View className="h-full">
        <ImageBackground
          source={{
            uri: "https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp",
          }}
          style={{ width: "100%", height: "70%" }}
        >
          <View className="flex-row justify-around pt-12">
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
        <View className="flex items-center ">
          <Pressable
            className="h-8 bg-sky-300 w-36 rounded-lg flex justify-center items-center"
            onPress={handleOpenPress}
          >
            <Text className="text-white font-medium">OPEN</Text>
          </Pressable>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{ borderRadius: 38 }}
        >
          <BottomSheetScrollView>
            <View>
              <ProfileContent userData={userData} />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
