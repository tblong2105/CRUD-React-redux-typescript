import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../actions/Products";

import ProductDataService from "../../services/ProductService";
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, InputNumber, Select } from 'antd';

import { createProduct } from "../../actions/Products";
import { retrieveBrands } from '../../actions/Brands';
import { Iproduct } from "../../@types/IProduct";

import { openNotification } from "../../helpers/Notification";
import { IBrand } from "../../@types/Ibrand";
import { validateMessages } from '../../helpers/ValidateMessage'
import { clearState } from "../../actions/Common";
import { RootState } from "../../store";

/**
 * CreateOrUpdateProduct component
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
const CreateOrUpdateProduct = (props: Iproduct) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [currentProduct, setCurrentProduct] = useState<Iproduct>();
  const [id, setId] = useState(0)
  const [flag, setFlag] = useState(-1);
  const [title, setTitle] = useState("");

  const isSuccess = useSelector((state: RootState) => state.isSuccess)
  const isError = useSelector((state: RootState) => state.isError)
  const brands = useSelector((state: any) => state.brands);


  /**
   * Get product by id
   * 
   * @param id 
   */
  const getProduct = (id: number) => {

    // If param id = 0 then goto create product component
    if (id == 0) {
      setTitle("CREATE PRODUCT");
      setFlag(0);
      return

      // Else (param id != 0) then goto update product component
    } else {
      setTitle("UPDATE PRODUCT")

      // Get product by id function
      ProductDataService.get(id)

        // If get product success
        .then(response => {
          setCurrentProduct({ ...response.data, brand: response.data.brand.brandName });
        })

        // If get product fail
        .catch(e => {

          // Show notification error
          openNotification("Error", e.response.data.message)
        });
    }
  };

  /**
   * Retrieve brands
   * 
   */
  useEffect(() => {

    // Call retrive brands action
    dispatch(retrieveBrands());
  }, []);

  /**
   * Get product by id when id change
   */
  useEffect(() => {
    getProduct(props.match.params.id);
    setId(props.match.params.id);
  }, [props.match.params.id]);

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

    //If success
    if (isSuccess) {

      // Show notification success
      openNotification("success", isSuccess)
      history.push("/products")
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  /**
   * Save product
   * 
   * @param values 
   */
  const saveProduct = (values: Iproduct) => {
    const { productName, description, price, brand } = values;

    // Call create product action
    dispatch(createProduct(productName, description, price, brand))
    setCurrentProduct(values);
  };

  /**
   * Update product
   * 
   * @param values 
   */
  const updateContent = (values: Iproduct) => {
    var flagCheckBrandExist = false;

    // Get brand name from UI
    var checkBrandExist = document.getElementsByClassName('ant-select-selection-item');

    //Check brand is exist or not
    brands.map((item: IBrand) => {
      if (item.brandName === checkBrandExist[0].innerHTML) {
        flagCheckBrandExist = true;
      }
    })

    // If brand is exist
    if (flagCheckBrandExist) {

      // If param id = 0 (create product component)
      if (flag == 0) {

        // Call save product action
        dispatch(saveProduct(values))

        // If param id != 0 then (update product component)
      } else {

        // Convert brand name to brand id
        brands.map((item: any) => {
          if (values.brand === item.brandName) {
            values.brand = item.id;
          }
        })

        // Call update brand action
        dispatch(updateProduct(id, values))
        setCurrentProduct(values)
      }
    } else {
      openNotification("error", "Brand is not exist!!!")
    }
  };

  /**
   * Create or update product component
   * 
   */
  function CreateOrUpdateProduct() {
    const [form] = Form.useForm();
    form.setFieldsValue(currentProduct);

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
    const onFinish = (values: Iproduct) => {
      updateContent(values);
    }

    /**
     * On finish failed
     * @param error 
     */
    const onFinishFailed = (error: any) => {

      // Focus cursor at first text field
      (document.getElementsByClassName("ant-select-selection-search-input")[0] as HTMLElement).focus();
    }

    /**
     * Enter key press
     * @param e 
     */
    const enterKeyPress = (e: any) => {
      if (e.key === 'Enter') {
        history.push("/products")
      }
    }

    return (
      <div>
        <div className="text-center">
          <h2>{title}</h2>
        </div>
        <div className="col-md-12">
          <div className="card " style={{ width: "800px" }}>
            <Form
              {...formItemLayout}
              name="updateProduct"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              validateMessages={validateMessages}
              scrollToFirstError
              labelAlign='left'
              form={form}>

              {brands.length > 0 ? (
                <Form.Item
                  name='brand'
                  label="Brand"
                  rules={[
                    {
                      required: true
                    },
                  ]}
                >
                  <Select autoFocus tabIndex={1} style={{ width: "60%" }}>
                    {brands.map((brand: IBrand) => (
                      <Option value={brand.id} key={brand.brandName}>{brand.brandName}</Option>
                    ))}
                  </Select>
                </Form.Item>) : (<Form.Item
                  name='brand'
                  label="Brand"
                  rules={[
                    {
                      required: true
                    },
                  ]}
                >
                  <Select style={{ width: "35%" }}>
                  </Select>
                </Form.Item>)}

              <Form.Item
                name='productName'
                label="Product Name"
                rules={[{
                  max: 50
                },
                {
                  required: true, whitespace: true
                }]}
              >
                <Input
                  tabIndex={2}
                  style={{ width: "100%" }} ></Input>
              </Form.Item>

              <Form.Item
                name='price'
                label="Price"
                rules={[
                  {
                    required: true
                  },
                  {
                    type: 'number',
                    min: 0,
                    max: 999999
                  }]}>
                <InputNumber
                  tabIndex={3}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: "25%" }} />
              </Form.Item>

              <Form.Item
                name='description'
                label="Description"
                rules={[{
                  required: true, message: "Please input description"
                },
                {
                  max: 500
                },
                { whitespace: true }]}>

                <Input.TextArea tabIndex={4} style={{ width: "100%" }} />
              </Form.Item>

              <div className="text-center">
                <Form.Item
                  {...tailFormItemLayout}
                >
                  <Button onKeyPress={enterKeyPress} tabIndex={5} type="ghost">
                    <Link to={"/products"}>
                      Cancel
                    </Link>
                  </Button>
                  &nbsp;
                  <Button tabIndex={6} type="primary" htmlType="submit">
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
      <CreateOrUpdateProduct />
    </div>
  );
};

export default CreateOrUpdateProduct;
