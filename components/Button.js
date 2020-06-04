import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const MainButton = (props) => (
  <TouchableOpacity
    style={{ ...styles.button, ...props.style }}
    onPress={props.onPress}
  >
    <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default MainButton;
