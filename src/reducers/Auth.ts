import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from '../actions/Types'
  
/**
 * auth reducer
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
   * Get user from local storage
   */
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /**
   * Check user is exist in local storage
   * 
   * @returns JSON
   */
  export const isAuth = () => {

    // If localStorage has item with name is 'user' then get it
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user') || "{}");
    } else {
        return false;
    }       
};

 
/**
 * InitialState
 */
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
 
  /**
   * Auth reducer
   * 
   * @param state 
   * @param action 
   * @returns state
   */
export default function (state = initialState, action: any) {
  const { type, payload } = action;
 
  switch (type) {

    // Case loout
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}