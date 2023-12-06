import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Orders from '../components/Orders'

const OrdersScreen = () => {
  return (
    <SafeAreaView>
     <Orders />
    </SafeAreaView>
  )
}

export default OrdersScreen