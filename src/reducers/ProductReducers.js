import { FETCH_PRODUCTS } from '../types';

export const ProductReducers = ( state = {}, action ) => {
    if (action.type === FETCH_PRODUCTS) {
        return { items: action.payload }
    }
    else return state;
}
