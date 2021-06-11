import {
  deleteBrand,
  retrieveBrands,
} from "../../actions/Brands";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { Table, Space, Modal, Button, Tooltip, Descriptions } from 'antd';
import { IBrand } from "../../@types/Ibrand";
import BrandDataService from "../../services/BrandService";

import { openNotification } from "../../helpers/Notification";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, FileOutlined } from '@ant-design/icons';
import { clearState } from "../../actions/Common";
import { timeConverter } from "../../helpers/ConvertTime";
import { ColumnsType } from "antd/lib/table";
import { RootState } from "../../store";


/**
 * BrandsList component
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


const BrandsList = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const isSuccess = useSelector((state: RootState) => state.isSuccess)
  const isError = useSelector((state: RootState) => state.isError)
  const brands = useSelector((state: any) => state.brands);

  const [viewBrand, setViewBrand] = useState<Object | any>();
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const [deleteId, setDeleteId] = useState(-1);
  const [brandName, setBrandName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleView, setIsModalVisibleView] = useState(false);

  /**
   * Clear state
   */
  useEffect(() => {
    return () => {

      // Clear state action
      dispatch(clearState());
    };
  }, []);

  /**
   * Show notification
   */
  useEffect(() => {

    // If is error
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
   * Retrieve brands
   */
  useEffect(() => {

    // List brands when isCheck change
    dispatch(retrieveBrands());
  }, [isCheck]);

  /**
   * Remove brand
   * 
   * @param id 
   */
  const removeBrand = (id: number) => {

    // Call delete brand action
    dispatch(deleteBrand(id));
  };

  /**
   * Show modal conform delete
   * 
   * @param id 
   * @param title 
   */
  const showModalDelete = (id: number, title: string) => {
    setBrandName(title);
    setDeleteId(id);
    setIsModalVisible(true);
  };

  /**
   * Handle model confirm delete button Ok
   * 
   */
  const handleDeleteOk = () => {

    // Get brand by id function
    BrandDataService.get(deleteId)

      // If brand is exist
      .then(response => {

        // Call remove brand action
        removeBrand(deleteId);

        // If brand isn't exist
      }).catch(error => {

        // Show modal confirm reload page because brand is deleted
        confirm();
      })
    setIsModalVisible(false);
  };

  /**
   * Handle delete button cancel
   * 
   */
  const handleDeleteCancel = () => {
    setIsModalVisible(false);
  };

  /**
   * Show modal view
   * 
   * @param id 
   */
  const showModalView = async (id: number) => {

    // Get brand by id
    await BrandDataService.get(id)

      // If brand is exist
      .then(response => {
        if (id > 0) {
          const res = brands.find((item: any) => item.id === id);
          setViewBrand(res);
          setIsModalVisibleView(true);
        }

        // If brand isn't exist
      }).catch(error => {
        confirm()
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
   * Button update 
   * 
   * @param id 
   */
  const buttonUpdate = (id: number) => {

    // Get brand by id
    BrandDataService.get(id)

      // If brand is exist
      .then(response => {
        history.push("/brands/" + id);

        // If brand isn't exist, show modal cofirm reload page
      }).catch(error => {
        confirm();
      })
  }

  /**
   * Format table 
   */
  const columns: ColumnsType<IBrand> = [
    {
      // Field Brand Name
      title: 'Brand Name',
      dataIndex: 'brandName',
      key: 'brandName',
      ellipsis: true,
      sorter: {
        compare: (a: IBrand, b: IBrand) => a.brandName.localeCompare(b.brandName),
        multiple: 10,
      },
      render: (value: string, record: IBrand) =>
        <a style={{ cursor: "pointer", color: "black" }} onClick={() => showModalView(record.id)} >{value}</a>
    },
    {
      // Some button action
      title: 'Action',
      key: 'action',
      render: (record: IBrand) => (
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
            <Button tabIndex={-1} danger size={"small"} onClick={() => showModalDelete(record.id, record.brandName)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  /**
   * Confirm modal
   */
  function confirm() {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: 'Brand deleted, do you want to reload data?',

      // If click button OK then change isCheck 
      onOk() {
        setIsCheck(!isCheck)
      }
    });
  }


  return (
    <div className="container mt-3">
      <div className="text-center">
        <h2>LIST BRANDS</h2>
      </div>
      <div className="mb-1" style={{ float: "right" }}>
        <Button type="primary">
          <Link style={{ color: "white" }} to={"/brands/0"}>
            Add Brand
          </Link>
        </Button>
      </div>
      <Table bordered={true} showHeader columns={columns} dataSource={brands}

        pagination={
          {
            showQuickJumper: true,
            defaultPageSize: 7,
            showSizeChanger: true,
            pageSizeOptions: ['7', '10', '20', '30'],
            total: brands.size,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }
        }
        scroll={{ y: 400 }}
        rowKey={brands => brands.id}

      />
      <Modal title="Confirm Delete" visible={isModalVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
        <p>Do you want to delete brand: {brandName}</p>
      </Modal>

      <Modal visible={isModalVisibleView}
        closable={false}
        footer={[
          <Button onClick={handleViewCancel}>
            Close
        </Button>
        ]}
      >
        <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          title="Details" size="default" layout="vertical" bordered>
          <Descriptions.Item label="BrandName" labelStyle={{ fontWeight: "bold" }}>{viewBrand?.brandName}</Descriptions.Item>
          <Descriptions.Item label="Created Date" labelStyle={{ fontWeight: "bold" }}>{timeConverter(viewBrand?.createDate)}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};
export default BrandsList;