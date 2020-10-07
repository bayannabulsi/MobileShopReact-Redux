import { Get_Products } from "../Actiontypes";
import { Filter_Products_By_Brand } from "../Actiontypes";
import { Order_Products_By_Price } from "../Actiontypes";
export const ProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case Filter_Products_By_Brand:
      return {
        ...state,
        filterdItems: action.payload.items,
        brand: action.payload.brand,
      };
    case Order_Products_By_Price:
      return {
        ...state,
        sort: action.payload.sort,
        filterdItems: action.payload.items,
      };
    case Get_Products:
      return { items: action.payload, filterdItems: action.payload };

    default:
      return state;
  }
};
