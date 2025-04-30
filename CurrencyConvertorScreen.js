import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const API_KEY = 'e954581353f94a19b67f3f2acaf6f6ed';
const BASE_URL = 'https://openexchangerates.org/api/';
const ENDPOINT = 'latest.json';
const TARGET_CURRENCIES = ['AUD','EUR', 'GBP', 'CAD', 'NZD'];

const CurrencyConverterScreen = () => {
  const [baseAmount, setBaseAmount] = useState('1');
  const [exchangeRates, setExchangeRates] = useState({});
  
  useEffect(() => {
    fetchLatestExchangeRates();
  }
  , []);

  
    // Function to convert the base amount to the target currency
  const convertCurrency = (amount, rate) => {
    return (amount * rate).toFixed(2);
  };
    // Fetch latest exchange rates from the API
  const fetchLatestExchangeRates = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/${ENDPOINT}?app_id=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      setExchangeRates(data.rates);
      return data; 
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Enter USD Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          onChangeText={setBaseAmount}
          />
      </View>
      <View>
      <Text>Conversion Rate</Text>
        {TARGET_CURRENCIES.map((currency) => (
          <TouchableOpacity
          key={currency}
          style={styles.currencyRow}
          >
          <View >
            <Text>{currency}:</Text>
            <Text>
          {convertCurrency(baseAmount, exchangeRates[currency])}
            </Text>
          </View>
          </TouchableOpacity>
          
        ))

        }
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginp: 10,
  },

  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: '#ccc',
  },
 
});
export default CurrencyConverterScreen;