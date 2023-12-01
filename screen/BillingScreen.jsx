import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import BillingHeader from "../components/BillingHeader";
import BillingDetails from "../components/BillingDetails";

const BillingScreen = () => {
  return (
    <ScrollView>
      <SafeAreaView>
      <BillingHeader />
      <BillingDetails />
      </SafeAreaView>
    </ScrollView>
  );
};

export default BillingScreen;
