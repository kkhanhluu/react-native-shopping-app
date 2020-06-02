import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetail = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Product detail Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetail;
