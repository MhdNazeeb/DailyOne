import React from "react";
import useAuth from "../hooks/useAuth";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import { SafeAreaView } from "react-native";

const RootNavigation = () => {
  const { user } = useAuth();
 
  return user ? <UserStack /> : <AuthStack />;
};

export default RootNavigation;
