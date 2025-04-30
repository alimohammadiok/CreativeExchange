import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const API_KEY = 'e954581353f94a19b67f3f2acaf6f6ed';
const BASE_URL = 'https://openexchangerates.org/api/';
const ENDPOINT = 'latest.json';
const CurrencyConverterScreen = () => {
  useEffect(() => {
    const fetchExchangeRates = async () => {
      const rates = await fetchLatestExchangeRates();
      console.log(rates);
    };
  
    fetchExchangeRates();
  }
  , []);

    // Function to fetch the latest exchange rates
  const fetchLatestExchangeRates = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/${ENDPOINT}?'+
        'app_id=${API_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Currency Converter</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});
export default CurrencyConverterScreen;