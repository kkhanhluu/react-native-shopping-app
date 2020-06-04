import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const renderOrderItem = (itemData) => (
  <View style={styles.order}>
    <View style={styles.price}>
      <Text style={styles.label}>Total Amount:</Text>
      <Text style={styles.value}>${itemData.item.totalAmount}</Text>
    </View>
    <View style={styles.date}>
      <Text style={styles.label}>Ordered at:</Text>
      <Text style={styles.value}>{itemData.item.date.toLocaleString()}</Text>
    </View>
  </View>
);
const OrderScreen = (props) => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <View style={styles.screen}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        style={styles.ordersContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ordersContainer: {
    width: '100%',
    padding: 30,
    paddingTop: 50,
  },
  order: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginVertical: 20,
    backgroundColor: '#fff',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#999',
  },
  value: {
    fontWeight: '700',
    fontSize: 18,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName='ios-menu'
          title='menu'
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default OrderScreen;
