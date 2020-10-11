import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { OrderReducer } from "./reducers/OrderReducer";
import { ProductsReducer } from "./reducers/ProductsReducer";
import { ShoppingCartReducer } from "./reducers/ShoppingCartReducer";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: ProductsReducer,
    cart: ShoppingCartReducer,
    order: OrderReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
