import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Display/Header';

import CreateOrUpdateProduct from "./components/Product/CreateOrUpdateProduct";
import ListProducts from "./components/Product/ListProducts";

import CreateAndUpdateBrand from './components/Brand/CreateOrUpdateBrand';
import ListBrands from './components/Brand/ListBrands'

import CreateAndUpdateUser from './components/User/UpdateUser';
import ListUsers from './components/User/ListUser'

import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Profile from './components/User/Profile'
import ChangePassword from './components/User/ChangePassword';
import AdminRoute from './router/AdminRouter';

import HomePage from './components/Display/HomePage';
import Page404 from './components/ErrorPage/404';
import Page403 from './components/ErrorPage/403';
import ModAndAdminRoute from './router/ModAndAdminRoute';
import UserModAdminRoute from './router/UserModAdminRoute';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';

/**
 * App
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

function App() {
  return (
    <>
      <Router >
        <Header />
        <>
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />              
            <Route exact path={["/", "/home"]} component={HomePage} />
            <Route exact path={"/forgotpassword"} component={ForgotPassword} />
            <Route path={"/resetpassword/:token"} component={ResetPassword} />
            <Route path = "/shopping" component={HomePage}    />      
            <Route exact path={"/403"} component={Page403} />  
                       
            <AdminRoute path="/users" exact component={ListUsers} />
            <AdminRoute path="/users/:id" component={CreateAndUpdateUser} />
            
            <ModAndAdminRoute path="/products" exact component={ListProducts} />
            <ModAndAdminRoute path="/products/:id" component={CreateOrUpdateProduct} />  
            <ModAndAdminRoute path="/brands" exact component={ListBrands} />
            <ModAndAdminRoute path="/brands/:id" component={CreateAndUpdateBrand} />

            <UserModAdminRoute path="/profile" exact component={Profile} />
            <UserModAdminRoute path="/changePassword/:id" component={ChangePassword} />
            <Route component={Page404} />
          </Switch>
        </>
      </Router>

    </>
  );
}

export default App;
