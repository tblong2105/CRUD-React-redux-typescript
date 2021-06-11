import {
  CREATE_PRODUCT,
  RETRIEVE_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  IS_SUCCESS,
  IS_FAIL,
} from "./Types";
import ProductDataService from '../services/ProductService';
import { Dispatch } from 'react'
import { IBrand } from "../@types/Ibrand";
import { Iproduct } from "../@types/IProduct";
import { handleError } from '../helpers/HandleError'
import { CREATE_SUCCESS, DELETE_SUCCESS, UPDATE_SUCCESS } from "../helpers/Constant";
import { ActionEntity } from "../@types/EntityActionType";
import { StatusActionEntity } from "../@types/StatusActionType";


/**
 * Products
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
 * Create product action 
 * 
 * @param productName 
 * @param description 
 * @param price 
 * @param brand 
 * @returns Promise
 */
export const createProduct = (productName: string, description: string, price: number, brand: IBrand) =>
  async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
    try {

      // Create product function
      const res = await ProductDataService.create({ productName, description, price, brand });
      dispatch({
        type: CREATE_PRODUCT,
        payload: res.data,
      });

      // Set message create product success
      dispatch({
        type: IS_SUCCESS,
        payload: CREATE_SUCCESS
      })
      return Promise.resolve(res.data);

    // If create product fail
    } catch (error) {

      // Set message create product fail
      dispatch({
        type: IS_FAIL,
        payload: handleError(error)
      });
      return Promise.reject(error);
    }
  };

  /**
   * Retrieve products action
   */
export const retrieveProducts = () => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Retrieve products function
    const res = await ProductDataService.getAll();
    dispatch({
      type: RETRIEVE_PRODUCTS,
      payload: res.data,
    });

  // If retrieve products fail
  } catch (error) {

    // Set message retrieve products fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
  }
};

/**
 * Update product action
 * 
 * @param id 
 * @param data 
 * @returns Promise
 */
export const updateProduct = (id: number, data: Iproduct) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Update products function
    const res = await ProductDataService.update(id, data);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });

    // Set message update product success
    dispatch({
      type: IS_SUCCESS,
      payload: UPDATE_SUCCESS
    })
    return Promise.resolve(res.data);

  // If update product fail
  } catch (error) {

    // Set message update product fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
    return Promise.reject(error);
  }
};

/**
 * Delete product action 
 * 
 * @param id 
 */
export const deleteProduct = (id: number) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Delete products function
    await ProductDataService.remove(id);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });

    // Set message delete product success
    dispatch({
      type: IS_SUCCESS,
      payload: DELETE_SUCCESS
    })

  // If delete products fail
  } catch (error) {

    // Set message delete product fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
  }
};

/**
 * Find products by product name action
 * 
 * @param productName 
 */
export const findProductsByProductName = (productName: string) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Find products by product name function
    const res = await ProductDataService.findByProductName(productName);
    dispatch({
      type: RETRIEVE_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
  }
};



