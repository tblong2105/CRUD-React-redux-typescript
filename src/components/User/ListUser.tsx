import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  retrieveUser,
  findUsersByUsername
} from '../../actions/Users';

import UserDataService from "../../services/Userservice";
import { Link, useHistory } from "react-router-dom";
import { Modal, Table, Space, Button, Input, Tooltip, Descriptions } from 'antd';

import { openNotification } from "../../helpers/Notification";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, FileOutlined } from '@ant-design/icons';
import { clearState } from "../../actions/Common";
import { IUser } from "../../@types/IUser";
import { ColumnsType } from "antd/lib/table";
import { RootState } from "../../store";


/**
 * UsersList component
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
const UsersList = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const isSuccess = useSelector((state: RootState) => state.isSuccess)
  const isError = useSelector((state: RootState) => state.isError)
  const users = useSelector((state: any) => state.users);

  const [searchByName, setSearchByName] = useState("");
  const [viewUser, setViewUser] = useState<Object | any>();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isModalVisibleView, setIsModalVisibleView] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [deleteId, setDeleteId] = useState(-1);
  const [username, setUsername] = useState("");

  const lsUsers: IUser[] = [];

  /**
   * Convert role name
   * 
   */
  if (users) {
    users.forEach((item: any) => {
      if (item.roles[0].name == "ROLE_USER") {
        item.roles[0].name = "USER"
      } else if (item.roles[0].name == "ROLE_MODERATOR") {
        item.roles[0].name = "MODERATOR"
      }
      lsUsers.push(item);
    });
  }

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
      history.push("/users")
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  /**
   * Retrieve users
   * 
   */
  useEffect(() => {
    dispatch(retrieveUser());
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
   * Find users by user name
   * 
   * @param searchByName
   */
  useEffect(() => {

    // Execute after 0.5s
    const timer = setTimeout(() => {

      // Call find users by user name action
      dispatch(findUsersByUsername(searchByName.trim()));
    }, 500);
    return () => clearTimeout(timer)
  }, [searchByName]);

  /**
   * Clear filter
   * 
   */
  const clearFilter = () => {
    setSearchByName("");

    // Call find users by user name action with param filter is none
    dispatch(findUsersByUsername(""));
  }

  /**
   * Show modal confirm delete
   * 
   * @param id 
   * @param title 
   */
  const showModalDelete = (id: number, title: string) => {
    setUsername(title);
    setDeleteId(id);
    setIsModalVisible(true);
  };

  /**
   * handle modal delete button ok
   * 
   * @param deleteId
   */
  const handleDeleteOk = () => {

    // Call api get user by id
    UserDataService.get(deleteId)

      // If success
      .then(response => {

        // Call remove user function
        removeUser(deleteId);

        // If fail
      }).catch(error => {

        // Show confirm reload page
        confirm();
      })
    setIsModalVisible(false);
  };

  /**
   * Handle modal delete button cancel
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

    // Call Get user by id action
    await UserDataService.get(id)

      // If success
      .then(response => {
        if (id > 0) {
          const res = users.find((item: any) => item.id === id);
          setViewUser(res);
          setIsModalVisibleView(true);
        }

        // If fail
      }).catch(error => {

        // Show modal confirm reload page
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
   * Remove user
   * 
   * @param id 
   */
  const removeUser = (id: number) => {

    // Call delete user action
    dispatch(deleteUser(id));
  };

  /**
   * Button update
   * 
   * @param id 
   */
  const buttonUpdate = (id: number) => {
    // Call get user by id action
    UserDataService.get(id)

      // If success
      .then(response => {
        history.push("/users/" + id);

        // If fail
      }).catch(error => {

        // SHow modal confirm reload page
        confirm();
      })
  }

  /**
   * Format table
   * 
   */
  const columns: ColumnsType<IUser> = [

    // Field user name
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      ellipsis: true,
      width: 200,
      sorter: {
        compare: (a: any, b: any) => a.username.localeCompare(b.username),
        multiple: 1,
      },
      render: (value: string, record: IUser) =>
        <a style={{ cursor: "pointer", color: "black" }} onClick={() => showModalView(record.id)} >{value}</a>
    },

    // Field full name
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      key: 'fullName',
      ellipsis: true,
      width: 230,
      sorter: {
        compare: (a: any, b: any) => a.fullName.localeCompare(b.fullName),
        multiple: 2,
      },
      render: (value: string, record: IUser) =>
        <a style={{ cursor: "pointer", color: "black" }} onClick={() => showModalView(record.id)} >{value}</a>
    },

    // Field role
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      width: 200,
      ellipsis: true,
      filters: [
        {
          text: 'USER',
          value: 'USER',
        },
        {
          text: 'MODERATOR',
          value: 'MODERATOR',
        }
      ],
      onFilter: (value: any, record: any) => {
        if (record.roles[0].name == value) return true;
        return false;
      },
      render: (roles: any) => (
        <>
          {roles[0].name}
        </>
      ),
    },
    // Some action button
    {
      title: 'Action',
      key: 'action',
      width: 199,
      render: (record: IUser) => (
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
            <Button tabIndex={-1} onClick={() => showModalDelete(record.id, record.username)} danger size={"small"}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  /**
   * Confirm modal reload page
   * 
   */
  function confirm() {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: 'User deleted, do you want to reload data?',
      onOk() {
        setIsCheck(!isCheck)
      }
    });
  }

  return (
    <div className="container mt-3">
      <div className="text-center">
        <h2>LIST USERS</h2>
      </div>
      <div className="col-md-4" style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Search
          autoFocus
          tabIndex={1}
          placeholder="Search by UserName and FullName"
          onChange={onChangeSearchByName}
          value={searchByName}
          enterButton />
        <Button onClick={clearFilter} style={{ marginLeft: "3px" }}>Clear</Button>
      </div>

      <Table
        bordered={true}
        columns={columns}
        dataSource={lsUsers}
        pagination={{
          showQuickJumper: true,
          defaultPageSize: 7,
          showSizeChanger: true,
          pageSizeOptions: ['7', '10', '20', '30'],
          total: users.size,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        scroll={{ y: 400 }}
        rowKey={products => products.id}
      />
      <Modal title="Confirm Delete" visible={isModalVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
        <p>Do you want to delete user: {username}</p>
      </Modal>

      <Modal visible={isModalVisibleView}
        closable={false}
        footer={[
          <Button onClick={handleViewCancel}>
            Close
          </Button>
        ]}
      >
        <Descriptions column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}
          title="Details" size="default" layout="vertical" bordered >
          <Descriptions.Item label="UserName" labelStyle={{ fontWeight: "bold" }} >{viewUser?.username}</Descriptions.Item>
          <Descriptions.Item label="Fullname" labelStyle={{ fontWeight: "bold" }}>{viewUser?.fullName}</Descriptions.Item>
          <Descriptions.Item label="Role" labelStyle={{ fontWeight: "bold" }}>{viewUser?.roles[0].name}</Descriptions.Item>

        </Descriptions>
        <Descriptions column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}
          size="default" layout="vertical" bordered >
          <Descriptions.Item label="Phone" labelStyle={{ fontWeight: "bold" }}>{viewUser?.phoneNumber ? viewUser.phoneNumber : "BLANK"}</Descriptions.Item>
          <Descriptions.Item label="Email" labelStyle={{ fontWeight: "bold" }}>{viewUser?.email}</Descriptions.Item>
        </Descriptions>
        <Descriptions column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}
          size="default" layout="vertical" bordered >
          <Descriptions.Item label="Address" labelStyle={{ fontWeight: "bold" }}>{viewUser?.address ? viewUser.address : "BLANK"}</Descriptions.Item>
        </Descriptions>

      </Modal>
    </div>
  );
};

export default UsersList;