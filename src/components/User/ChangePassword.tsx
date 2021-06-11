
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { checkOldPassword, retrieveUser } from '../../actions/Users';
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
    const history = useHistory();
    const isSuccess = useSelector((state: RootState) => state.isSuccess)
    const isError = useSelector((state: RootState) => state.isError)
    const { user: currentUser } = useSelector((state: any) => state.auth);

    /**
     * Clear state
     * 
     */
    useEffect(() => {
        return () => {
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
            history.push("/profile")
            if (currentUser.roles[0] === "ROLE_ADMIN") {

                // Call retrieve users action
                dispatch(retrieveUser());
            }
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    /**
     * On finish success
     * 
     * @param values 
     */
    const onFinish = (values: any) => {

        // Call check old password action
        dispatch(checkOldPassword(currentUser.id, values.oldPassword, values.newPassword))
    }

    /**
     * On finish failed
     * 
     */
    const onFinishFailed = () => {
        // Focus cursor at first text field
        (document.getElementsByClassName("ant-input")[0] as HTMLElement).focus();
    }

    /**
     * Enter key press
     * 
     * @param e 
     */
    const enterKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            history.push("/profile")
        }
    }

    return (
        <>
            <div className="text-center">
                <h2>Change Password</h2>
            </div>
            <div className="col-md-12">
                <div className="card card-container" >
                    <Form
                        validateMessages={validateMessages}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        labelAlign='left'
                        layout="vertical"
                    >
                        <Form.Item
                            label="Old Password"
                            name="oldPassword"
                            rules={[
                                { required: true },
                            ]}
                        >
                            <Input.Password autoFocus />
                        </Form.Item>

                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                { required: true },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                    message: "Password minimum eight characters, at least one uppercase , one lowercase letter and one number!"
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('oldPassword') !== value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("The new password cannot be the same as the old password"));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirm"
                            dependencies={['newPassword']}
                            rules={[
                                {
                                    required: true,
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
                        <div className="text-center">
                            <Form.Item >
                                <Button onKeyPress={enterKeyPress} type="ghost">
                                    <Link to={"/profile"}>
                                        Cancel
                                    </Link>
                                </Button>
                                &nbsp;
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;