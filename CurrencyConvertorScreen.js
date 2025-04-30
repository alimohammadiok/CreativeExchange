import React, { use, useEffect } from 'react';
import { View, Text } from 'react-native';


const CurrencyConverterScreen = () => {
  useEffect(() => {
    const fetchExchangeRates = async () => {
      const rates = await fetchLatestExchangeRates();
      console.log(rates);
    };
  
    fetchExchangeRates();
  }
  , []);
  const fetchLatestExchangeRates = async () => {
    try {
      const response = await fetch(
        'https://openexchangerates.org/api/latest.json?app_id=e954581353f94a19b67f3f2acaf6f6ed');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };
  return (
    <View>
      <Text>Currency Converter</Text>
    </View>
  );
};



export default CurrencyConverterScreen;