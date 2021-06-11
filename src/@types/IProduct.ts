import { IBrand } from "./Ibrand";

/**
 * Iproduct interface
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

export interface Iproduct {
  id: number,
  productName: string,
  description: string,
  price: number,
  enabled: boolean,
  brand: IBrand,
  match: any
}
