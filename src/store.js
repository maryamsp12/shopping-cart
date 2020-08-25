import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { ProductReducers } from "./reducers/ProductReducers";

const initialState = {};

// can send all infor about redux store to chrome redux dev tool + monitor whatever happen to action, reducer etc
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        products: ProductReducers,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;