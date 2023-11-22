import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/authentication";
import { useDispatch } from "react-redux";
import { getProducts, incrementQty } from "../Redux/ProductSlice";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { addToCart } from "../Redux/CartSlice";

export default function Products({ loading, SetLoding }) {
  const [item, setItem] = useState([]);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    async function fetchProduct() {
      const colRef = collection(db, "Products");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        item?.push(doc.data());
      });
      item?.map((srevice) => dispatch(getProducts(srevice)));
      SetLoding(false);
    }
    fetchProduct();
  }, []);
  function addCart(item) {
    console.log('reach addcart',item);
    dispatch(addToCart(item));
    dispatch(incrementQty(item))
  }
  return (
    <View className="p-3">
      {!loading ? (
        <View className="flex-row m-2 max-w-max flex-wrap gap-[2%]">
          {product?.map((item) => (
            <Pressable className="w-[31%] p-5 rounded-lg bg-white">
              <Image
                style={{ width: 70, height: 70 }}
                source={{ uri: item?.image }}
              />
              <Text className="text-center mt-4 font-medium">{item?.name}</Text>
              <TouchableOpacity>
                <Text className="text-center font-medium">${item.price}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>addCart(item)}
                className="w-20 border-2  border-sky-300 mt-3 rounded-lg"
              >
                <Text className="text-center">ADD</Text>
              </TouchableOpacity>
            </Pressable>
          ))}
        </View>
      ) : (
        <ContentLoader
          viewBox="0 0 1360 1500"
          height={800}
          width={700}
          backgroundColor={"#C0C0C0"}
          foregroundColor={"#999"}
        >
          <Rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
          <Rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
          <Rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
          <Rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
          <Rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
          <Rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
          <Rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
          <Rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
          <Rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
        </ContentLoader>
      )}
    </View>
  );
}