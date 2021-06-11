import { Iproduct } from '../@types/IProduct';
import http from '../http-common'
import authHeader from './Auth';

/**
 * Product service
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
 * Get all product
 * @returns list product
 */
const getAll = () => {

    // Call api get product
    return http.get("/products", { headers: authHeader() });
}

/**
 * Get product by id
 * @param id 
 * @returns product
 */
const get = (id: number) => {

    // Call api get product by id
    return http.get(`/products/${id}`, { headers: authHeader() });
}

/**
 * Create new product
 * @param data 
 * @returns 
 */
const create = (data: any) => {

    // Call api create new product
    return http.post(`/products`, data, { headers: authHeader() });
}

/**
 * Update product
 * 
 * @param id 
 * @param data 
 * @returns 
 */
const update = (id: number, data: Iproduct) => {

    // Call api update product by id
    return http.put(`/products/${id}`, data, { headers: authHeader() });
}


/**
 * Remove product
 * 
 * @param id 
 * @returns 
 */
const remove = (id: number) => {

    // Call api delete product
    return http.delete(`products/${id}`, { headers: authHeader() });
}

/**
 * Find by product name
 * 
 * @param productName 
 * @returns 
 */
const findByProductName = (productName: string) => {

    // Call api find product by product name
    return http.get(`/products?productName=${productName}`, { headers: authHeader() });
}



const ProductService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByProductName
};

export default ProductService;