/**
 * handleError
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

export const handleError = (error: any) => (
    error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString();