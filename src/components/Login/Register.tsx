import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';

import { Form, Input, Button } from 'antd';
import { register } from "../../actions/Auth";
import { openNotification } from "../../helpers/Notification";
import { CONFIRM_PASSWORD, validateMessages } from "../../helpers/ValidateMessage";
import { clearState } from "../../actions/Common";
import { IAuth } from "../../@types/IAuth";
import { RootState } from "../../store";

/**
 * Register component
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

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSuccess = useSelector((state: RootState) => state.isSuccess)
  const isError = useSelector((state: RootState) => state.isError)
  const [flag, setFlag] = useState(true);

  /**
   * Show notification
   * 
   */
  useEffect(() => {
    // If error
    if (isError) {

      // Show notification error
      openNotification("error", isError)
      dispatch(clearState());
    }

    // If success
    if (isSuccess) {

      // Show notification success
      openNotification("success", isSuccess)
      history.push("/login")
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  /**
   * On finish success
   * 
   * @param values 
   */
  const onFinish = (values: IAuth) => {
    if (flag) {

      // Call register action 
      dispatch(register(values.fullname, values.username, values.email, values.password))
      setFlag(false)
    }
  };

  /**
   * On finish failed 
   * 
   * @param error 
   */
  const onFinishFailed = (error: any) => {

    // Focus cursor at first text field 
    (document.getElementsByClassName("ant-input")[0] as HTMLElement).focus();
  }

  /**
   * Form item layout
   * 
   */
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 16,
      },
      sm: {
        span: 16,
      },
    },
    wrapperCol: {
      xs: {
        span: 6,
      },
      sm: {
        span: 24,
      },
    },
  }

  return (
    <div className="col-md-12">
      <div className="card " style={{ width: "390px", marginTop: "10px" }}>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
          style={{ marginTop: "-13px" }}
        />
        <Form
          {...formItemLayout}
          validateMessages={validateMessages}
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
          labelAlign='left'
          layout="vertical"
        >
          <Form.Item
            className="register-formitem"
            name="fullname"
            label="FullName"
            rules={[
              { required: true },
              { max: 30 },
              { whitespace: true },
              {
                pattern: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/,
                message: "Fullname cannot contain number and special characters"
              }
            ]}
          >
            <Input tabIndex={0} autoFocus />
          </Form.Item>

          <Form.Item
            className="register-formitem"
            name="username"
            label="Username"
            rules={[
              { required: true },
              {
                pattern: /^(?=.{5,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/,
                message: "Username requires between 5 and 20 characters and does not contain spaces and special characters!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="register-formitem"
            name="email"
            label="E-Mail"
            rules={[
              { required: true },
              { max: 40 },
              { type: "email", message: "Email is not a valid email" },
              { whitespace: true }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="register-formitem"
            name="password"
            label="Password"
            rules={[
              { required: true },
              { max: 20 },
              { whitespace: true },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: "Password minimum eight characters, at least one uppercase, one lowercase letter and one number!"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="register-formitem"
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
              },
              { whitespace: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(CONFIRM_PASSWORD));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <div style={{
              display: "flex", justifyContent: "space-between"
            }}>
              <Link className="linkhover" style={{ marginTop: "10px", fontWeight: "bold" }} to={"/login"}>
                Sign in instead
              </Link>
              &nbsp;
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
