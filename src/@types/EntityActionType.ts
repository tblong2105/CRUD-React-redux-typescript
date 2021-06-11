import * as types from "../actions/Types";
import { IBrand } from "./Ibrand";
import { Iproduct } from "./IProduct";
import { IUser } from "./IUser";

/**
 * Entity Action Type
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
 * Retrieve Products Action interface
 * 
 */
export interface retrieveProductsAction {
  type: typeof types.RETRIEVE_PRODUCTS;
  payload: Iproduct[];
}

/**
 * Create Product Action interface
 * 
 */
export interface createProductAction {
  type: typeof types.CREATE_PRODUCT;
  payload: Iproduct;
}

/**
 * Update Products Action interface
 * 
 */
export interface updateProductsAction {
  type: typeof types.UPDATE_PRODUCT;
  payload: Iproduct;
}

/**
 * Delete Products Action interface
 * 
 */
export interface deleteProductsAction {
  type: typeof types.DELETE_PRODUCT;
  payload: number;
}

/**
 * Retrieve Brands Action interface
 * 
 */
export interface retrieveBrandsAction {
  type: typeof types.RETRIEVE_BRANDS;
  payload: IBrand[];
}

/**
 * Create Brand Action interface
 * 
 */
export interface createBrandAction {
  type: typeof types.CREATE_BRAND;
  payload: IBrand;
}

/**
 * Update Brands Action interface
 * 
 */
export interface updateBrandsAction {
  type: typeof types.UPDATE_BRAND;
  payload: IBrand;
}

/**
 * Delete Brands Action interface
 * 
 */
export interface deleteBrandsAction {
  type: typeof types.DELETE_BRAND;
  payload: number;
}

/**
 * Retrieve Users Action interface
 * 
 */
export interface retrieveUsersAction {
  type: typeof types.RETRIEVE_USERS;
  payload: IUser[];
}

/**
 * Update Users Action interface
 * 
 */
export interface updateUsersAction {
  type: typeof types.UPDATE_USER;
  payload: IUser;
}

/**
 * Delete User Action interface
 * 
 */
export interface deleteUserAction {
  type: typeof types.DELETE_USER;
  payload: number;
}

/**
 * Update Profile User Action interface
 * 
 */
export interface updateProfileUserAction {
  type: typeof types.UPDATEPROFILE_USER;
  payload: IUser;
}

/**
 * Login Action interface
 * 
 */
export interface loginAction {
  type: typeof types.LOGIN_SUCCESS;
  payload: {};
}

/**
 * Action Type
 * 
 */
export type ActionType =
  | retrieveProductsAction
  | createProductAction
  | updateProductsAction
  | deleteProductsAction

  | retrieveBrandsAction
  | createBrandAction
  | updateBrandsAction
  | deleteBrandsAction

  | retrieveUsersAction
  | updateUsersAction
  | deleteUserAction
  | updateProfileUserAction

  | loginAction
export type ActionEntity = ActionType;