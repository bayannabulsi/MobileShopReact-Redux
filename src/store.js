import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { ProductsReducer } from "./reducers/ProductsReducer.js";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
  combineReducers({
    products: ProductsReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
