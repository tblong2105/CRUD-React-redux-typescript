import {
  LOGIN_SUCCESS,
  IS_SUCCESS,
  IS_FAIL,
} from "./Types";
import AuthService from '../services/AuthService';
import { handleError } from '../helpers/HandleError'
import { CREATE_SUCCESS } from "../helpers/Constant";
import { Dispatch } from "react";
import { ActionEntity } from "../@types/EntityActionType";
import { StatusActionEntity } from "../@types/StatusActionType";

/**
 * Auth
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
 * Register action
 * 
 * @param fullname 
 * @param username 
 * @param email 
 * @param password 
 * @returns promise 
 */
export const register = (fullname: string, username: string, email: string, password: string) =>
  (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {

    // Call api register account 
    return AuthService.register(fullname, username, email, password)

      // If success
      .then((response) => {

        // Set message register success
        dispatch({
          type: IS_SUCCESS,
          payload: response.data.message
        })
        return Promise.resolve();
      },

        // If register fail
        (error) => {

          // Set message register fail
          dispatch({
            type: IS_FAIL,
            payload: handleError(error)
          });
          return Promise.reject();
        }
      );
  };

/**
 * Login action
 * 
 * @param username 
 * @param password 
 * @returns promise 
 */
export const login = (username: string, password: string) => (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {

  // Login with username and password function
  return AuthService.login(username, password)

    // If login success
    .then((data) => {

        // Set message login success
        dispatch({
          type: IS_SUCCESS,
          payload: CREATE_SUCCESS
        })
        return Promise.resolve();
      },

      // If login fail
      (error) => {

        // Set message login fail
        dispatch({
          type: IS_FAIL,
          payload: handleError(error)
        });
        return Promise.reject();
      }
    );
};

/**
 * Logout 
 * 
 * @returns logout function
 */
export const logout = () => (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  AuthService.logout();
};
