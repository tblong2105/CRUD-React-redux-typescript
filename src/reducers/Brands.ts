import { ActionType } from '../@types/EntityActionType';
import { IBrand } from '../@types/Ibrand';
import {
    RETRIEVE_BRANDS,
    DELETE_BRAND,
    UPDATE_BRAND,
    CREATE_BRAND
} from '../actions/Types'

/**
 * Brands reducer
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
const initialState: IBrand[] = [];

/**
 * Brand reducer
 * 
 * @param brands 
 * @param action 
 * @returns brand
 */
function brandReducer(brands = initialState, action: ActionType):IBrand[]{
    switch (action.type) {

        // Case create brand
        case CREATE_BRAND:
            return [...brands, action.payload];

        // Case retrieve brands
        case RETRIEVE_BRANDS:
            return action.payload;

        // Case update brand
        case UPDATE_BRAND:
            return brands.map((brand) => {
                if (brand.id === action.payload.id) {
                    return {
                        ...brand,
                        ...action.payload,
                    };
                } else {
                    return brand;
                }
            });

        // Case delete brand
        case DELETE_BRAND:
            return brands.filter(({ id }) => id !== action.payload);

        default:
            return brands;
    }
};
export default brandReducer;