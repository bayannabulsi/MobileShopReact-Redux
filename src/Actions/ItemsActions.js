import { Get_Products } from "../Actiontypes";

export const GetProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  console.log(data);
  dispatch({
    type: Get_Products,
    payload: data,
  });
};
