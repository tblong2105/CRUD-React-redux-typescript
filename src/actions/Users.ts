import {
  RETRIEVE_USERS,
  UPDATE_USER,
  DELETE_USER,
  UPDATEPROFILE_USER,
  IS_SUCCESS,
  IS_FAIL,
} from "./Types";
import {
  CHANGE_PASSWORD_SUCCESS,
  DELETE_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_SUCCESS,
  UPDATE_SUCCESS
} from "../helpers/Constant";

import UserDataService from '../services/Userservice';
import { handleError } from '../helpers/HandleError';
import { IUser } from "../@types/IUser";
import { Dispatch } from "react";
import { ActionEntity } from "../@types/EntityActionType";
import { StatusActionEntity } from "../@types/StatusActionType";

/**
 * Users
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
 * Retrieve user action
 */
export const retrieveUser = () => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Retrieve user function
    const res = await UserDataService.getAll();
    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data
    });
  // If retrieve user fail
  } catch (error) {

    // Set message retrieve user fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
  }
};

/**
 * Update user action
 * @param id 
 * @param data 
 * @returns Promise
 */
export const updateUser = (id: number, data: IUser) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Update user function
    const res = await UserDataService.update(id, data);
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });

    // Set update user success
    dispatch({
      type: IS_SUCCESS,
      payload: UPDATE_SUCCESS
    })
    return Promise.resolve(res.data);

  // If update user fail
  } catch (error) {

    // Set message update user fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
    return Promise.reject(error);
  }
};

/**
 * Update profile action
 * 
 * @param id 
 * @param data 
 * @returns Promise
 */
export const updateProfile = (id: number, data: IUser) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Update profile function
    const res = await UserDataService.updateProfile(id, data);
    dispatch({
      type: UPDATEPROFILE_USER,
      payload: data,
    });

    // Set message update profile success
    dispatch({
      type: IS_SUCCESS,
      payload: UPDATE_SUCCESS
    })
    return Promise.resolve(res.data);

    // If update profile fail
  } catch (error) {

    // Set message update profile fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
    return Promise.reject(error);
  }
};

/**
 * Delete user action
 * @param id 
 */
export const deleteUser = (id: number) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Delete user function
    await UserDataService.remove(id);
    dispatch({
      type: DELETE_USER,
      payload: id,
    });

    // Set message delete user success
    dispatch({
      type: IS_SUCCESS,
      payload: DELETE_SUCCESS
    })
  } catch (error) {

    // Set message delete user fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
  }
};

/**
 * Find users by username action
 * @param username 
 */
export const findUsersByUsername = (username: string) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Find user by user name function
    const res = await UserDataService.findByUsername(username);
    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    });
  } catch (error) {
  }
};

/**
 * Check old password action
 * 
 * @param id 
 * @param oldPassword 
 * @param newPassword 
 */
export const checkOldPassword = (id: number, oldPassword: string, newPassword: string) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Check old password function
    const res = await UserDataService.checkOldPassword(id, oldPassword, newPassword);
    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    });

    // Set message check old password success
    dispatch({
      type: IS_SUCCESS,
      payload: CHANGE_PASSWORD_SUCCESS
    })
  } catch (error) {

    // Set message check old password fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
  }
};

/**
 * Forgot password action
 * @param email 
 */
export const forgotPassword = (email: string) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Forgot password function
    await UserDataService.forgotPassword(email);

    // Set message forgot password success
    dispatch({
      type: IS_SUCCESS,
      payload: SEND_EMAIL_SUCCESS
    })
  } catch (error) {

    // Set message forgot password fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
  }
}

/**
 * Reset password action
 * @param password 
 * @param token 
 */
export const resetPassword = (password: string, token: string) => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {
  try {

    // Reset password function
    await UserDataService.resetPassword(password, token);

    // Set message reset password success
    dispatch({
      type: IS_SUCCESS,
      payload: RESET_PASSWORD_SUCCESS
    })
  } catch (error) {

    // Set message reset password fail
    dispatch({
      type: IS_FAIL,
      payload: handleError(error)
    });
  }
}




