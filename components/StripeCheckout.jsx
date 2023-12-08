import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const PaymentForm = () => {
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { paymentMethod } = await confirmPayment();
      // Handle successful payment
    } catch (error) {
      // Handle payment error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        onCardChange={(cardDetails) => {
          // Handle card details change
        }}
      />
      <TouchableOpacity onPress={handlePayment} disabled={loading}>
        <Text>{loading ? 'Processing...' : 'Pay Now'}</Text>
      </TouchableOpacity>
    </View>
  );
};
