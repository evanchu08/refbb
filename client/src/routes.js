import React, { Component } from 'react';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import './Resources/css/styles.css';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/Register';
import userDashboard from './components/User';
import Shop from './components/Shop';
import Auth from './hoc/auth';
import AddProduct from './components/User/Admin/AddProduct';
import UserCart from './components/User/Admin/cart';
import ManageCategories from './components/User/Admin/ManageCategories';
import ProductPage from './components/Product';
import UpdateProfile from './components/User/Admin/updateProfile';
import ManageSite from './components/User/Admin/ManageSite';
import PageNotFound from './components/UI/page_not_found';
import ResetUser from './components/Reset_User';
import ResetPassword from './components/Reset_User/ResetPassword';

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)} />
          <Route path="/admin/site_info" exact component={Auth(ManageSite, true)} />
          <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />
          <Route path="/user/cart" exact component={Auth(UserCart, true)} />
          <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
          <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
          <Route path="/user/dashboard" exact component={Auth(userDashboard, true)} />
          <Route path="/register" exact component={Auth(Register, false)} />
          <Route path="/reset_user" exact component={Auth(ResetUser, false)} />
          <Route path="/reset_password/:token" exact component={Auth(ResetPassword, false)} />
          <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
          <Route path="/shop" exact component={Auth(Shop, null)} />
          <Route path="/" exact component={Auth(Home, null)} />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;


