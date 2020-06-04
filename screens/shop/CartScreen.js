import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';

import {
  removeCartItem,
  removeQuantity,
  addQuantity,
} from '../../store/actions/cart';
import { addOrder } from '../../store/actions/order';
import MainButton from '../../components/Button';
import Order from '../../models/order';

const CartItemUI = (props) => {
  const dispatch = useDispatch();

  const removeItemHandler = (productTitle) => {
    dispatch(removeCartItem(productTitle));
  };

  const removeQuantityHandler = (productTitle, productQuantity) => {
    if (productQuantity === 1) {
      removeItemHandler(productTitle);
    } else {
      dispatch(removeQuantity(productTitle));
    }
  };

  const addQuantityHandler = (productTitle) => {
    dispatch(addQuantity(productTitle));
  };

  const swipeoutBtns = [
    {
      component: (
        <View style={styles.buttonDelete}>
          <Ionicons name='ios-trash' size={24} color='#999' />
          <Text style={styles.buttonLabel}>Delete</Text>
        </View>
      ),
      onPress: () => removeItemHandler(props.productTitle),
      underlayColor: '#fff',
    },
  ];

  return (
    <Swipeout right={swipeoutBtns}>
      <View style={styles.cartItem}>
        <Image style={styles.cartImage} source={{ uri: props.imageUrl }} />
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{props.productTitle}</Text>
          <Text style={styles.productPrice}>${props.productPrice}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() =>
              removeQuantityHandler(props.productTitle, props.productQuantity)
            }
          >
            <Text style={styles.buttonAddLabel}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: '700' }}>{props.productQuantity}</Text>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => addQuantityHandler(props.productTitle)}
          >
            <Text style={styles.buttonAddLabel}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeout>
  );
};

const renderCartItem = (itemData) => (
  <CartItemUI
    imageUrl={itemData.item.productImage}
    productPrice={itemData.item.productPrice}
    productTitle={itemData.item.productTitle}
    productQuantity={itemData.item.quantity}
  />
);

const CartScreen = (props) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartItems.reduce(
    (sum, currentItem) => sum + currentItem.productPrice * currentItem.quantity,
    0
  );
  const checkoutHandler = useCallback(() => {
    const totalAmount = cartItems.reduce(
      (sum, currentItem) =>
        sum + currentItem.productPrice * currentItem.quantity,
      0
    );
    const items = cartItems.map((item) => item.productTitle);
    const order = new Order(
      Math.floor(Math.random() * 100),
      items,
      totalAmount,
      new Date()
    );
    dispatch(addOrder(order));
  }, [dispatch, cartItems]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>My Cart</Text>
      <View style={styles.cartContainer}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productTitle}
          renderItem={renderCartItem}
        />
      </View>
      <View style={styles.amountContainer}>
        <Text style={{ fontWeight: '700', color: '#999', fontSize: 18 }}>
          Total Amount
        </Text>
        <Text style={{ fontWeight: '700', fontSize: 18 }}>
          ${totalAmount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.checkoutButtonContainer}>
        <MainButton title='Check out' onPress={() => checkoutHandler()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  cartContainer: {
    marginTop: 20,
    flexBasis: '70%',
  },
  amountContainer: {
    flexDirection: 'row',
    flexBasis: '10%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  checkoutButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '10%',
  },
  cartItem: {
    flexDirection: 'row',
    height: 120,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 20,
    backgroundColor: '#f4f4f4',
  },
  cartImage: {
    width: '30%',
    height: '100%',
  },
  textContainer: {
    flexBasis: '45%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  productPrice: {
    marginTop: 10,
    color: '#999',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonAdd: {
    backgroundColor: '#f4f4f4',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAddLabel: {
    fontWeight: '700',
    color: '#999',
    fontSize: 20,
  },
  buttonDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 120,
  },
  buttonLabel: {
    color: '#999',
  },
});

export default CartScreen;
