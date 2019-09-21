import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle } from "mdbreact";
import './singleproduct.css';
import renderHTML from 'react-render-html';
import { Link } from "react-router-dom";
import Header from '../../Component/home/header/header';
import { EventEmitter } from '../../event';
import Footer from '../../Component/home/footer/footer';
import Swal from 'sweetalert2';
const _ = require('lodash');
let priceArr = [];


class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItem: '',
            demo: '',
            productDetailList: [],
            relatedProductList: [],
            images: [],
            isFetching: true,
            productId: ''
        }
        this.relatedProduct = this.relatedProduct.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    /** Intially call */
    componentDidMount() {
        const query = this.props.location.pathname.split('/')[2];
        /** Product details */
        API.productDetail(query)
            .then((findresponse) => {
                this.state.isFetching = false;
                this.setState({ productDetailList: findresponse.data.data });
                console.log("productDetailList", this.state.productDetailList);
                this.state.productDetailList[0]['qty'] = 1;
                this.setState({
                    cartItem: [...this.state.cartItem, ...this.state.productDetailList]
                })
                this.state.cartItem.map(data =>
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
    addInCart(productId, qty) {
        var str1 = productId;
        var str2 = qty;
        const obj = str1.concat('/', str2)
        this.value = localStorage.getItem('productId');
        console.log("value===", this.value);
        const data = []
        data.push(this.value);
        data.push(productId);
        console.log("data", data);
        this.qtyobject = localStorage.getItem('qtyObject');
        const dta = []
        dta.push(this.qtyobject);
        dta.push(obj);
        console.log("dta====", dta);
        const strVal1 = dta.toString();
        console.log('strVal=====', strVal1);
        const arrVal1 = strVal1.split(',');
        console.log('arrVal1=====', _.uniq(arrVal1));
        const filter1 = _.filter(_.uniq(arrVal1), _.size);
        console.log('filter=====', filter1);
        localStorage.setItem('qtyObject', filter1);
        const strVal = data.toString();
        console.log('strVal=====', strVal);
        const arrVal = strVal.split(',');
        console.log('arrVal=====', _.uniq(arrVal));
        const filter = _.filter(_.uniq(arrVal), _.size);
        console.log('filter=====', filter);
        if (this.value) {
            if (this.value.indexOf(productId) === -1) {
                console.log("new updated", localStorage.getItem('productId'))
                Swal.fire("Item Added Successfully In Cart!", "", "success");
            } else {
                console.log("new added", localStorage.getItem('productId'))
                Swal.fire("Already Added In cart!", "", "warning");
            }
            localStorage.setItem('productId', filter);
            localStorage.setItem('cartCount', filter.length.toString());
            EventEmitter.dispatch('cart', filter.length.toString());
        } else {
            localStorage.setItem('productId', filter);
            localStorage.setItem('cartCount', filter.length.toString());
            EventEmitter.dispatch('cart', filter.length.toString());
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
            API.addwishlist(obj)
                .then((findresponse) => {
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
        API.relatedProduct(productId)
            .then((findresponse) => {
                console.log("relatedProduct response===", findresponse);
                this.setState({ relatedProductList: findresponse.data.data });
                console.log("related product==", this.state.relatedProductList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    /** 
   * @param {string} id
   * Quantity Decrement
   */
    decrement(id) {
        console.log('index in decrement-=-=', id);
        console.log(this.state.cartItem[id].qty);
        if (this.state.cartItem[id].qty > 1) {
            this.state.cartItem[id].qty = this.state.cartItem[id].qty - 1;
            console.log("price=>", priceArr);
            const index = priceArr.indexOf(this.state.cartItem[id].price)
            if (index !== -1) {
                priceArr.splice(index, 1);
            }
        }
        this.setState({
            demo: ''
        })
    }

    handleFormChange() {
        console.log("This is the form change function inside -Form-");
    }


    /** 
    * @param {string} index
    * Quantity Decrement
    */
    increment(index) {
        console.log('index in increment-=-=', index);
        // console.log("details===",this.state.productDetailList);
        this.state.cartItem[index].qty = this.state.cartItem[index].qty + 1;
        priceArr.push(this.state.cartItem[index].price);
        // this.state.productDetails[index].quantity = this.state.productDetails[index].quantity + 1;
        console.log("details==========", this.state.cartItem);
        this.setState({
            demo: ''
        })
        console.log(this.state.cartItem[index]);
        console.log("after increment=============", this.state.cartItem[index].qty);
    }


    render() {
        let displayData;
        let displayDisc;
        let displayRelatedData;

        /** Display Single Product details */
        if (this.state.cartItem) displayData = this.state.cartItem.map((data, index) =>
            <div className="single_product" data-aos="flip-left" data-aos-duration="1500" key={index}>
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
                        <p><i className="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                        <div className="row">
                            <div className="col-md-4">

                            </div>
                            <div className="col-md-1 button_increment">
                                <button onClick={() => this.increment(index)}>+</button>
                            </div>
                            <div className="col-md-1 box">
                                <input className="input" value={data.qty} onChange={this.handleFormChange} />
                            </div>
                            <div className="col-md-1 button_decrement">
                                <button onClick={() => this.decrement(index)}>-</button>
                            </div>
                            <div className="col-md-4">

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-blue" onClick={() => this.addInCart(data.productId, data.qty)}>
                                <span>Add Cart</span>
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-blue float-right" onClick={() => this.addWishList(data.productId)}>
                                <span>Add WishList</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

        /** Discription Of Single product */
        if (this.state.productDetailList) displayDisc = this.state.productDetailList.map((data, index) =>
            <MDBCol md="6" key={index}>
                <h3> <b>Discription:</b></h3>

                <div> {renderHTML(data.description)}</div>
            </MDBCol>
        )

        /** Display Releated Product */
        if (this.state.relatedProductList) displayRelatedData = this.state.relatedProductList.map((data, index) =>
            <MDBCol key={index}>
                <MDBCard style={{ width: "22rem" }}>
                    {(data.productImage) ?
                        (<div>
                            {data.productImage.containerName ? (<MDBCardImage  src={config.baseMediaUrl + data.productImage.containerName + data.productImage.image} className="img-fluid" alt="product image" />) : (<MDBCardImage  src={config.baseMediaUrl + data.productImage.image} className="img-fluid" alt="product image" />)}
                        </div>) : ('')}

                    <MDBCardBody>
                        <MDBCardTitle>{data.metaTagTitle}</MDBCardTitle>

                        <p className="text_color"><Link to={`/singleproduct/${data.productId}`}>{data.name}</Link></p>
                        <ul className="ratings">
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        </ul>
                        <p><b>Price:</b> <i className="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>

                    </MDBCardBody>
                </MDBCard>
            </MDBCol>

        )

        return (
            <div>
                <Header />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="4">
                            <Carousel>
                                {
                                    this.state.images.map((data, index) =>
                                        <div className="inner-slider" key={index}>
                                            <img src={data} alt="data" />
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
                            {displayDisc}
                        </div>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        {
                            this.state.relatedProductList.length > 0 ? (<section className="product_section">
                                <div className="container">
                                    <div className="section_title">
                                        <h3>Related Products</h3>
                                    </div>
                                    <div className="product_slider">
                                        {displayRelatedData}
                                    </div>
                                </div>
                            </section>) : (null)
                        }
                    </MDBRow>
                </MDBContainer>
                <Footer />
            </div>
        );
    }
}

export default SingleProduct;
