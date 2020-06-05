export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const editProduct = ({
  productId,
  productTitle,
  productImageUrl,
  productDescription,
}) => {
  return {
    type: EDIT_PRODUCT,
    payload: { productId, productTitle, productImageUrl, productDescription },
  };
};
