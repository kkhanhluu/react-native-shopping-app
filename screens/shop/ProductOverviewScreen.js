import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductOverviewScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Product overview Screen!</Text>
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

export default ProductOverviewScreen;
