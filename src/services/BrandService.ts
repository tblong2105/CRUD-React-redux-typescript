import { IBrand } from '../@types/Ibrand';
import http from '../http-common'
import authHeader from './Auth';

/**
 * Brand service
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
 * Get all
 * 
 * @returns list brand
 */
const getAll = () => {

  // Call api get brand
  return http.get("/brands", { headers: authHeader() });
}

/**
 * Get brand by id
 * @param id 
 * @returns brand
 */
const get = (id: number) => {

  // Call api get brand by id
  return http.get(`/brands/${id}`, { headers: authHeader() });
}

/**
 * Remove brand
 * @param id 
 * @returns 
 */
const remove = (id: number) => {

  // Call api delete brand by id
  return http.delete(`brands/${id}`, { headers: authHeader() });
}

/**
 * Update brand
 * @param id 
 * @param data 
 * @returns 
 */
const update = (id: number, data: IBrand) => {

  // Call api update brand
  return http.put(`/brands/${id}`, data, { headers: authHeader() });
}

/**
 * Create new brand
 * 
 * @param data 
 * @returns 
 */
const create = (data: IBrand) => {

  // Call api create new brand
  return http.post(`/brands`, data, { headers: authHeader() });
}

const BrandService = {
  getAll,
  remove,
  update,
  get,
  create,
};
export default BrandService;