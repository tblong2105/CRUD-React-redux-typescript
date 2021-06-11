import { Dropdown, Menu } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../../actions/Auth';
import { isAuth } from "../../reducers/Auth";
import UserDataService from "../../services/Userservice";

/**
 * Header component
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

function HeaderComponent() {

    const [fullname, setFullname] = useState();
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);

    const isSuccess = useSelector((state: any) => state.isSuccess)
    const { user: currentUser } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    /**
     * Set role
     * 
     */
    useEffect(() => {

        // If isAuth is exist
        if (isAuth()) {
            setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
            setShowUserBoard(currentUser.roles.includes("ROLE_USER"));
        }
    }, [currentUser]);

    /** 
     * Get user by id
     */
    useEffect(() => {

        // If current user exist
        if (currentUser) {

            // Call get user function
            getUser(currentUser.id);
        }
    }, [isSuccess]);

    /**
     * Get user function
     * 
     * @param id 
     */
    const getUser = (id: number) => {

        // Call api get user by id
        UserDataService.get(id)

            // If success
            .then(response => {
                setFullname(response.data.fullName)
            })
            .catch(e => {
            });
    };

    /**
     * Logout
     * 
     */
    const logOut = () => {

        // Call login action
        dispatch(logout());
    };

    /**
     * Navbar
     * 
     */
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to={"/profile"} className="nav-link">
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Item>
                <a href="/login" className="nav-link" onClick={logOut}>
                    Log out
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            <div className="navbar-nav mr-auto">
                <Link tabIndex={-1} style={{ marginLeft: "10px" }} to={"/"} className="navbar-brand">
                    CRUD APP
                </Link>
                <li className="nav-item active">
                    <Link tabIndex={-1} to={"/home"} className="nav-link">
                        Home
                    </Link>
                </li>

                {showModeratorBoard && (
                    <>
                        <li className="nav-item">
                            <Link tabIndex={-1} to={"/products"} className="nav-link">
                                Products
                         </Link>
                        </li>
                        <li className="nav-item">
                            <Link tabIndex={-1} to={"/brands"} className="nav-link">
                                Brands
                         </Link>
                        </li>
                    </>
                )}

                {showAdminBoard && (
                    <>
                        <li className="nav-item">
                            <Link tabIndex={-1} to={"/users"} className="nav-link">
                                Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link tabIndex={-1} to={"/products"} className="nav-link">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link tabIndex={-1} to={"/brands"} className="nav-link">
                                Brands
                            </Link>
                        </li>
                    </>
                )}

                {showUserBoard && (
                    <li className="nav-item">
                        <Link tabIndex={-1} to={"/user"} className="nav-link">
                            User Board
                        </Link>
                    </li>
                )}
            </div>
            <div >
                {isAuth() ? (
                    <Dropdown overlay={menu}>
                        <a tabIndex={-1} style={{ color: "white", marginRight: "15px" }} onClick={e => e.preventDefault()}>
                            {fullname}
                        </a>
                    </Dropdown>
                ) : (
                    <ul className="navbar-nav ml-auto navbar-right">
                        <li className="nav-item">
                            <Link tabIndex={-1} to={"/login"} className="nav-link">
                                Sign In
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link tabIndex={-1} to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default HeaderComponent;