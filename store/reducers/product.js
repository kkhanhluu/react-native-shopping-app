import PRODUCTS from '../../data/dummy-data';

const initialState = {
  products: PRODUCTS,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
