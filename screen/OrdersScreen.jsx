import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Orders from "../components/Orders";
import { db } from "../config/authentication";
import { collection, getDocs } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import EmptyOrder from "../components/EmptyOrder";

const OrdersScreen = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);
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
    <SafeAreaView>
      {userData.length > 0 ? <Orders /> : <EmptyOrder />}
    </SafeAreaView>
  );
};

export default OrdersScreen;
