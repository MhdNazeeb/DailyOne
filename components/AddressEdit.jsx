import { View, Text, Modal, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/authentication";
import useAuth from "../hooks/useAuth";
import { Formik } from "formik";

const AddressEdit = ({ editAddress, setEditAddress }) => {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  let address;
  useEffect(() => {
    (async function () {
      const colRef = collection(db, "Address");
      const docsSnap = await getDocs(colRef);
      const newData = [];
      docsSnap.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    })();
  }, []);
  (function () {
    address = data.find((val) => {
      return user.uid === val.user;
    });
  })();
  async function AddressUpdate(values) {
    console.log(address,'jj');
    const docRef = doc(db, "Address", address?.user);
    console.log(docRef,'this ref');
    await updateDoc(docRef, {
      name: values?.name,
      address: values?.address,
      pincode: values?.pincode,
    }).then((res)=>{
      console.log(res,'this is  sucess');
    }).catch((error)=>{
      console.log(error,'this is error');
    })
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
            <View className="w-full flex-1 items-center  justify-center">
              <View className="px-8 w-full max-w-sm">
                <Text className="text-2xl font-bold mb-6 text-gray-50">
                  EDIT ADDRRESS
                </Text>

                <View className="flex flex-col gap-4  w-80">
                  <TextInput
                    placeholder="Enter you name"
                    autoCapitalize="none"
                    className="border rounded-sm pl-2"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />

                  <TextInput
                    placeholder="enter your address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="border rounded-sm pl-2"
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    value={values.address}
                  />

                  <TextInput
                    placeholder="enter your pincode"
                    className="border rounded-sm pl-2"
                    onChangeText={handleChange("pincode")}
                    onBlur={handleBlur("pincode")}
                    value={values.pincode}
                  />
                </View>

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