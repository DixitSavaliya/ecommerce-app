import React from 'react';
import API from '../../../service/homeservice';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Footer extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {
            categoryList: []
        }
    }

    /** Get CategoryList */
    componentDidMount() {
        /** Get category list */
        API.CategoryList().
            then((findresponse) => {
                this.setState({ categoryList: findresponse.data.data })
                console.log("data==", this.state.categoryList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        /** Display Categorylist data */
        if (this.state.categoryList) displayData = this.state.categoryList.map(data =>
            <li>
                {
                    data.children ? (<a className="dropdown-toggle" href={{ javascript: void (0) }} data-toggle="dropdown">{data.name}<i className="fa fa-caret-right" aria-hidden="true"></i></a>) : (<Link to={`/subcategories/${data.categoryId}`}><a>{data.name}></a></Link>)
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
        return (
            <div>
                {/** Footer */}
                <footer>
                    <div className="news_letter_section" data-aos="fade-up" data-aos-duration="1500">
                        <div className="container">
                            <form>
                                <h3 className="float-left">Subscribe to Newsletter</h3>
                                <div className="news_letter_form float-left">
                                    <input className="float-left" type="text" placeholder="enter your e-mail address" />
                                    <button className="btn float-left">
                                        <span>subscribe</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="footer_links" data-aos="fade-in" data-aos-duration="1500">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="footer_menu">
                                        <h4>categories</h4>
                                        <ul>
                                            {displayData}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="footer_menu">
                                        <h4>customer service</h4>
                                        <ul>
                                            <li><a href="#">terms of use</a></li>
                                            <li><a href="#">privacy policy</a></li>
                                            <li><a href="#">f.a.q</a></li>
                                            <li><Link to="/contact">contact us</Link></li>
                                            <li><Link to="/register">create account</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="footer_menu">
                                        <h4>my account</h4>
                                        <ul>
                                            <li><Link to='/profile'>my account</Link></li>
                                            <li><Link to='/cart'>view cart</Link></li>
                                            <li><Link to='/wishlist'>my wishlist</Link></li>
                                            <li><Link to='/orderhistory'>order status</Link></li>
                                            <li><Link>track my order</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="footer_menu">
                                        <h4>information</h4>
                                        <ul>
                                            <li><a href="#">about us</a></li>
                                            <li><a href="#">our portfolio</a></li>
                                            <li><a href="#">how to buy</a></li>
                                            <li><a href="#">arrival sales</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col contact_col">
                                    <div className="footer_menu">
                                        <h4>contact us</h4>
                                        <ul>
                                            <li><span>call us:</span> <a href="tel:18002332742">1 (800) 233-2742</a></li>
                                            <li><span>hours:</span> Mon-fri 9am-8pm</li>
                                            <li><span>e-mail:</span> <a className="email" href="mailto:example@gmail.com">example@gmail.com</a></li>
                                            <li><span>address:</span> Lorem ipsum</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer_bottom">
                        <div className="container">
                            <div className="copyright_text float-left">
                                <ul>
                                    <li><p>Copyright 2019. All Rights Reserved</p></li>
                                    <li><a href="#">Terms & Condition</a></li>
                                    <li><a href="#">Primacy Policy</a></li>
                                </ul>
                            </div>
                            <div className="social_links float-right">
                                <ul>
                                    <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a href=""><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                    <li><a href=""><i className="fa fa-youtube" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
