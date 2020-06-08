import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Feather, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
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
    navigationOptions: {
      drawerLabel: 'Products',
      drawerIcon: ({ focused, tintColor }) => (
        <Feather name='home' size={24} color={tintColor} />
      ),
    },
  }
);

const userProductStackNavigator = createStackNavigator(
  {
    userProduct: {
      screen: UserProductScreen,
      navigationOptions: {
        headerTitle: 'Your Products',
      },
    },
    editProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerLabel: 'Product management',
      drawerIcon: ({ focused, tintColor }) => (
        <Ionicons name='ios-briefcase' size={24} color={tintColor} />
      ),
    },
  }
);

const sideDrawerNavigator = createDrawerNavigator(
  {
    Product: CartTabNavigator,
    Order: createStackNavigator(
      { order: OrderScreen },
      {
        navigationOptions: {
          drawerLabel: 'Orders',
          drawerIcon: ({ focused, tintColor }) => (
            <Ionicons name='ios-list' size={24} color={tintColor} />
          ),
        },
      }
    ),
    UserProduct: userProductStackNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.second,
    },
  }
);

const AuthNavigator = createStackNavigator({
  Auth: { screen: AuthScreen, navigationOptions: { headerShown: false } },
});
const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: sideDrawerNavigator,
});

export default createAppContainer(MainNavigator);
