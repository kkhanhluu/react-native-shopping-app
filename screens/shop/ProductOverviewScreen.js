import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList';

const ProductOverviewScreen = (props) => {
  const allProducts = useSelector((state) => state.products.products);

  return (
    <View style={styles.screen}>
      <ProductList listData={allProducts} navigation={props.navigation} />
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
