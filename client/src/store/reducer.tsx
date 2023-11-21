import { storeIntialState } from "../types";
import { ADD_TO_CART, REMOVE_FROM_CART, SHOW_CART } from "./actions";

export const storeReducer = (state: storeIntialState, action: any) => {
  switch (action.type) {
      case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SHOW_CART:
      return {
        ...state,
        showCart: action.payload,
      };
    default:
      return state;
  }
};
