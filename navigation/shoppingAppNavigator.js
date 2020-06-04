import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductScreen from '../screens/user/UserProductScreen';

const ProductStackNavigator = createStackNavigator({
  ProductOverview: {
    screen: ProductOverviewScreen,
    navigationOptions: {
      headerTitle: 'Products',
    },
  },
  ProductDetailScreen: ProductDetailScreen,
});

export default createAppContainer(ProductStackNavigator);
