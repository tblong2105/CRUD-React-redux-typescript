import axios from "axios";
/**
 * AuthService
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

const API_URL = "http://localhost:8080/api/auth/";

/**
 * Register
 * 
 * @param fullname 
 * @param username 
 * @param email 
 * @param password 
 * @returns 
 */
const register = (fullname: string, username: string, email: string, password: string) => {

  // Call api register
  return axios.post(API_URL + "signup", {
    fullname,
    username,
    email,
    password,
  });
};

/**
 * Login
 * 
 * @param username 
 * @param password 
 * @returns 
 */
const login = (username: string, password: string) => {

  // Call api login
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })

    // If login success
    .then((response) => {    
      if (response.data.accessToken) {

        // Save token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

/**
 * Logout
 * 
 */
const logout = () => {

  // Remove token in LocalStorage
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;