export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const REMOVE_QUANTITY = 'REMOVE_QUANTITY';

export const addCartItem = (cartItem) => {
  return {
    type: ADD_CART_ITEM,
    payload: cartItem,
  };
};

export const removeCartItem = (productTitle) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: productTitle,
  };
};

export const addQuantity = (productTitle) => {
  return {
    type: ADD_QUANTITY,
    payload: productTitle,
  };
};

export const removeQuantity = (productTitle) => {
  return {
    type: REMOVE_QUANTITY,
    payload: productTitle,
  };
};
