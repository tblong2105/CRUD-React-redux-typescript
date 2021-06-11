import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  retrieveProducts,
  findProductsByProductName
} from '../../actions/Products';

import ProductDataService from "../../services/ProductService";
import { Link, useHistory } from "react-router-dom";
import { Modal, Table, Space, Button, Input, Tooltip, Descriptions } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, FileOutlined } from '@ant-design/icons';

import { IBrand } from "../../@types/Ibrand";
import { Iproduct } from "../../@types/IProduct";
import { openNotification } from "../../helpers/Notification";

import { clearState } from "../../actions/Common";
import { timeConverter } from "../../helpers/ConvertTime";
import { ColumnsType } from "antd/lib/table";
import { RootState } from "../../store";

/**
 * ProductsList component
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

const { Search } = Input;
const ProductsList = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector((state: any) => state.products);
  const isSuccess = useSelector((state: RootState) => state.isSuccess)
  const isError = useSelector((state: RootState) => state.isError)

  const [searchByName, setSearchByName] = useState("");
  const [productName, setProductName] = useState("");
  const [deleteId, setDeleteId] = useState(-1);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleView, setIsModalVisibleView] = useState(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [viewProduct, setViewProduct] = useState<Object | any>();

  /**
   * Cleat state
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
      history.push("/products")
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  /**
   * Retrieve products
   * 
   */
  useEffect(() => {

    // Call retrieve products action
    dispatch(retrieveProducts());
  }, [isCheck]);

  /**
   * On change search by name
   * 
   * @param e 
   */
  const onChangeSearchByName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchByName = e.currentTarget.value;
    setSearchByName(searchByName);
  };

  /**
   * Find products by product name
   * @param searchByName
   */
  useEffect(() => {

    // Execute after 0.5s
    const timer = setTimeout(() => {

      // Call find products by product name action
      dispatch(findProductsByProductName(searchByName.trim()));
    }, 500);
    return () => clearTimeout(timer)
  }, [searchByName]);

  /**
   * Clear filter
   * 
   */
  const clearFilter = () => {
    setSearchByName("");
    dispatch(findProductsByProductName(""));
  }

  /**
   * Show modal confirm delete
   * 
   * @param id 
   * @param title 
   */
  const showModalDelete = (id: number, title: string) => {
    setProductName(title);
    setDeleteId(id);
    setIsModalVisible(true);
  };

  /**
   * Handle confirm delete button ok
   * 
   * @param deleteId
   */
  const handleDeleteOk = () => {

    // Call Get product by id action
    ProductDataService.get(deleteId).then(response => {

      // Call remove product function
      removeProduct(deleteId);
    }).catch(error => {

      // Confirm reload page
      confirm();
    })
    setIsModalVisible(false);
  };

  /**
   * Handle confirm delete button cancel
   * 
   */
  const handleDeleteCancel = () => {
    setIsModalVisible(false);
  };

  /**
   * Show modal view details product
   * @param id 
   */
  const showModalView = async (id: number) => {

    // Call Get product by id actipn
    await ProductDataService.get(id).then(response => {
      if (id > 0) {
        const res = products.find((item: any) => item.id === id);
        setViewProduct(res);
        setIsModalVisibleView(true);
      }
    }).catch(error => {
      confirm();
    })
  };

  /**
   * Handle view button cancel
   * 
   */
  const handleViewCancel = () => {
    setIsModalVisibleView(false);
  };


  /**
   * Remove product
   * 
   * @param id 
   */
  const removeProduct = (id: number) => {

    // Call delete product action
    dispatch(deleteProduct(id));
  };

  /**
   * Button update
   * 
   * @param id 
   */
  const buttonUpdate = (id: number) => {

    // Call Get product by id action
    ProductDataService.get(id).then(response => {
      history.push("/products/" + id);
    }).catch(error => {
      confirm();
    })
  }

  /**
   * Format table 
   */
  const columns: ColumnsType<Iproduct> = [
    // Filed product name
    {
      title: 'Product Name',
      dataIndex: 'productName',
      ellipsis: true,
      key: 'productName',
      width: 299,
      sorter: {
        compare: (a: Iproduct, b: Iproduct) => a.productName.localeCompare(b.productName),
        multiple: 1,
      },
      render: (value: string, record: Iproduct) =>
        <a style={{ cursor: "pointer", color: "black" }} onClick={() => showModalView(record.id)} >{value}</a>
    },

    // Field Price
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      ellipsis: true,
      width: 160,
      sorter: {
        compare: (a: Iproduct, b: Iproduct) => a.price - b.price,
        multiple: 2,
      },
      render: (price: number) => {
        return formatter.format(price);
      },
    },

    // Field brand
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      ellipsis: true,
      width: 180,
      render: (brand: IBrand) => (
        <>
          {brand.brandName}
        </>
      ),
    },

    // Some action button
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (record: Iproduct) => (
        <Space size="middle">
          <Tooltip title="View">
            <Button tabIndex={-1} style={{ color: "green", borderColor: "green" }} size={"small"} onClick={() => showModalView(record.id)}>
              <FileOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Update">
            <Button tabIndex={-1} type="primary" ghost size={"small"} onClick={() => buttonUpdate(record.id)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button tabIndex={-1} onClick={() => showModalDelete(record.id, record.productName)} danger size={"small"}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Format price
  var formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0
  });

  // Modal confirm reload page
  function confirm() {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: 'Product deleted, do you want to reload data?',
      onOk() {
        setIsCheck(!isCheck)
      },
      onCancel() {
      }
    });
  }

  return (
    <div className="container mt-3">
      <div className="text-center">
        <h2>LIST PRODUCTS</h2>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <div className="col-md-12" style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="col-md-4" style={{ display: "flex", justifyContent: "space-between" }}>
            <Search
              autoFocus
              tabIndex={1}
              placeholder="Search by ProductName"
              onChange={onChangeSearchByName}
              value={searchByName}
              enterButton />
            <Button onClick={clearFilter} style={{ marginLeft: "3px" }}>Clear</Button>
          </div>
          <Button type="primary">
            <Link style={{ color: "white" }} to={"/products/0"}>
              Add Product
                </Link>
          </Button>
        </div>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={products}
        pagination={{
          showQuickJumper: true,
          defaultPageSize: 7,
          showSizeChanger: true,
          pageSizeOptions: ['7', '10', '20', '30'],
          total: products.size,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        scroll={{ y: 400 }}
        rowKey={products => products.id}

      />
      <Modal title="Confirm Delete" visible={isModalVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
        <p>Do you want to delete product: {productName}</p>
      </Modal>

      <Modal
        visible={isModalVisibleView}
        closable={false}
        footer={[
          <Button autoFocus onClick={handleViewCancel}>
            Close
        </Button>
        ]}
      >
        <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          title="Details" size="default" layout="vertical" bordered >
          <Descriptions.Item label="ProductName" labelStyle={{ fontWeight: "bold" }} >{viewProduct?.productName}</Descriptions.Item>
          <Descriptions.Item label="Brand" labelStyle={{ fontWeight: "bold" }}>{viewProduct?.brand.brandName}</Descriptions.Item>
          <Descriptions.Item label="Created Date" labelStyle={{ fontWeight: "bold" }}>{timeConverter(viewProduct?.createDate)}</Descriptions.Item>
          <Descriptions.Item label="Price" labelStyle={{ fontWeight: "bold" }}>{viewProduct?.price}$</Descriptions.Item>
        </Descriptions>
        <Descriptions size="small" layout="vertical" bordered>
          <Descriptions.Item label="Description" labelStyle={{ fontWeight: "bold" }}>{viewProduct?.description}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default ProductsList;