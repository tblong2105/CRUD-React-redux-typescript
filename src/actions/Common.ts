import { Dispatch } from "react";
import { ActionEntity } from "../@types/EntityActionType";
import { StatusActionEntity } from "../@types/StatusActionType";
import { CLEAR_STATE } from "./Types";

/**
 * Common
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
 * ClearState action
 */
export const clearState = () => async (dispatch: Dispatch<ActionEntity | StatusActionEntity>) => {

  // Set state null
    dispatch({
      type: CLEAR_STATE,
      payload: null,
    });
  };