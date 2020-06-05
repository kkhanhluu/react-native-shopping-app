import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';

import ProductList from '../../components/ProductList';
import MainButton from '../../components/Button';

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) =>
    state.products.products.filter((p) => p.ownerId === 'u1')
  );

  const createHandler = () => {
    props.navigation.navigate('editProduct');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <ProductList
          listData={userProducts}
          navigation={props.navigation}
          parentScreen='userProductScreen'
        />
      </View>
      <View style={styles.addButton}>
        <MainButton title='Create a new product' onPress={createHandler} />
      </View>
    </View>
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName='ios-menu'
          iconSize={24}
          color='black'
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    height: '85%',
  },
});

export default UserProductScreen;
