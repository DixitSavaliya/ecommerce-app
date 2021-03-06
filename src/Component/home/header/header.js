import React from 'react';
import { Link } from "react-router-dom";
import history from '../../../history';
import API from '../../../service/homeservice';
// import '../../../../public/css/style.css';
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
            count: '',
            number: '',
            isLoaded: false
        }
        this.name = localStorage.getItem('name');
        this.logout = this.logout.bind(this);
        this.handleLoginKeyUp = this.keyUpHandler.bind(this);
        this.queryParms = this.queryParms.bind(this);
        EventEmitter.subscribe('length', (event) => {
            console.log("wishlist=", event);
            this.count = event;
            console.log("count=>", this.count);
            this.setState({ count: this.count })
        });

        EventEmitter.subscribe('cart', (event) => {
            console.log("cart=", event);
            this.setState({ number: event })
        });
    }

    /** User Logout */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('productId');
        localStorage.removeItem('cartCount');
        localStorage.removeItem('wishlistLength');
        localStorage.removeItem('qtyObject');
        history.push('/home');
    }

    /** Intailly call */
    componentDidMount() {
        /** Get Categorylist */
        API.CategoryList()
            .then((findresponse) => {
                this.setState({ categoryList: findresponse.data.data, isLoaded: true })
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
        API.searchList(this.state.value)
            .then((findresponse) => {
                window.location.href = '/searchproduct/' + this.state.value;
                console.log("searchList response===", findresponse);
                this.setState({ searchList: findresponse.data.data.productList })
                console.log("data==", this.state.searchList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    queryParms(id) {
        console.log("id==", id);
        EventEmitter.dispatch('id', id);
    }


    render() {
        const { isLoaded } = this.state;
        if (!isLoaded) {
            return (
                <center>
                    <div className="loader"></div>
                </center>
            )
        } else if (isLoaded) {
            return (
                <div>
                    <header>
                        {/** Top Header */}
                        <div className="header_top">
                            <div className="container">
                                <div className="top_select float-left">
                                    <div className="custom_select language">
                                        <Link to="#">ENG</Link>
                                        <div className="languages" style={{
                                            display: "none"
                                        }}>
                                            <ul>
                                                <li><a href={{ javascript: void (0) }}>ENG</a></li>
                                                <li><a href={{ javascript: void (0) }}>FRE</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="custom_select currency">
                                        <Link to="#">$ USD</Link>

                                        <div className="currencies" style={{
                                            display: "none"
                                        }}>
                                            <ul>
                                                <li><a href={{ javascript: void (0) }}>$ USD</a></li>
                                                <li><a href={{ javascript: void (0) }}>€ EUR</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contact_number float-left">
                                    <a href="tel:9876543210">
                                        <img src={require("../iconSVG/phone-call1.png")} className="telephone" alt="product" />
                                        98 765 432 10</a>
                                </div>
                                {/* <div className="contact_number float-left">
                                    {
                                        localStorage.getItem('token') ? (<h6 className="user_name">Welcome  <i className="far fa-user"></i> {this.name}</h6>) : ('')
                                    }
                                </div> */}
                                <div className="header_top_links float-right">
                                    <ul>
                                        <li>

                                            {
                                                localStorage.getItem('token') ? (
                                                    <div className="name">
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
                                                            <a className="dropdown-item" onClick={this.logout}>Logout</a>
                                                        </div>
                                                        <a className="dropdown-toggle" href={{ javascript: void (0) }} data-toggle="dropdown">
                                                            Welcome  <i className="far fa-user"></i> {this.name}
                                                        </a>
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
                                    <a href="/home">cmerce</a>
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
                                                        this.state.categoryList.map((data, index) =>
                                                            <li className="nav-item" key={index}>
                                                                {
                                                                    data.children ? (<a className="dropdown-toggle" href={{ javascript: void (0) }} data-toggle="dropdown">{data.name}
                                                                        <i className="fa fa-angle-down" aria-hidden="true"></i>

                                                                    </a>) : (<Link to={`/subcategories/${data.categoryId}`}>{data.name}</Link>)
                                                                }
                                                                <div>
                                                                    {
                                                                        data.children ? (
                                                                            data.children.map((list, index) =>
                                                                                <div className="dropdown-menu" key={index}>
                                                                                    <Link className="dropdown-item" to={`/subcategories/${list.categoryId}`}>{list.name}</Link>
                                                                                    <div key={index}>
                                                                                        {
                                                                                            list.children ? (
                                                                                                list.children.map((sublist, index) =>
                                                                                                    <div key={index} >
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
                                                    <li className="contact_text">
                                                        <Link to="/contact" className="contact">Contact</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="cart">
                                        <ul>

                                            <li>

                                                <Link className="search_toggle_btn" href={{ javascript: void (0) }} to="/searchproduct"> <img src={require("../iconSVG/magnifying-glass.png")} className="image" alt="header" /></Link>

                                            </li>
                                            <li>
                                                <Link to="/wishlist" className="search_toggle_btn" href={{ javascript: void (0) }}>
                                                    <img src={require("../iconSVG/heart.png")} className="image" alt="header" /> </Link>

                                                {
                                                    localStorage.getItem('wishlistLength') ? (<span className="cart_count">{localStorage.getItem('wishlistLength')}</span>) : ('')
                                                }

                                            </li>
                                            <li className="desktop_only">
                                                <Link to="/cart" className="search_toggle_btn" href={{ javascript: void (0) }}>
                                                    <img src={require("../iconSVG/shopping-cart.png")} className="image" alt="header" />

                                                    {
                                                        localStorage.getItem('cartCount') ? (<span className="cart_count">{localStorage.getItem('cartCount')}</span>) : ('')
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
}

export default Header;
