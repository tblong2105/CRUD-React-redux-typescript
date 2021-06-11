
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from 'antd';

import { MailOutlined } from '@ant-design/icons';
import { useEffect } from "react";
import { openNotification } from "../../helpers/Notification";
import { forgotPassword } from "../../actions/Users";
import { clearState } from "../../actions/Common";
import { IAuth } from "../../@types/IAuth";
import { RootState } from "../../store";

/**
 * ForgotPassword component
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

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const isSuccess = useSelector((state: RootState) => state.isSuccess)
    const isError = useSelector((state: RootState) => state.isError)

    /**
     * Clear state
     * 
     */
    useEffect(() => {
        return () => {

            // Cleat state action
            dispatch(clearState());
        };
    }, []);

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
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    /**
     * On finish success
     * 
     * @param values 
     */
    const onFinish = (values: IAuth) => {

        // Call forgot password action
        dispatch(forgotPassword(values.email))
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

    return (
        <div className="col-md-12">
            <div className="text-center" style={{ marginTop: "10px" }}>
                <h2>Forgot Password</h2>
            </div>
            <div className="card" style={{ width: "400px" }} >
                <span style={{ paddingTop: "10px", paddingBottom: "30px" }}> We will be sending a reset password link to your email.</span>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input
                            autoFocus
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="E-Mail" />
                    </Form.Item>

                    <Form.Item >
                        <div className="text-right" style={{ marginLeft: "82%" }}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Send
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
