import { View, Text, ScrollView, Pressable, Image } from "react-native";


const Services = () => {


  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
    {
      id: "012",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "113445",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "1232",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13346534",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];

  return (
    <View className='p-2 lg:pl-16'>
      <Text className='text-black mb-3 text-lg font-medium'>Srvices Is Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {services?.map((item) => (
          <Pressable className='m-3 flex bg-white p-2 rounded-lg' key={item.id}>
            <Image
            className='w-20 h-14 lg:w-36 lg:h-32'
              source={{ uri: item.image }}
            />
            <Text className='text-center mt-2'>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;
