import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from '../../../history';
import API from '../../../service/homeservice';
import './header.css';
import { EventEmitter } from '../../../event';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: true,
            categoryList: [],
            value: '',
            searchList: [],
            count: ''
        }
        this.name = localStorage.getItem('name');
        this.logout = this.logout.bind(this);
        this.handleLoginKeyUp = this.keyUpHandler.bind(this);
        this.onClick = this.onClick.bind(this);
        EventEmitter.subscribe('length', (event) => {
            console.log("wishlist=", event);
            this.count = event;
            console.log("count=>", this.count);
            this.setState({ count: this.count })
        });
    }

    /** User Logout */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('productId');
        localStorage.removeItem('cartCount');
        localStorage.removeItem('wishlistLength');
        history.push('/home');
    }

    /** Intailly call */
    componentDidMount() {
        /** Get Categorylist */
        API.CategoryList().
            then((findresponse) => {
                this.setState({ categoryList: findresponse.data.data })
                console.log("data==", this.state.categoryList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    /** 
  * @param {string} e
  * key up handler
  */
    keyUpHandler(e) {
        console.log("e", e.target.value);
        this.setState({ value: e.target.value })
        console.log("event====", this.state.value);
        /** SearchList */
        API.searchList(this.state.value).
            then((findresponse) => {
                window.location.href = '/searchproduct/' + this.state.value;
                console.log("searchList response===", findresponse);
                this.setState({ searchList: findresponse.data.data.productList })
                console.log("data==", this.state.searchList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    onClick() {
        window.location.href = '/home';
    }

    render() {
        return (
            <div>
                <header>
                    {/** Top Header */}
                    <div className="header_top">
                        <div className="container">
                            <div className="contact_number float-left">
                                {
                                    localStorage.getItem('token') ? (<h6 className="user_name">Welcome  <i className="far fa-user"></i> {this.name}</h6>) : ('')
                                }
                            </div>
                            <div className="header_top_links float-right">
                                <ul>
                                    <li>
                                        {
                                            localStorage.getItem('token') ? (
                                                <div>
                                                    <a className="dropdown-toggle" href={{ javascript: void (0) }} data-toggle="dropdown">
                                                        <i className="far fa-user"></i> my account
                                                     </a>
                                                    <div className="dropdown-menu">
                                                        <Link to="/profile" className="dropdown-item">My Profile</Link>
                                                        <Link to="/address" className="dropdown-item">Address</Link>
                                                        <Link to="/orderhistory" className="dropdown-item">My OrderHistory</Link>
                                                        {
                                                            localStorage.getItem('productId') ? (
                                                                <Link to="/cart" className="dropdown-item">Cart</Link>) : ('')
                                                        }
                                                        <Link to="/wishlist" className="dropdown-item">WishList</Link>
                                                        <Link className="dropdown-item" onClick={this.logout}>Logout</Link>
                                                    </div>
                                                </div>) : ('')
                                        }
                                    </li>
                                    <li className="font_color">
                                        {
                                            localStorage.getItem('token') ? ('') : (<span><Link to="/login">Login/</Link>
                                                <Link to="/register">register</Link></span>)
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/** Bottom Header */}
                    <div className="header_bottom">
                        <div className="container">
                            <div className="logo float-left">
                                <Link><span onClick={this.onClick}>cmerce</span></Link>
                            </div>
                            <div className="menu_with_cart float-right">
                                <div className="header_menu">
                                    <nav className="navbar navbar-expand-lg">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                            <i className="fa fa-bars" aria-hidden="true"></i>
                                        </button>
                                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                            <ul className="navbar-nav">
                                                {
                                                    this.state.categoryList.map(data =>
                                                        <li className="nav-item">

                                                            {
                                                                data.children ? (<a className="dropdown-toggle" href={{ javascript: void (0) }} data-toggle="dropdown">{data.name}<i className="fa fa-caret-right" aria-hidden="true"></i></a>) : (<Link to={`/subcategories/${data.categoryId}`}><a>{data.name}<i className="fa fa-caret-right" aria-hidden="true"></i></a></Link>)
                                                            }

                                                            <div>
                                                                {
                                                                    data.children ? (
                                                                        data.children.map(list =>
                                                                            <div className="dropdown-menu">
                                                                                <Link to={`/subcategories/${list.categoryId}`}><a className="dropdown-item">{list.name}</a></Link>
                                                                                <div>
                                                                                    {
                                                                                        list.children ? (
                                                                                            list.children.map(sublist =>
                                                                                                <div >
                                                                                                    <Link to={`/subcategories/${sublist.categoryId}`}>{sublist.name}</Link>
                                                                                                </div>
                                                                                            )
                                                                                        ) : (null)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="cart">
                                    <ul>
                                        <li>
                                            <Link to="/contact" className="contact">Contact</Link>
                                        </li>
                                        <li>
                                            <a className="search_toggle_btn">
                                                <Link to="/searchproduct"><i class="fas fa-search"></i></Link>
                                            </a>
                                        </li>
                                        <li>
                                            <Link to="/wishlist"><i class="far fa-heart"></i>
                                                {
                                                    this.state.count ? (<span class="cart_count">{this.state.count}</span>) : ('')
                                                }
                                            </Link>
                                        </li>
                                        <li className="desktop_only">
                                            <Link to="/cart"><i class="fas fa-shopping-cart"></i>
                                                {
                                                    localStorage.getItem('cartCount') ? (<span class="cart_count">{localStorage.getItem('cartCount')}</span>) : ('')
                                                }
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div >
        );
    }
}

export default Header;
