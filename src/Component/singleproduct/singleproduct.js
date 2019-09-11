import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './singleproduct.css';
import renderHTML from 'react-render-html';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Swal from 'sweetalert2';

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

    componentDidMount() {
        const query = this.props.location.pathname.split('/')[2];
        API.productDetail(query).
            then((findresponse) => {
                this.state.isFetching = false;
                console.log("productDetail response===", findresponse);
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
        console.log("productId==", productId);
        this.value = localStorage.getItem('productId');
        const data = []
        data.push(this.value);
        data.push(productId);
        localStorage.setItem('productId', data.toString());
        Swal.fire("Successfully Added!", "", "success");
        console.log("data==", data);
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
            API.addwishlist(obj).
                then((findresponse) => {
                    console.log("addWishList response===", findresponse);
                    Swal.fire("Successfully Added!", "", "success");
                }).catch(
                    { status: 500, message: 'Internal Server Error' }
                );
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

        if (this.state.productDetailList) displayDisc = this.state.productDetailList.map(data =>
            <MDBCol md="6">
                <p> {renderHTML(data.description)}</p>
            </MDBCol>
        )

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
                        <h1>Discription</h1>
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
            </div>
        );
    }
}

export default SingleProduct;
