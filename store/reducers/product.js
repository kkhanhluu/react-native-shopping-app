import PRODUCTS from '../../data/dummy-data';
import { ADD_PRODUCT, EDIT_PRODUCT } from '../actions/product';
import Product from '../../models/product';

const initialState = {
  products: PRODUCTS,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case EDIT_PRODUCT: {
      const productIndex = state.products.findIndex(
        (p) => p.id === action.payload.productId
      );
      const updatedProduct = new Product(
        action.payload.productId,
        'u1',
        action.payload.productTitle,
        action.payload.productImageUrl,
        action.payload.productDescription,
        state.products[productIndex].price
      );
      const updatedProducts = [...state.products];
      updatedProducts[productIndex] = updatedProduct;
      return {
        ...state,
        products: updatedProducts,
      };
    }
    default:
      return state;
  }
};

export default reducer;
