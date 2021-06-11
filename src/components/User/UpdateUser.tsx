import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDataService from "../../services/Userservice";

import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import { updateUser } from '../../actions/Users'

import { Iproduct } from "../../@types/IProduct";
import { openNotification } from "../../helpers/Notification";
import { validateMessages } from '../../helpers/ValidateMessage';
import { clearState } from "../../actions/Common";
import { RootState } from "../../store";

/**
 * UpdateUser component
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

const { Option } = Select;
const UpdateUser = (props: any) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [id, setId] = useState(0)
  const [user, setUser] = useState<Iproduct>();
  const [title, setTitle] = useState("");

  const isSuccess = useSelector((state: RootState) => state.isSuccess)
  const isError = useSelector((state: RootState) => state.isError)


  /**
   * Get user by id
   * @param id 
   */
  const getUser = (id: number) => {
    setTitle("UPDATE USER")

    // Call get user by id action
    UserDataService.get(id)
      .then(response => {
        setUser({ ...response.data, roles: response.data.roles[0].name });
      })
      .catch(e => {

        // Show notification error
        openNotification("Error", e.response.data.message)
      });

  };

  /**
   * Get user when id user change
   */
  useEffect(() => {
    getUser(props.match.params.id);
    setId(props.match.params.id);
  }, [props.match.params.id]);

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
      history.push("/users")
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  /**
   * Update user
   * @param values 
   */
  const updateContent = (values: any) => {

    // Call update user action
    dispatch(updateUser(id, values))
    setUser(values)
  };

  /**
   * Update User component
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
      updateContent(values);
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
      <div>
        <div className="text-center">
          <h2>{title}</h2>
        </div>
        <br></br>
        <div className="col-md-12">
          <div className="card " style={{ width: "380px" }}>
            <div className="text-center">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
            <br></br>
            <Form
              {...formItemLayout}
              name="updateUser"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              validateMessages={validateMessages}
              scrollToFirstError
              labelAlign='left'
              form={form}>

              <Form.Item
                name='username'
                label="Username"
                rules={[
                  { required: true },
                  {
                    pattern: /^(?=.{5,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/,
                    message: "Username requires between 5 and 20 characters and does not contain spaces and special characters!"
                  }
                ]}
              >
                <Input
                  autoFocus
                  tabIndex={1}
                  style={{ width: "100%" }} ></Input>
              </Form.Item>

              <Form.Item
                name='roles'
                label="Roles"
                rules={[
                  {
                    required: true
                  },
                ]}>

                <Select tabIndex={2} style={{ width: "58%" }}>
                  <Option value="ROLE_USER">USER</Option>
                  <Option value="ROLE_MODERATOR">MODERATOR</Option>
                </Select>
              </Form.Item>

              <div className="text-center">
                <Form.Item
                  {...tailFormItemLayout}
                >
                  <Button tabIndex={3} type="ghost">
                    <Link to={"/users"}>
                      Cancel
                    </Link>
                  </Button>
                  &nbsp;
                  <Button tabIndex={4} type="primary" htmlType="submit">
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

export default UpdateUser;
