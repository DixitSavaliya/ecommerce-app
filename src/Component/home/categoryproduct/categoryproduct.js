import React from 'react';
import API from '../../../service/homeservice';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CategoryProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
    }

    /** Intailly Call */
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

    render() {
        let displayData;

        /** Display Categorylist data */
        if (this.state.categoryList) displayData = this.state.categoryList.map(data =>
            <li>
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

        return (
            <div>
                <section className="category_with_product_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4" data-aos="zoom-in" data-aos-duration="1500">
                                <div className="category_sidebar">
                                    <h4>Categories</h4>
                                    <ul>
                                        {displayData}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8">
                                <div className="section_title">
                                    <h3>best seller</h3>
                                </div>
                                <div className="product_slider_two">
                                    <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                                        <div className="product_content">
                                            <div className="product_image">
                                                <img src={require('../images/product_1.jpg')} className="img-fluid" alt="product image" />
                                                <div className="on_hover_btns">
                                                    <div className="d-flex flex-wrap align-content-center">
                                                        <div className="text-center p-2 m-auto">
                                                            <a href="#" title="View more details"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_text">
                                                <span className="product_type">Women Clothing</span>
                                                <p>Lorem ipsum dolor sit amet</p>
                                                <ul>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>$ <span className="procuct_price">34.00</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                                        <div className="product_content">
                                            <div className="product_image">
                                                <img src={require('../images/product_2.jpg')} className="img-fluid" alt="product image" />
                                                <div className="on_hover_btns">
                                                    <div className="d-flex flex-wrap align-content-center">
                                                        <div className="text-center p-2 m-auto">
                                                            <a href="#" title="View more details"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_text">
                                                <span className="product_type">Women Shoes</span>
                                                <p>Lorem ipsum dolor sit amet</p>
                                                <ul>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>$ <span className="procuct_price">314.00</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                                        <div className="product_content">
                                            <div className="product_image">
                                                <img src={require('../images/product_3.jpg')} className="img-fluid" alt="product image" />
                                                <div className="on_hover_btns">
                                                    <div className="d-flex flex-wrap align-content-center">
                                                        <div className="text-center p-2 m-auto">
                                                            <a href="#" title="View more details"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_text">
                                                <span className="product_type">Women Clothing</span>
                                                <p>Lorem ipsum dolor sit amet</p>
                                                <ul>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>$ <span className="procuct_price">379.00</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                                        <div className="product_content">
                                            <div className="product_image">
                                                <img src={require('../images/product_4.jpg')} className="img-fluid" alt="product image" />
                                                <div className="on_hover_btns">
                                                    <div className="d-flex flex-wrap align-content-center">
                                                        <div className="text-center p-2 m-auto">
                                                            <a href="#" title="View more details"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_text">
                                                <span className="product_type">Women Shoes</span>
                                                <p>Lorem ipsum dolor sit amet</p>
                                                <ul>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>$ <span className="procuct_price">107.00</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                                        <div className="product_content">
                                            <div className="product_image">
                                                <img src={require('../images/product_1.jpg')} className="img-fluid" alt="product image" />
                                                <div className="on_hover_btns">
                                                    <div className="d-flex flex-wrap align-content-center">
                                                        <div className="text-center p-2 m-auto">
                                                            <a href="#" title="View more details"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_text">
                                                <span className="product_type">Women Clothing</span>
                                                <p>Lorem ipsum dolor sit amet</p>
                                                <ul>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>$ <span className="procuct_price">34.00</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                                        <div className="product_content">
                                            <div className="product_image">
                                                <img src={require('../images/product_2.jpg')} className="img-fluid" alt="product image" />
                                                <div className="on_hover_btns">
                                                    <div className="d-flex flex-wrap align-content-center">
                                                        <div className="text-center p-2 m-auto">
                                                            <a href="#" title="View more details"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_text">
                                                <span className="product_type">Women Shoes</span>
                                                <p>Lorem ipsum dolor sit amet</p>
                                                <ul>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>$ <span className="procuct_price">314.00</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                                        <div className="product_content">
                                            <div className="product_image">
                                                <img src={require('../images/product_3.jpg')} className="img-fluid" alt="product image" />
                                                <div className="on_hover_btns">
                                                    <div className="d-flex flex-wrap align-content-center">
                                                        <div className="text-center p-2 m-auto">
                                                            <a href="#" title="View more details"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_text">
                                                <span className="product_type">Women Clothing</span>
                                                <p>Lorem ipsum dolor sit amet</p>
                                                <ul>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>$ <span className="procuct_price">379.00</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                                        <div className="product_content">
                                            <div className="product_image">
                                                <img src={require('../images/product_4.jpg')} className="img-fluid" alt="product image" />
                                                <div className="on_hover_btns">
                                                    <div className="d-flex flex-wrap align-content-center">
                                                        <div className="text-center p-2 m-auto">
                                                            <a href="#" title="View more details"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                                                            <a href="#" title="Add to wishlist"><i className="fa fa-heart" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_text">
                                                <span className="product_type">Women Shoes</span>
                                                <p>Lorem ipsum dolor sit amet</p>
                                                <ul>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>$ <span className="procuct_price">107.00</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default CategoryProduct;
