import { View, Text, Modal, TextInput, Button } from "react-native";
import React, { useState } from "react";

const AddressEdit = () => {
    const [modalVisible, setModalVisible] = useState(true);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
      <View className="w-full flex-1 items-center  justify-center">
        <View className="px-8 w-full max-w-sm">
          <Text className="text-5xl font-bold mb-6 text-gray-50">ADDRRESS</Text>

          <View className="flex flex-col gap-4  w-80">
            <TextInput
              placeholder="Enter you name"
              autoCapitalize="none"
              className="border rounded-sm"
            />

            <TextInput
              placeholder="enter your address"
              autoCapitalize="none"
              keyboardType="email-address"
              className="border rounded-sm"
            />

            <TextInput
              placeholder="enter your pincode"
              className="border rounded-sm"
            />
          </View>

          <View className="flex-row items-center gap-2 pl-1 my-8">
            <View>
              <Button
                title="confirm"
                onPress={() => setModalVisible(false)}
                variant="success"
              />
            </View>
            <View>
              <Button
                title="cancel"
                onPress={() => setModalVisible(false)}
                variant="success"
                className="mt-3"
              />
            </View>
          </View>
        </View>
      </View>
      </Modal>
    </>
  );
};

export default AddressEdit;
