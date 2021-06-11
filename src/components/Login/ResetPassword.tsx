
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { resetPassword } from '../../actions/Users';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../helpers/Notification';
import { CONFIRM_PASSWORD, validateMessages } from '../../helpers/ValidateMessage';
import { clearState } from '../../actions/Common';
import { RootState } from '../../store';

/**
 * ChangePassword component
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

function ChangePassword() {
    const dispatch = useDispatch();
    let { token } = useParams<any>();
    const isSuccess = useSelector((state: RootState) => state.isSuccess)
    const isError = useSelector((state: RootState) => state.isError)
    const history = useHistory();


    /**
     * Clear state
     */
    useEffect(() => {
        return () => {

            // Call clear state action
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

            // If token expired then go to login 
            if (isError === "Request has expired") {
                history.push("/login")
            }
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
    const onFinish = (values: any) => {

        // Call reset password action
        dispatch(resetPassword(values.newPassword, token));
    }

    /**
     * On finish failed
     * 
     * @param error 
     */
    const onFinishFailed = (error: any) => {

        // focus cursor at first text field
        (document.getElementsByClassName("ant-input")[0] as HTMLElement).focus();
    }

    return (
        <>
            <div className="text-center" style={{ marginTop: "10px" }}>
                <h2>Reset Password</h2>
            </div>
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        validateMessages={validateMessages}
                        labelAlign='left'
                        layout="vertical"
                    >
                        <Form.Item
                            name="newPassword"
                            label="New Password"
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
                            <Input.Password autoFocus />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['newPassword']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(CONFIRM_PASSWORD));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div className="text-center" style={{ marginLeft: "70%" }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;