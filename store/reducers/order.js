import { ADD_ORDER } from '../actions/order';

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
