import {
    RETRIEVE_BRANDS,
    DELETE_BRAND,
    UPDATE_BRAND,
    CREATE_BRAND,
    IS_SUCCESS,
    IS_FAIL,
} from "./Types";
import BrandDataService from '../services/BrandService';
import { handleError } from '../helpers/HandleError'
import { DELETE_SUCCESS, UPDATE_SUCCESS, CREATE_SUCCESS } from "../helpers/Constant";
import { Dispatch } from "react";
import { StatusActionEntity } from "../@types/StatusActionType";
import { ActionEntity } from "../@types/EntityActionType";
import { IBrand } from "../@types/Ibrand";

/**
 * Brands
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
 * Retrieve brands action
 */
export const retrieveBrands = () => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
    try {

        // Retrieve brands function
        const res = await BrandDataService.getAll();
        dispatch({
            type: RETRIEVE_BRANDS,
            payload: res.data,
        });

    // If retrieve brands fail
    } catch (error) {

        // Set message retrieve brands fail
        dispatch({
            type: IS_FAIL,
            payload: handleError(error)
        });
    }
};

/**
 * delete brand action
 * @param id 
 */
export const deleteBrand = (id: number) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
    try {
        // Delete brand function
        await BrandDataService.remove(id);
        dispatch({
            type: DELETE_BRAND,
            payload: id,
        });

        // Set message delete brand success
        dispatch({
            type: IS_SUCCESS,
            payload: DELETE_SUCCESS
        });

    // If delete brand fail
    } catch (error) {

        // Set message delete brand fail
        dispatch({
            type: IS_FAIL,
            payload: handleError(error)
        });
    }
};

/**
 * Update brand action
 * 
 * @param id 
 * @param data 
 */
export const updateBrand = (id: number, data: IBrand) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
    try {

        // Update brand function
        const res = await BrandDataService.update(id, data);
        dispatch({
            type: UPDATE_BRAND,
            payload: data,
        });

        // Set message update brand success
        dispatch({
            type: IS_SUCCESS,
            payload: UPDATE_SUCCESS
        })
        return Promise.resolve(res.data);

    // If update brand fail
    } catch (error) {

        // Set message update brand fail
        dispatch({
            type: IS_FAIL,
            payload: handleError(error)
        });
        return Promise.reject(error);
    }
};

/**
 * Create brand action
 * 
 * @param brandName 
 */
export const createBrand = (brandName: IBrand) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
    try {

        // Create new brand function
        const res = await BrandDataService.create(brandName);
        dispatch({
            type: CREATE_BRAND,
            payload: res.data,
        });

        // Set message create brand success
        dispatch({
            type: IS_SUCCESS,
            payload: CREATE_SUCCESS
        })
        return Promise.resolve(res.data);

    // If create brand fail
    } catch (error) {

        // Set message create brand fail
        dispatch({
            type: IS_FAIL,
            payload: handleError(error)
        });
        return Promise.reject(error);
    }
};

