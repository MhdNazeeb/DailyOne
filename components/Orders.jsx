import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/authentication";

const Orders = () => {
  const [userData, setUserData] = useState([]);
  const { user } = useAuth();
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

  return (
    <ScrollView>
      <View className="bg-sky-300 h-16">
      <Text >
          MY ORDERS
        </Text>
        <Text className="text-center font-bold  text-white text-xl">
          MY ORDERS
        </Text>
        

      </View>
      {console.log(userData)}
      {userData.map((val) => {
        return(
          <View className="pt-5 w-[95%] pl-3">
            <View className="bg-white flex-row justify-between pl-2 pt-3 pb-2">
              <View>
                <View>
                  {console.log(val.timestamp.length)}
                  <Text>{val.timestamp.split(0)}</Text>
                </View>
                <View>
                  <Text>fffffffffff</Text>
                </View>
                <View>
                  <Text>fffffffffff</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>fffffffffff</Text>
                </View>
                <View>
                  <Text>fffffffffff</Text>
                </View>
                <View>
                  <Text>fffffffffff</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>fffffffffff</Text>
                </View>
                <View>
                  <Text>fffffffffff</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>fffffffffff</Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Orders;
