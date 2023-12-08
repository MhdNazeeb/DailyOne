import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";

const SelectTime = ({setSelectDeliveryTime,selectDeliveryTime,setSelectedTime,selectTime,}) => {
 

  function timeSelected(time) {
    console.log(time, "jj");
    setSelectedTime(time);
  }
  function deliveryTimes(time) {
    setSelectDeliveryTime(time);
  }
  const deliveryTime = [
    {
      id: "4",
      name: "Tommorrow",
    },
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
  return (
    <View>
      <Text className="m-4 font-medium text-sm">Select Time</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {times?.map((val, i) => (
          <Pressable
            key={i}
            onPress={() => timeSelected(val.time)}
            className={
              val.time === selectTime
                ? "p-3 m-3 bg-sky-300 rounded-md"
                : "p-3 m-3 border rounded-md"
            }
          >
            <Text className={val.time === selectTime ? "text-white" : ""}>
              {val.time}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text className="m-4 font-medium text-sm">Select Delivery Time</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {deliveryTime?.map((val, i) => (
          <Pressable
            key={i}
            onPress={() => deliveryTimes(val.name)}
            className={
              val.name === selectDeliveryTime
                ? "p-3 m-3 bg-sky-300 rounded-md"
                : "p-3 m-3 border rounded-md"
            }
          >
            <Text
              className={val.name === selectDeliveryTime ? "text-white" : ""}
            >
              {val.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectTime;
