import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../config/authentication";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import OrderDetails from "./OrderDetails";

const Orders = () => {
  const [userData, setUserData] = useState([]);
  const [useres, setUseres] = useState([]);
  const { user, reload } = useAuth();
  const bottomSheetRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    (async function () {
      const myCollection = collection(db, "orders");
      const querySnapshot = await getDocs(myCollection);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      let newArr = documents.filter((val) => {
        return val?.user === user?.uid;
      });
      setUserData(newArr);
    })();
  }, [user]);
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

  return (
    <>
      <ScrollView className=" h-screen">
        <View className="bg-sky-300 h-16">
          <Text>MY ORDERS</Text>
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
                <View className="bg-white flex-row shadow-lg shadow-yellow-100 justify-between pl-2 pt-3 pb-2">
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
                      <Text className="text-green-600">${val?.totalAmout}</Text>
                    </View>

                    <View className="flex-row">
                      <Text className="text-">status</Text>
                      <Text className="text-green-600 ml-2">{val?.status}</Text>
                    </View>
                  </View>
                  <View className="pr-2">
                    <TouchableOpacity
                      className="bg-sky-300 p-1 rounded-xl "
                      onPress={() => handleOpenPress(val.id)}
                    >
                      <Text className="text-white text-center">View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-red-600 p-1 rounded-xl mt-2 ">
                      <Text className="text-white text-center">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {open && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backgroundStyle={{ borderRadius: 38 }}
        >
          <OrderDetails data={data} />
        </BottomSheet>
      )}
    </>
  );
};

export default Orders;
