import { Add_To_Cart, Remove_From_Cart,Clear_Cart } from "../Actiontypes";

export const ShoppingCartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case Add_To_Cart:
      return {
        cartItems: action.payload.cartItems,
      };
    case Remove_From_Cart:
      return {
        cartItems: action.payload.cartItems,
      };
      case Clear_Cart:
        return{
          cartItems: [],
        }
    default:
      return state;
  }
};
