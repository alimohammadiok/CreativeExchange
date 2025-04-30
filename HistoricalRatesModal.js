// components/SimpleModal.js
import React from 'react';
import {Dimensions, Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const HistoricalRatesModal = ({ visible, onClose, chartData }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
                  <View>
                      
                      <LineChart
                          data={{
                              labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
                              datasets: [
                                  {
                                      data: chartData
                                  }
                              ]
                          }}
                          width={Dimensions.get("window").width - 50} // from react-native
                          // width={100} // from react-native

                          height={220}

                          yAxisInterval={1} // optional, defaults to 1
                          chartConfig={{
                              backgroundColor: "#e26a00",
                              backgroundGradientFrom: "green",
                              backgroundGradientTo: "#ffa726",
                              decimalPlaces: 2, // optional, defaults to 2dp
                              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                              style: {
                                  borderRadius: 16
                              },
                             
                          }}
                          style={{
                              marginVertical: 8,
                              borderRadius: 16
                          }}
                      />
                  </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HistoricalRatesModal;