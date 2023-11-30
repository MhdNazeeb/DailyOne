import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/authentication";
import useAuth from "../hooks/useAuth";
import { Formik } from "formik";

const AddressEdit = ({ editAddress, setEditAddress, setReload }) => {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  let address;
  useEffect(() => {
    (async function () {
      const colRef = collection(db, "Address");
      console.log(colRef, "this collection what i want");
      const docsSnap = await getDocs(colRef);
      const newData = [];
      let currentUserDocId = null;
      docsSnap.forEach((doc) => {
        newData.push(doc.data());
        if (user.uid === doc.data().user) {
          currentUserDocId = doc.id;
        }
      });
      setData(newData);
      setUserId(currentUserDocId);
    })();
  }, [user?.uid]);
  (function () {
    address = data.find((val) => {
      return user.uid === val.user;
    });
  })();
  async function AddressUpdate(values) {
    try {
      if (!user) {
        console.log("Address is null or undefined");
        return;
      }

      const docRef = doc(db, "Address", userId);
      console.log(docRef, "this ref");

      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const res = await updateDoc(docRef, {
          name: values?.name,
          address: values?.address,
          pincode: values?.pincode,
        });
        setReload((state) => !state);
        setEditAddress(false);
        console.log(res, "this is success");
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error(error, "this is error");
    }
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editAddress}
        onRequestClose={() => {
          setEditAddress(!editAddress);
        }}
      >
        {console.log(address, "this is address")}
        <Formik
          initialValues={{
            name: address?.name,
            address: address?.address,
            pincode: address?.pincode,
          }}
          onSubmit={(values) => AddressUpdate(values)}
          enableReinitialize={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className=" w-screen h-full mt-40 flex items-center justify-center pb-20">
              <View className="w-screen h-80  bg-white p-2 shadow">
                <KeyboardAvoidingView className="flex flex-col gap-4  w-80">
                  <TextInput
                    placeholder="Enter you name"
                    autoCapitalize="none"
                    className="bg-white rounded-sm pl-2"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />

                  <TextInput
                    placeholder="enter your address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="bg-white rounded-sm pl-2"
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    value={values.address}
                  />

                  <TextInput
                    placeholder="enter your pincode"
                    className="bg-white rounded-sm pl-2"
                    onChangeText={handleChange("pincode")}
                    onBlur={handleBlur("pincode")}
                    value={values.pincode}
                  />
                </KeyboardAvoidingView>
                <View className="flex-row items-center gap-2 pl-1 my-8">
                  <View>
                    <Button
                      title="confirm"
                      onPress={handleSubmit}
                      variant="success"
                    />
                  </View>
                  <View>
                    <Button
                      title="cancel"
                      onPress={() => setEditAddress(false)}
                      variant="success"
                      className="mt-3"
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddressEdit;
