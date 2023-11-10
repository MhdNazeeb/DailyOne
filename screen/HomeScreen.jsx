import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { Auth } from '../config/authentication'

const HomeScreen = () => {
  const navigation = useNavigation()
  function logut() {
    signOut(Auth)
    navigation.replace('Login')
  }
  return (
    <View>
      <View><Text className=' bg-red-600 ml-12 mt-20'></Text></View>
      <TouchableOpacity onPress={logut}>
        <Text className='ml-32 bg-red-600 w-32 text-center rounded-2xl mt-14 '>login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen