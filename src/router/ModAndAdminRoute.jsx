import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../reducers/Auth';

/**
 * ModAndAdminRoute
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

const ModAndAdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>

             // If account loged and has role is ADMIN or MODERATOR
            isAuth() && (isAuth().roles[0] === 'ROLE_MODERATOR' || isAuth().roles[0] === 'ROLE_ADMIN') ? (
                <Component {...props} />
            ) : (
                isAuth() ? (

                    // If account only loged but hasn't role is ADMIN or MODERATOR, redirect to 403 page
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

export default ModAndAdminRoute;