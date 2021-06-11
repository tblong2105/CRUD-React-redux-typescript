
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { login } from '../../actions/Auth'
import { useEffect, useState } from "react";
import { IAuth } from "../../@types/IAuth";

import { validateMessages } from "../../helpers/ValidateMessage";
import { clearState } from "../../actions/Common";
import { RootState } from "../../store";
import { isAuth } from "../../reducers/Auth";

/**
 * Login component
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

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSuccess = useSelector((state: RootState) => state.isSuccess)
  const isError = useSelector((state: RootState) => state.isError)
  const [errorMessage, setErrorMessage] = useState<String>('');

  /**
   * Clear state
   */
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  /**
   * Show notification
   */
  useEffect(() => {
    // If error
    if (isError) {
      setErrorMessage(isError);

      // Focus cursor at first text field
      (document.getElementsByClassName("ant-input")[0] as HTMLElement).focus();
      dispatch(clearState());
    }

    // If success
    if (isSuccess) {
      history.push("/home")
      window.location.reload();
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  /**
   * On finish success
   * 
   * @param values 
   */
  const onFinish = (values: IAuth) => {

    // Call login action
    dispatch(login(values.username, values.password))
  };

  /**
   * Check login, if not login yet then go to homepage
   */
  if (isAuth()) {
    history.push("/")
  }

  /**
   * On finish failed
   * 
   * @param error 
   */
  const onFinishFailed = (error: any) => {

    // Focus cursor at first text field
    (document.getElementsByClassName("ant-input")[0] as HTMLElement).focus();
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <br></br>
        <Form
          name="normal_login"
          className="login-form"
          validateMessages={validateMessages}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onChange={() => { setErrorMessage('') }}
          layout="vertical"
        >

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input autoFocus />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <p style={{ color: 'red', marginTop: "-15px", marginBottom: "40px", textAlign: "center" }}>{errorMessage}</p>
          <div style={{ marginTop: "-10px" }}>
            <a className="hyperlink"><Link to={"/forgotpassword"}>Forgot password?</Link></a>
          </div>
          <br></br>

          <Form.Item >
            <div style={{
              display: "flex", justifyContent: "space-between"
            }}>
              <Link className="linkhover" style={{ marginTop: "10px", fontWeight: "bold" }} to={"/register"}>Create account</Link>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Sign In
            </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
