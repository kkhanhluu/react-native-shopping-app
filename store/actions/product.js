export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://rn-shopping-app-4d64b.firebaseio.com/products.json'
    );
    const resData = await response.json();

    let products = [];
    for (let key in resData) {
      products.push({ ...resData[key], id: key });
    }

    dispatch({
      type: SET_PRODUCTS,
      payload: products,
    });
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://rn-shopping-app-4d64b.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    );
    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      payload: { ...product, id: resData.name },
    });
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
