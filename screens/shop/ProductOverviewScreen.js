import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductList from '../../components/ProductList';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { setProducts } from '../../store/actions/product';

const ProductOverviewScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  useEffect(async () => {
    setRefreshing(true);
    await dispatch(setProducts());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', () => {
      dispatch(setProducts());
    });

    return () => {
      willFocusSub.remove();
    };
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ProductList
        listData={allProducts}
        navigation={props.navigation}
        parentScreen='productOverviewScreen'
        onRefresh={() => dispatch(setProducts())}
        refreshing={refreshing}
      />
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
