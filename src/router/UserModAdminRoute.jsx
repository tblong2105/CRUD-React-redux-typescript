import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../reducers/Auth';

/**
 * UserModAdminRoute
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

const UserModAdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>

             // If account loged and has role is ADMIN or MODERATOR or USER
            isAuth() && (isAuth().roles[0] === 'ROLE_MODERATOR' || isAuth().roles[0] === 'ROLE_ADMIN' || isAuth().roles[0] === 'ROLE_USER') ? (
                <Component {...props} />
            ) : (

                // If account only loged but hasn't role is ADMIN or MODERATOR or USER, redirect to 403 page
                isAuth() ? (
                    <Redirect
                        to={{
                            pathname: '/403',
                            state: { from: props.location }
                        }}
                    />
                ) : (

                    // If account not login yet, login required
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            )
        }
    ></Route>
);

export default UserModAdminRoute;