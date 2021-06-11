import * as types from "../actions/Types";

/**
 * StatusActionType
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
 * IsFail Action interface
 * 
 */
export interface isFailAction {
  type: typeof types.IS_SUCCESS;
  payload: string;
}

/**
 * IsSuccess Action interface
 * 
 */
export interface isSuccessAction {
  type: typeof types.IS_FAIL;
  payload: string;
}

/**
 * Clear States Action interface
 * 
 */
export interface clearStatesAction {
  type: typeof types.CLEAR_STATE;
  payload: null;
}

/**
 * Status Action Type
 */
export type StatusActionType =
  | isSuccessAction
  | isFailAction
  | clearStatesAction
export type StatusActionEntity = StatusActionType;