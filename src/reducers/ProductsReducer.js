import { Get_Products } from "../Actiontypes";


export const ProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case Get_Products:
      return { items: action.payload };
    default:
      return state;
  }
};
