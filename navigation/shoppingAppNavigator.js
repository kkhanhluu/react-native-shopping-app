import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import Colors from '../constants/Colors';

const ProductStackNavigator = createStackNavigator({
  ProductOverview: {
    screen: ProductOverviewScreen,
    navigationOptions: {
      headerTitle: 'Products',
    },
  },
  ProductDetailScreen: ProductDetailScreen,
});

const CartTabNavigator = createBottomTabNavigator(
  {
    Product: {
      screen: ProductStackNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <Feather name='home' size={24} color={tabInfo.tintColor} />
        ),
      },
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <SimpleLineIcons name='handbag' size={24} color={tabInfo.tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.second,
      labelStyle: {
        fontWeight: '700',
        fontSize: 13,
      },
    },
  }
);

export default createAppContainer(CartTabNavigator);
