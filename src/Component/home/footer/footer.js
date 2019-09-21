import React from 'react';
import API from '../../../service/homeservice';
import { Link } from "react-router-dom";

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
        API.CategoryList()
            .then((findresponse) => {
                this.setState({ categoryList: findresponse.data.data })
                console.log("data==", this.state.categoryList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        /** Display Categorylist data */
        if (this.state.categoryList) displayData = this.state.categoryList.map((data, index) =>
            <li key={index}>
                {
                    data.children ? (<a className="dropdown-toggle" href={{ javascript: void (0) }} data-toggle="dropdown">{data.name}</a>) : (<Link to={`/subcategories/${data.categoryId}`}>{data.name}</Link>)
                }
                <div>
                    {
                        data.children ? (
                            data.children.map((list, index) =>
                                <div className="dropdown-menu" key={index}>
                                    <Link to={`/subcategories/${list.categoryId}`} className="dropdown-item">{list.name}</Link>
                                    <div>
                                        {
                                            list.children ? (
                                                list.children.map((sublist, index) =>
                                                    <div key={index}>
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
                                            <li><Link to="#">terms of use</Link></li>
                                            <li><Link to="#">privacy policy</Link></li>
                                            <li><Link to="#">f.a.q</Link></li>
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
                                            <li>track my order</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="footer_menu">
                                        <h4>information</h4>
                                        <ul>
                                            <li><Link to="#">about us</Link></li>
                                            <li><Link to="#">our portfolio</Link></li>
                                            <li><Link to="#">how to buy</Link></li>
                                            <li><Link to="#">arrival sales</Link></li>
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
                                    <li><Link to="#">Terms & Condition</Link></li>
                                    <li><Link to="#">Primacy Policy</Link></li>
                                </ul>
                            </div>
                            <div className="social_links float-right">
                                <ul>
                                    <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                    <li><Link to="#"><i className="fab fa-google-plus-g"></i></Link></li>
                                    <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
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
