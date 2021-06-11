import { Iproduct } from '../@types/IProduct';
import { ActionType } from '../@types/EntityActionType';
import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from '../actions/Types'

/**
 * User reducer
 *
 * Version 1.0
 *
 * Date: 08-06-2021
 *
 * Copyright 
 *
 * Modification Logs:
 * DATE               AUTHOR          DESCRIPTION
 * -----------------------------------------------------------------------
 * 08-06-2021         LONGTB4           Create
 */


/**
 * InitialState
 * 
 */
const initialState:Iproduct[] = [];

/**
 * UserReducer
 * 
 * @param products 
 * @param action 
 * @returns product
 */
function productReducer(products = initialState, action: ActionType):Iproduct[]{
    
    switch(action.type){

        // Case create product
        case CREATE_PRODUCT:
            return [...products ,action.payload];

        // Case retrieve products
        case RETRIEVE_PRODUCTS:
            return action.payload;
        
        // Case update product
        case UPDATE_PRODUCT:
            return products.map((product) => {
                if(product.id === action.payload.id){
                    return{
                        ...product,
                        ...action.payload,
                    };
                }else{
                    return product;
                }
            });

        // Case delete product
        case DELETE_PRODUCT:
            return products.filter(({id}) => id !== action.payload);            

        default:
            return products;
    }
};
export default productReducer;