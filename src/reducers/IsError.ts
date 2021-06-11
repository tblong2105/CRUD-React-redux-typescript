import { StatusActionType } from '../@types/StatusActionType';
import {IS_FAIL, CLEAR_STATE } from '../actions/Types'

/**
 * IsError reducer
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

const initialState: string = "";

/**
 * IsError reducer 
 * 
 * @param isError 
 * @param action 
 * @returns message
 */
function isError(isError = initialState, action: StatusActionType){
    const {type, payload} = action;

    switch(type){

        // Case fail
        case IS_FAIL:
            return payload;
        
        // Case clear state
        case CLEAR_STATE:
            return payload;
        default:
            return isError;
    }
}

export default isError;