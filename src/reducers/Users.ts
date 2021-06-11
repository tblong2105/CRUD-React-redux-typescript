import { ActionType } from '../@types/EntityActionType';
import { IUser } from '../@types/IUser';
import {
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER,
    UPDATEPROFILE_USER
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
const initialState: IUser[] = [];

/**
 * User reducer
 * 
 * @param users 
 * @param action 
 * @returns user
 */
function userReducer(users = initialState, action: ActionType):IUser[]{

    switch (action.type) {

        // Case retireve users
        case RETRIEVE_USERS:
            return action.payload;

        // Case update user
        case UPDATE_USER:
            return users.map((user) => {
                if (user.id === action.payload.id) {
                    return {
                        ...user,
                        ...action.payload,
                    };
                } else {
                    return user;
                }
            });

        // Case update profile user
        case UPDATEPROFILE_USER:
            return users?.map((user) => {
                if (user.id === action.payload.id) {
                    return {
                        ...user,
                        ...action.payload,
                    };
                } else {
                    return user;
                }
            });

        // Case delete user
        case DELETE_USER:
            return users.filter(({id}) => id !== action.payload);
        default:
            return users;
    }
};
export default userReducer;