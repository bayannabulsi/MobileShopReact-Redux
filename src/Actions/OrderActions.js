import { New_Order, Clear_Cart, Clear_Order } from "../Actiontypes";

export const NewOrder = (order) => (dispatch) => {
  fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: New_Order, payload: data });
      localStorage.clear("cartItems");
      dispatch({ type: Clear_Cart });
    });
};
export const ClearOrder = () => (dispatch) => {
  dispatch({ type: Clear_Order });
};
