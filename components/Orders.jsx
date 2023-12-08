import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/authentication";
import { useNavigation } from "@react-navigation/native";
import BottomSheet,{BottomSheetScrollView} from "@gorhom/bottom-sheet";
import OrderDetails from "./OrderDetails";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Orders = () => {
  const [userData, setUserData] = useState([]);
  const [useres, setUseres] = useState([]);
  const { user } = useAuth();
  const bottomSheetRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    (async function () {
      try {
        const myCollection = collection(db, "orders");
        const q = query(
          myCollection,
          where("user", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setUserData(documents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [user, reload]);
  function getMonthName(monthNumber) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[monthNumber - 1];
  }
  const handleOpenPress = async (documentId) => {
    bottomSheetRef?.current?.expand();
    setOpen(true);
    try {
      const docRef = doc(db, "orders", documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        console.log("Document data:", docSnap.data().items);
        setData(docSnap.data().items);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document", error);
    }
  };
  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  async function CancelOrder(documentId) {
    Alert.alert("Cancel Order", "Are you sure you want to cancel your order?", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      { text: "OK", onPress: () => canceled(documentId) },
    ]);

    try {
      async function canceled(documentId) {
        const docRef = doc(db, "orders", documentId);
        const updatedData = { status: "canceled" };
        await updateDoc(docRef, updatedData);
        setReload(!reload);
        console.log("Document successfully updated!");
      }
    } catch (error) {
      console.error("Error updating document", error);
    }
  }
  return (
    <>
      <SafeAreaView>
        <ScrollView className=" h-screen">
          <View className="bg-sky-300 h-16">
            <TouchableOpacity className="ml-4 mt-2"
            onPress={()=>navigation.navigate('Home')}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-center font-bold  text-white text-xl">
              MY ORDERS
            </Text>
          </View>
          {/* {console.log(userData)} */}
          {userData.map((val) => {
            const dateString = val.timestamp;
            const parts = dateString.split("-");
            const year = parts[2];
            const monthNumber = parseInt(parts[1], 10);
            const monthName = getMonthName(monthNumber);
            const date = parts[0];
            return (
              <View>
                <View className="pt-5 w-[95%] pl-3">
                  <TouchableOpacity
                    className="bg-white flex-row shadow-lg shadow-yellow-100 justify-between pl-2 pt-3 pb-2"
                    onPress={() => handleOpenPress(val?.id)}
                  >
                    <View>
                      <View>
                        <Text className="text-gray-600">{year}</Text>
                      </View>
                      <View>
                        <Text className="font-medium text-lg text-green-600">
                          {date}
                        </Text>
                      </View>
                      <View>
                        <Text className=" text-gray-600">{monthName}</Text>
                      </View>
                    </View>
                    <View>
                      <View className="flex-row">
                        <Text>order:</Text>
                        <Text className="ml-1 text-green-600">
                          #{val?.id.slice(0, 8)}
                        </Text>
                      </View>
                      <View className="flex-row">
                        <Text>total:</Text>
                        <Text className="text-green-600">
                          ${val?.totalAmout}
                        </Text>
                      </View>

                      <View className="flex-row">
                        <Text className="text-">status</Text>
                        <Text
                          className={
                            val?.status === "canceled"
                              ? "text-red-700 ml-2"
                              : "text-green-600 ml-3"
                          }
                        >
                          {val?.status}
                        </Text>
                      </View>
                    </View>
                    <View className="pr-2">
                      <TouchableOpacity
                        className="p-1 rounded-xl mt-2"
                        onPress={() => CancelOrder(val?.id)}
                      >
                        {val.status === "pending" && (
                          <Ionicons
                            name="trash-outline"
                            size={24}
                            color="black"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {open && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backgroundStyle={{ borderRadius: 38 }}
          enabledBottomInitialAnimation={true}
        >
         <BottomSheetScrollView>
         <OrderDetails data={data} />
        </BottomSheetScrollView>
        </BottomSheet>
      )}
    </>
  );
};

export default Orders;
