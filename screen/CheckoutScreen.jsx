import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import Address from '../components/Address'


const CheckoutScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar />
     <Address />
  
    </SafeAreaView>
  )
}

export default CheckoutScreen