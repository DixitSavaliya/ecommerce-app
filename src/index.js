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
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router history={history}>
		<Route exact path='/' component={App} />
		<Route exact path="/wishlist" component={WishList} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/singleproduct/:id" component={SingleProduct} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/subcategories/:id" component={SubCategories}/>
	</Router>,
	document.getElementById('root')
);

serviceWorker.unregister();
