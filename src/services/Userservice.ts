import http from "../http-common";
import authHeader from "./Auth";

/**
 * User service
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
 * Get all user
 * @returns list user
 */
const getAll = () => {

  // Call api get user
  return http.get("/users", { headers: authHeader() });
}

/**
 * Get user by id
 * 
 * @param id 
 * @returns user
 */
const get = (id: number) => {

  // Call api get user by id
  return http.get(`/users/${id}`, { headers: authHeader() });
}



/**
 * Update user
 * 
 * @param id 
 * @param data 
 * @returns 
 */
const update = (id: number, data: any) => {

  // Call api update user
  return http.put(`/users/${id}`, data, { headers: authHeader() });
}

/**
 * Remove user
 * 
 * @param id 
 * @returns 
 */
const remove = (id: number) => {

  // Call api remove user
  return http.delete(`users/${id}`, { headers: authHeader() });
}

/**
 * Find by username
 * 
 * @param username 
 * @returns list user
 */
const findByUsername = (username: string) => {

  // Call api find user by username
  return http.get(`/users?username=${username}`, { headers: authHeader() });
}

/**
 * UpdateProfile user
 * 
 * @param id 
 * @param data 
 * @returns 
 */
const updateProfile = (id: number, data: any) => {

  // Call api update profile of user
  return http.put(`/users/profile/${id}`, data, { headers: authHeader() });
}

/**
 * CheckOldPassword user
 * 
 * @param id 
 * @param oldPassword 
 * @param newPassword 
 * @returns 
 */
const checkOldPassword = (id: number, oldPassword: string, newPassword: string) => {

  // Call api check old password
  return http.put(`/users/changepassword/${id}`, { oldPassword, newPassword }, { headers: authHeader() });
}

/**
 * ForgotPassword
 * 
 * @param email 
 * @returns 
 */
const forgotPassword = (email: any) => {

  // Call api forgot password
  return http.post(`/users/forgotpassword`, { email });
}

/**
 * ResetPassword
 * @param password 
 * @param token 
 * @returns 
 */
const resetPassword = (password: string, token: string) => {

  // Call api reset password
  return http.post(`/users/resetpassword`, { password, token });
}

const UserService = {
  getAll,
  get,
  update,
  remove,
  findByUsername,
  updateProfile,
  checkOldPassword,
  forgotPassword,
  resetPassword
};

export default UserService;