import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import HistoricalRatesModal from './HistoricalRatesModal';
const API_KEY = 'e954581353f94a19b67f3f2acaf6f6ed';
const BASE_URL = 'https://openexchangerates.org/api/';
const ENDPOINT = 'latest.json';
const TARGET_CURRENCIES = ['AUD','EUR', 'GBP', 'CAD', 'NZD'];

// Mapping currency codes to their flag image file names (adjust paths as needed)
const currencyFlags = {
  AUD: require('./assets/currencyFlags/AUD.png'),
  EUR: require('./assets/currencyFlags/EUR.png'),
  GBP: require('./assets/currencyFlags/GBP.png'),
  CAD: require('./assets/currencyFlags/CAD.png'),
  NZD: require('./assets/currencyFlags/NZD.png'),
};
const CurrencyConverterScreen = () => {
  const [baseAmount, setBaseAmount] = useState('1');
  const [exchangeRates, setExchangeRates] = useState({});
  const [historicalRates, setHistoricalRates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
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

  const handleCurrencyPress = async (currency) => {
    // setSelectedCurrency(currency);
    setModalVisible(true);
    setHistoricalRates(generateMockHistoricalData(currency)); // Use mock data
    console.log('this is historical rates:',historicalRates);

  };

  const generateMockHistoricalData = (currency) => {
    const baseRate = exchangeRates[currency] || 1; // Use current rate as a base
    const dataPoints = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const value = parseFloat((baseRate + (Math.random() - 0.5) * 0.1 * baseRate).toFixed(4)); // Vary the rate slightly
      dataPoints.push(value);
    }
    return dataPoints;
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
        {TARGET_CURRENCIES.map((currency) => (
          <TouchableOpacity
          key={currency}
          style={styles.currencyRow}
          onPress={()=> handleCurrencyPress(currency)}
          >
          <View style={styles.currencyInfo}>
          <View style={styles.currencyDetails}>
          {currencyFlags[currency] && (
                <Image source={currencyFlags[currency]} style={styles.flagIcon} />
              )}
            <Text style={styles.currencyCode}>{currency}:</Text>
            </View>
            <Text style={styles.convertedAmount}>
          {convertCurrency(baseAmount, exchangeRates[currency])}
            </Text>
          </View>
          </TouchableOpacity>
          
        ))

        }
        
      </View>
      <HistoricalRatesModal
        visible={modalVisible}
        onClose={closeModal}
      >
        <View>
          <Text style={styles.innerModalText}>This content is inside the separate modal!</Text>
          {/* You can add more content here, like your chart component */}
        </View>
      </HistoricalRatesModal>
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
  currencyDetails: {
    flexDirection: 'row',
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

  flagIcon: {
    width: 64, // Adjust size as needed
    height: 46, // Adjust size as needed
    marginRight: 8, // Add some spacing between flag and code
    resizeMode: 'contain', // Ensure the entire image is visible
  },
 
});
export default CurrencyConverterScreen;