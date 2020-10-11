import { New_Order, Clear_Order } from "../Actiontypes";

const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case New_Order:
      return { order: action.payload };
    case Clear_Order:
      return { order: null };
    default:
      return state;
  }
};

export { OrderReducer };
