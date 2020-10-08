import { Add_To_Cart, Remove_From_Cart } from "../Actiontypes";

export const AddToCart = (newproduct) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  console.log(cartItems);
  let IsExist = false;
  cartItems.forEach((x) => {
    if (x._id === newproduct._id) {
      IsExist = true;
      x.count++;
    }
  });
  if (!IsExist) {
    cartItems.push({ ...newproduct, count: 1 });
  }
  dispatch({
    type: Add_To_Cart,
    payload: { cartItems },
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const RemoveFromCart = (items, RemovedProduct) => (dispatch) => {
  let cartItems = items.slice();
  cartItems.forEach((x) => {
    if (x._id === RemovedProduct._id) {
      x.count--;
    }
    if (x.count === 0) {
      cartItems = cartItems.slice().filter((x) => x._id !== RemovedProduct._id);
    }
  });

  dispatch({ type: Remove_From_Cart, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
