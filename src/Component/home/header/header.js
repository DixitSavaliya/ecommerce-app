import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from '../../../history';
import API from '../../../service/homeservice';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: true,
            categoryList: [],
            value: '',
            searchList: []
        }
        this.name = localStorage.getItem('name');
        this.logout = this.logout.bind(this);
        this.handleLoginKeyUp = this.keyUpHandler.bind(this);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('productId');
        history.push('/home');
    }

    componentDidMount() {
        API.CategoryList().
            then((findresponse) => {
                console.log("BannerList response===", findresponse);
                this.setState({ categoryList: findresponse.data.data })
                console.log("data==", this.state.categoryList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    keyUpHandler(e) {
        console.log("e", e.target.value);
        this.setState({ value: e.target.value })
        console.log("event====", this.state.value);
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

    render() {
        const { showing } = this.state;
        return (
            <div>
                <header>
                    <div className="header_top">
                        <div className="container">
                            <div className="top_select float-left">
                                <div className="custom_select language">
                                    <a href={{ javascript: void (0) }}>ENG</a>
                                    <div className="languages" style={{ display: (showing ? 'none' : 'none') }} >
                                        <ul>
                                            <li><a href="#">ENG</a></li>
                                            <li><a href="#">FRE</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="custom_select currency">
                                    <a href={{ javascript: void (0) }}>$ USD</a>
                                    <div className="currencies" style={{ display: (showing ? 'none' : 'none') }}>
                                        <ul>
                                            <li><a href="#">$ USD</a></li>
                                            <li><a href="#">€ EUR</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="contact_number float-left">
                                <a href="tel:9876543210">

                                    98 765 432 10</a>
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
                                                        <i className="far fa-user"></i> <span>{this.name}</span>
                                                        <Link to="/profile" className="dropdown-item">My Profile</Link>
                                                        <Link to="/address" className="dropdown-item">Address</Link>
                                                        <Link to="/orderhistory" className="dropdown-item">My OrderHistory</Link>
                                                        <Link to="/cart" className="dropdown-item">Cart</Link>
                                                        <Link to="/wishlist" className="dropdown-item">WishList</Link>
                                                        <Link className="dropdown-item" onClick={this.logout}>Logout</Link>
                                                    </div>
                                                </div>) : ('')
                                        }

                                    </li>
                                    <li className="font_color">
                                        {
                                            localStorage.getItem('token') ? (this.name) : (<span><Link to="/login">Login/</Link>
                                                <Link to="/register">register</Link></span>)
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="header_bottom">
                        <div className="container">
                            <div className="logo float-left">
                                <a>cmerce</a>
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

                                                            <a className="dropdown-toggle" href={{ javascript: void (0) }} data-toggle="dropdown">{data.name}<i className="fa fa-chevron-down" aria-hidden="true"></i></a>
                                                            <div>
                                                                {
                                                                    data.children ? (
                                                                        data.children.map(list =>
                                                                            <div className="dropdown-menu">
                                                                                <a className="dropdown-item" href="#">{list.name}</a>
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
                                            <a className="search_toggle_btn">
                                            <Link to="/searchproduct"><i class="fas fa-search"></i></Link>
                                            </a>
                                            {/* <div className="search_box">
                                                <input type="text" placeholder="search" onKeyUp={this.handleLoginKeyUp} />
                                            </div> */}
                                        </li>
                                        <li>
                                            <Link to="/wishlist"><i class="far fa-heart"></i></Link>
                                        </li>
                                        <li className="desktop_only">
                                            <Link to="/cart"><i class="fas fa-shopping-cart"></i></Link>
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
