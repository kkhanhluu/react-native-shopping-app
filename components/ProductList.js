import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ProductItem from './ProductItem';

const ProductList = (props) => {
  const renderProductItem = (itemData) => (
    <ProductItem
      imageUrl={itemData.item.imageUrl}
      title={itemData.item.title}
      description={itemData.item.description}
      price={itemData.item.price}
      onClick={() => {
        console.log(props.navigation);
        props.navigation.navigate({
          routeName: 'ProductDetailScreen',
          params: {
            productTitle: itemData.item.title,
            productId: itemData.item.id,
          },
        });
      }}
    />
  );
  return (
    <FlatList
      data={props.listData}
      keyExtractor={(item) => item.id}
      renderItem={renderProductItem}
      numColumns={2}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
  },
});

export default ProductList;
