import { StatusActionType } from '../@types/StatusActionType';
import {IS_SUCCESS, CLEAR_STATE } from '../actions/Types'

/**
 * IsSuccess reducer
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
 * IsSuccess reducer
 * 
 * @param success 
 * @param action 
 * @returns message
 */
function isSuccess(success = initialState, action:StatusActionType){
    const {type, payload} = action;

    switch(type){

        // Case success
        case IS_SUCCESS:
            return payload;

        // Case clear state
        case CLEAR_STATE:
            return null;
        default:
            return success;
    }
}

export default isSuccess;