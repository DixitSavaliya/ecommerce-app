import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './singleproduct.css';
import renderHTML from 'react-render-html';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../../Component/home/header/header';
import Footer from '../../Component/home/footer/footer';
import Swal from 'sweetalert2';
const _ = require('lodash');

class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetailList: [],
            relatedProductList: [],
            images: [],
            isFetching: true,
            productId: ''
        }
        this.relatedProduct = this.relatedProduct.bind(this);
    }

    /** Intially call */
    componentDidMount() {
        const query = this.props.location.pathname.split('/')[2];
        /** Product details */
        API.productDetail(query).
            then((findresponse) => {
                this.state.isFetching = false;
                this.setState({ productDetailList: findresponse.data.data });
                console.log("productDetailList", this.state.productDetailList);
                this.state.productDetailList.map(data =>
                    data.productImage ? (
                        data.productImage.map(list =>
                            list.containerName ? (this.setState({
                                images: [...this.state.images, config.baseMediaUrl + list.containerName + list.image]
                            })) : (this.setState({
                                images: [...this.state.images, config.baseMediaUrl + list.image]
                            }))
                        )
                    ) : (null)
                )
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
        this.relatedProduct(query);
    }

    /** 
     * @param {string} productId
     * Add Cart function
     */
    addInCart(productId) {
        this.value = localStorage.getItem('productId');
        console.log("value===", this.value);
        const data = []
        data.push(this.value);
        data.push(productId);
        console.log("data", data);
        const strVal = data.toString();
        console.log('strVal=====', strVal);
        const arrVal = strVal.split(',');
        console.log('arrVal=====', _.uniq(arrVal));
        const filter = _.filter(_.uniq(arrVal), _.size);
        console.log('filter=====', filter);
        if (this.value) {
            if (this.value.indexOf(productId) == -1) {
                console.log("new updated", localStorage.getItem('productId'))
                Swal.fire("Item Added Successfully In Cart!", "", "success");
            } else {
                console.log("new added", localStorage.getItem('productId'))
                Swal.fire("Already Added In cart!", "", "warning");
            }
            localStorage.setItem('productId', filter);
            localStorage.setItem('cartCount', filter.length.toString());
        } else {
            localStorage.setItem('productId', filter);
            localStorage.setItem('cartCount', filter.length.toString());
            Swal.fire("Item Added Successfully In Cart!", "", "success");
        }
    }

    /**
   * @param {string} productId
   * Add Wishlist function
   */
    addWishList(productId) {
        const obj = {
            productId: productId
        }
        if (localStorage.getItem('token')) {
            /** Add wishlist */
            API.addwishlist(obj).
                then((findresponse) => {
                    console.log("addWishList response===", findresponse);
                    Swal.fire("Item Added Successfully In Wishlist!", "", "success");
                }).catch((err) => {
                    Swal.fire("Already Added In Wishlist!", "", "warning");
                });
        } else {
            Swal.fire("Please Login First");
        }
    }

    /** 
   * @param {string} productId
   * relatedProduct functionality
   */
    relatedProduct(productId) {
        console.log("productId======", productId);
        /** Releated Product */
        API.relatedProduct(productId).
            then((findresponse) => {
                console.log("relatedProduct response===", findresponse);
                this.setState({ relatedProductList: findresponse.data.data });
                console.log("related product==", this.state.relatedProductList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        let displayDisc;
        let displayRelatedData;

        /** Display Single Product details */
        if (this.state.productDetailList) displayData = this.state.productDetailList.map(data =>
            <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                <div className="product_content">
                    <div className="product_text">
                        <span className="product_type">{data.metaTagTitle}</span>
                        <p>{data.name}</p>
                        <ul className="ratings">
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        </ul>
                        <p><i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-blue" onClick={() => this.addInCart(data.productId)}>
                                <span>Add Cart</span>
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-blue" onClick={() => this.addWishList(data.productId)}>
                                <span>Add WishList</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

        /** Discription Of Single product */
        if (this.state.productDetailList) displayDisc = this.state.productDetailList.map(data =>
            <MDBCol md="6">
                <p> {renderHTML(data.description)}</p>
            </MDBCol>
        )

        /** Display Releated Product */
        if (this.state.relatedProductList) displayRelatedData = this.state.relatedProductList.map(data =>
            <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                <div className="product_content">
                    <div className="product_image">
                        {(data.productImage) ?
                            (<div>
                                {data.productImage.containerName ? (<img src={config.baseMediaUrl + data.productImage.containerName + data.productImage.image} className="img-fluid" alt="product image" />) : (<img src={config.baseMediaUrl + data.productImage.image} className="img-fluid" alt="product image" />)}
                            </div>) : ('')}
                        <div className="on_hover_btns">
                            <div className="d-flex flex-wrap align-content-center">
                                <div className="text-center p-2 m-auto">
                                    <Link><i className="fa fa-shopping-cart" aria-hidden="true" onClick={() => this.addInCart(data.productId)}></i></Link>
                                    <Link><i className="fa fa-heart" aria-hidden="true" onClick={() => this.addWishList(data.productId)}></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product_text">
                        <span className="product_type">{data.metaTagTitle}</span>
                        <p>{data.name}</p>
                        <ul className="ratings">
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        </ul>
                        <p><i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                        <p> <b>Discription:</b> {renderHTML(data.description)}</p>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
                <Header />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="4">
                            <Carousel>
                                {
                                    this.state.images.map(data =>
                                        <div className="slider_img">
                                            <img src={data} />
                                        </div>
                                    )
                                }
                            </Carousel>
                        </MDBCol>
                        <MDBCol md="8">
                            <section className="product_section">
                                <div className="container">
                                    <div className="section_title">
                                        <h3>New Products</h3>
                                    </div>
                                    <div className="product_slider">
                                        {displayData}
                                    </div>
                                </div>
                            </section>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <div>
                            <h1>Discription</h1>
                        </div>
                        <div>
                            {displayDisc}
                        </div>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <section className="product_section">
                            <div className="container">
                                <div className="section_title">
                                    <h3>Related Products</h3>
                                </div>
                                <div className="product_slider">
                                    {displayRelatedData}
                                </div>
                            </div>
                        </section>
                    </MDBRow>
                </MDBContainer>
                <Footer />
            </div>
        );
    }
}

export default SingleProduct;
