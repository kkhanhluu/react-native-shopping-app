import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
} from '../actions/cart';

const initialState = {
  cartItems: [],
};

const reducer = (state = initialState, action) => {
  let cartItem, otherItems;
  switch (action.type) {
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productTitle !== action.payload
        ),
      };
    case ADD_QUANTITY:
      cartItem = state.cartItems.find(
        (item) => item.productTitle === action.payload
      );
      otherItems = state.cartItems.filter(
        (item) => item.productTitle !== action.payload
      );
      cartItem.quantity = cartItem.quantity + 1;
      return {
        ...state,
        cartItems: [...otherItems, cartItem],
      };
    case REMOVE_QUANTITY:
      cartItem = state.cartItems.find(
        (item) => item.productTitle === action.payload
      );
      otherItems = state.cartItems.filter(
        (item) => item.productTitle !== action.payload
      );
      cartItem.quantity = cartItem.quantity - 1;
      return {
        ...state,
        cartItems: [...otherItems, cartItem],
      };

    default:
      return state;
  }
};

export default reducer;
