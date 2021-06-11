import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDataService from "../../services/Userservice";

import { Link, Redirect, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { updateProfile } from '../../actions/Users'

import { Iproduct } from "../../@types/IProduct";
import { openNotification } from "../../helpers/Notification";
import { validateMessages } from '../../helpers/ValidateMessage';
import { clearState } from "../../actions/Common";
import { RootState } from "../../store";

/**
 * Profile component
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

const Profile = () => {

    const [user, setUser] = useState<Iproduct>();
    const [id, setId] = useState(0)
    const [title, setTitle] = useState("UPDATE USER");
    const dispatch = useDispatch();
    const history = useHistory();

    const isSuccess = useSelector((state: RootState) => state.isSuccess)
    const isError = useSelector((state: RootState) => state.isError)
    const { user: currentUser } = useSelector((state: any) => state.auth);

    /**
     * Get user by id
     * 
     * @param id 
     */
    const getUser = (id: number) => {
        setTitle("PERSONAL INFO")

        // Call get user by id action
        UserDataService.get(id)
            .then(response => {
                setUser({ ...response.data, roles: response.data.roles[0].name });
            })
            .catch(e => {
                openNotification("Error", e.response.data.message)
            });
    };

    /**
     * Get user
     * 
     */
    useEffect(() => {

        // If logged
        if (currentUser) {
            getUser(currentUser.id);
            setId(currentUser.id);
        }
    }, []);

    /**
     * Clear state
     * 
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
     * Update user profile
     * 
     * @param values 
     */
    const updateContent = (values: any) => {

        // Call update profile action
        dispatch(updateProfile(id, values))
        setUser(values)
    };

    /**
     * Update user component
     * 
     */
    function UpdateUser() {
        const [form] = Form.useForm();
        form.setFieldsValue(user);

        /**
         * Form item layout
         * 
         */
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 8,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                },
            },
        }

        /**
         * Tail form item layout
         * 
         */
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 0,
                    offset: 0,
                },
                sm: {
                    span: 0,
                    offset: 0,
                },
            },
        }

        /**
         * On finish success
         * 
         * @param values 
         */
        const onFinish = (values: any) => {

            // Update profile function
            updateContent(values);
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

        /**
         * Check login
         * 
         */
        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        /**
         * Enter key press
         * 
         * @param e 
         */
        const enterKeyPress = (e: any) => {
            if (e.key === 'Enter') {
                history.push("/")
            }
        }

        return (
            <div>
                <div className="text-center" style={{ marginTop: "20px" }}>
                    <h2>{title}</h2>
                </div>
                <div className="col-md-12">
                    <div className="card " style={{ width: "380px" }}>
                        <Form
                            {...formItemLayout}
                            name="updateUser"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            validateMessages={validateMessages}
                            scrollToFirstError
                            labelAlign='left'
                            form={form}>

                            <div className="text-center">
                                <img
                                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                    alt="profile-img"
                                    className="profile-img-card"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            </div>
                            <br></br>

                            <Form.Item
                                name='fullName'
                                label="Fullname"
                                rules={[
                                    { required: true },
                                    {
                                        pattern: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/
                                        , message: "Fullname cannot contain number and special characters"
                                    },
                                    { max: 30 },
                                ]}
                            >
                                <Input
                                    autoFocus
                                    tabIndex={1}
                                    style={{ width: "100%" }} ></Input>
                            </Form.Item>

                            <Form.Item
                                name='email'
                                label="E-mail"
                                rules={[
                                    { required: true },
                                    { max: 40 },
                                    { type: "email", message: "Email is not a valid email" },
                                    { whitespace: true }]}>

                                <Input
                                    tabIndex={2}
                                    style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item
                                name='phoneNumber'
                                label="Phone Number"
                                colon={false}
                                rules={[
                                    { pattern: /^(\+84|84|0)([3|5|7|8|9])([0-9]{8})$\b/, message: "PhoneNumber incorrect format!" }
                                ]}
                            >
                                <Input
                                    tabIndex={3}
                                    style={{ width: "100%" }} ></Input>
                            </Form.Item>

                            <Form.Item
                                name='address'
                                label="Address"
                                colon={false}
                                rules={[
                                    { max: 150 },
                                ]}>
                                <Input.TextArea
                                    tabIndex={4}
                                    style={{ width: "100%" }} >
                                </Input.TextArea>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                            >
                                <Link className="hyperlink" tabIndex={5} to={"/changePassword/" + currentUser.id}>Change password</Link>
                            </Form.Item>

                            <div className="text-center">
                                <Form.Item
                                    {...tailFormItemLayout}
                                >
                                    <Button onKeyPress={enterKeyPress} tabIndex={6} type="ghost">
                                        <Link to={"/"}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    &nbsp;
                                    <Button tabIndex={7} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <UpdateUser />
        </div>
    );
};

export default Profile;
