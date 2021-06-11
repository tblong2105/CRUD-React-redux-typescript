import { combineReducers } from 'redux';
import products from "./Products";
import brands from "./Brands";
import auth from "./Auth";
import isSuccess from './IsSuccess';
import isError from './IsError';
import users from './Users'

/**
 * Index
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

export default combineReducers({
  products, brands, auth,
  isSuccess, isError, users
});