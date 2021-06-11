import { notification } from 'antd';
/**
 * Notification
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

export function openNotification(status: string, message: string) {

  // If status is success
  if (status === "success") {
    
    //Show notification with type is success and message is param message
    notification.success({
      message: message,
    });

  // If status is error
  } else if (status === "error") {

    //Show notification with type is error and message is param message
    notification.error({
      message: message,
    });
  }
};