import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Home from './Component/home/home';
import history from './history';
import WishList from './Component/wishlist/wishlist';
import SingleProduct from './Component/singleproduct/singleproduct';
import Cart from './Component/cart/cart';
import Login from './Component/login/login';
import Register from './Component/register/register';
import Profile from './Component/profile/profile';
import SubCategories from './Component/subcategories/subcategories';
import SearchProduct from './Component/searchproduct/searchproduct';
import Checkout from './Component/checkout/checkout';
import ForgotPassword from './Component/forgotpassword/forgotpassword';
import UpdatePassword from './Component/updatepassword/updatepassword';
import Address from './Component/address/address';
import AddNewAddress from './Component/addnewaddress/addnewaddress';
import EditAddress from './Component/editaddress/editaddress';
import OrderHistory from './Component/orderhistory/orderhistory';
import OrderDetail from './Component/orderdetail/orderdetail';
import Contact from './Component/contact/contact';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={history}>
    <Route exact path='/' component={App} />
    <Route exact path="/wishlist" render={() => (
      localStorage.getItem('token') ? (<Route component={WishList} />)
        : (<Route component={Login} />)
    )} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/singleproduct/:id" component={SingleProduct} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/subcategories/:id" component={SubCategories} />
    <Route exact path="/searchproduct" component={SearchProduct} />
    <Route exact path="/checkout" component={Checkout} />
    <Route exact path="/forgotpassword" component={ForgotPassword} />
    <Route exact path="/updatepassword" component={UpdatePassword} />
    <Route exact path="/address" component={Address} />
    <Route exact path="/addnewaddress" component={AddNewAddress} />
    <Route exact path="/editaddress/:id" component={EditAddress} />
    <Route exact path="/orderhistory" component={OrderHistory} />
    <Route exact path="/orderdetail/:id" component={OrderDetail} />
    <Route exact path="/contact" component={Contact} />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
