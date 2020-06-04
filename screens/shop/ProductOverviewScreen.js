import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductList from '../../components/ProductList';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const ProductOverviewScreen = (props) => {
  const allProducts = useSelector((state) => state.products.products);

  return (
    <View style={styles.screen}>
      <ProductList listData={allProducts} navigation={props.navigation} />
    </View>
  );
};

ProductOverviewScreen.navigationOptions = (navigationData) => {
  return {
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='menu'
          iconName='ios-menu'
          onPress={() => navigationData.navigation.toggleDrawer()}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductOverviewScreen;
