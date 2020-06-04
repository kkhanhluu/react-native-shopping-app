import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MainButton from '../../components/Button';
import CartItem from '../../models/cartItem';
import { addCartItem } from '../../store/actions/cart';

const ProductDetail = (props) => {
  const dispatch = useDispatch();

  const productId = props.navigation.getParam('productId');
  const allProducts = useSelector((state) => state.products.products);
  const product = allProducts.find((product) => product.id === productId);

  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.priceLabel}>
          Price: <Text style={styles.price}>{product.price}</Text>
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          title='Add to bag'
          onPress={() =>
            dispatch(
              addCartItem(
                new CartItem(
                  1,
                  product.price,
                  product.title,
                  product.imageUrl,
                  product.price
                )
              )
            )
          }
        />
      </View>
    </View>
  );
};

ProductDetail.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam('productTitle'),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  textContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
  },
  description: {
    color: '#999',
    fontWeight: '600',
    marginVertical: 20,
  },
  priceLabel: {
    fontWeight: '700',
  },
  price: {
    color: '#999',
  },
  buttonContainer: {
    paddingVertical: 40,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});

export default ProductDetail;
