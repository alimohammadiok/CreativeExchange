import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Enter USD Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          onChangeText={setBaseAmount}
          />
      </View>
      <View style={styles.ratesContainer}>
      <Text>Conversion Rate</Text>
        {TARGET_CURRENCIES.map((currency) => (
          <TouchableOpacity
          key={currency}
          style={styles.currencyRow}
          >
          <View style={styles.currencyInfo}>
            <Text style={styles.currencyCode}>{currency}:</Text>
            <Text style={styles.convertedAmount}>
          {convertCurrency(baseAmount, exchangeRates[currency])}
            </Text>
          </View>
          </TouchableOpacity>
          
        ))

        }
      </View>

    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensure SafeAreaView takes full screen
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  ratesContainer: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },

  currencyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  convertedAmount: {
    fontSize: 18,
    color: '#666',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginp: 10,

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: '#555',
    backgroundColor: '#fff',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

  currencyRow: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: 10,
    // borderColor: '#ccc',

    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
 
});
export default CurrencyConverterScreen;