import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartProduct from "../components/CartProduct";
import CartHeader from "../components/CartHeader";
import { useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";

const CartScreen = () => {
  const product = useSelector((state) => state.cart.cart);
  return (
    <>
      {product.length > 0 ? (
        <>
          <CartHeader />
          <CartProduct />
        </>
      ) : (
        <View>
        <EmptyCart />
        </View>
      )}
    </>
  );
};

export default CartScreen;
