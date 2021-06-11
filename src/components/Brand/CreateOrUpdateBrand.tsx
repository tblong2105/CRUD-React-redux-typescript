import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import BrandDataService from "../../services/BrandService";
import { updateBrand, createBrand } from '../../actions/Brands';
import { openNotification } from "../../helpers/Notification";

import { validateMessages } from '../../helpers/ValidateMessage'
import { clearState } from "../../actions/Common";
import { IBrand } from "../../@types/Ibrand";
import { RootState } from "../../store";

/**
 * CreateOrUpdateBrand component
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

const CreateOrUpdateBrand = (props: IBrand) => {
  const [currentBrand, setCurentBrand] = useState<IBrand>();
  const [title, setTitle] = useState("")
  const [id, setId] = useState(0)
  const [flag, setFlag] = useState(-1)

  const history = useHistory()
  const dispatch = useDispatch()

  const isSuccess = useSelector((state: RootState) => state.isSuccess)
  const isError = useSelector((state: RootState) => state.isError)

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
      history.push("/brands")
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

   /**
   * Call get brand when brand id change
   * 
   */
    useEffect(() => {

      // Get brand by id
      getBrand(props.match.params.id);
      setId(props.match.params.id);
    }, [props.match.params.id]);

  /**
   * Get brand
   * 
   * @param id 
   */
  const getBrand = (id: number) => {

    // If param id = 0
    if (id == 0) {

      // Set title create brand
      setTitle("CREATE BRAND");

      // Go to create brand component
      setFlag(0);
      return

      // Else (param id != 0)
    } else {

      // Set title update brand
      setTitle("UPDATE BRAND")

      // Get brand by id
      BrandDataService.get(id)

        // If get brand success then set current brand
        .then(response => {
          setCurentBrand({ ...response.data, id: response.data.id });
        })

        // If get fail then show notification error
        .catch(e => {
          openNotification("error", e.response.data.message)
        });
    }
  };

 
  /**
   * Create or Update brand
   * 
   * @param values 
   */
  const createOrUpdateContent = (values: IBrand) => {

    // If is create function
    if (flag == 0) {

      // Call create action
      dispatch(createBrand(values))
      setCurentBrand(values);
    } else {

      // Call update action
      dispatch(updateBrand(id, values))
      setCurentBrand(values);
    }
  };

  /**
   * UpdateBrand function component
   * 
   */
  function UpdateBrand() {
    const [form] = Form.useForm();
    form.setFieldsValue(currentBrand);

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
    const onFinish = (values: IBrand) => {

      // Call create or update brand function
      createOrUpdateContent(values);
    }

    /**
     * On finish failed 
     * 
     * @param error 
     */
    const onFinishFailed = (error: any) => {

      // Set cursor at first text box
      (document.getElementsByClassName("ant-input")[0] as HTMLElement).focus();
    }

    /**
     * Enter key press 
     * 
     * @param e 
     */
    const enterKeyPress = (e: any) => {
      if (e.key === 'Enter') {
        history.push("/brands")
      }
    }

    return (
      <div>
        <div className="text-center">
          <h2>{title}</h2>
        </div>
        <br></br>
        <Form
          {...formItemLayout}
          validateMessages={validateMessages}
          form={form}
          name="updateBrand"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
          labelAlign='left'
        >
          <Form.Item
            name='brandName'
            label="Brand Name"
            style={{ width: "25%", marginLeft: "37%" }}
            rules={[{
              max: 32
            },
            {
              required: true, whitespace: true
            }]}
          >
            <Input
              tabIndex={1}
              autoFocus
              style={{ width: "100%" }} ></Input>

          </Form.Item>
          <div className="text-center">
            <Form.Item
              {...tailFormItemLayout}
            >
              <Button onKeyPress={enterKeyPress} tabIndex={2} type="ghost">
                <Link to={"/brands"}>
                  Cancel
                </Link>
              </Button>
              &nbsp;
              <Button tabIndex={3} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    )
  }
  return (
    <div>
      <UpdateBrand />
    </div>
  );
};

export default CreateOrUpdateBrand;
