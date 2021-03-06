import React from 'react';
import API from '../../../service/homeservice';
import { config } from '../../../config';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { EventEmitter } from '../../../event';
const _ = require('lodash');

class AllProduct extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {
            productlist: [],
            images: [],
            wishList: [],
            cartmatch: false
        }
    }

    /** Intially call */
    componentDidMount() {
        /** Get All Featured-Porduct */
        API.ProductList()
            .then((findresponse) => {
                this.setState({ productlist: findresponse.data.data });
                console.log("all products=====", this.state.productlist);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );

        /** Get Wishlist */
        API.getWishList()
            .then((findresponse) => {
                this.setState({ wishList: findresponse.data.data })
                console.log("data==", this.state.wishList);
                console.log("data==", this.state.wishList.length);
                localStorage.setItem('wishlistLength', this.state.wishList.length);
                EventEmitter.dispatch('length', this.state.wishList.length);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );

    }

    /** Get Wishlist */
    getwishList() {
        /** Get Wishlist */
        API.getWishList()
            .then((findresponse) => {
                this.setState({ wishList: findresponse.data.data })
                console.log("data==", this.state.wishList);
                console.log("data==", this.state.wishList.length);
                localStorage.setItem('wishlistLength', this.state.wishList.length);
                EventEmitter.dispatch('length', this.state.wishList.length);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
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
            if (this.value.indexOf(productId) === -1) {
                console.log("new updated", localStorage.getItem('productId'))
                Swal.fire(" Item Added Successfully In Cart!", "", "success");
            } else {
                console.log("new added", localStorage.getItem('productId'))
                Swal.fire("Already Added In cart!", "", "warning");
            }
            localStorage.setItem('productId', filter);
            localStorage.setItem('cartCount', filter.length.toString());
        } else {
            localStorage.setItem('productId', filter);
            localStorage.setItem('cartCount', filter.length.toString());
            Swal.fire(" Item Added Successfully In Cart!", "", "success");
        }
    }

    /** 
   * @param {string} productId
   * Add Wishlist function
   */
    addWishList(productId) {
        console.log("id=====", productId);
        const obj = {
            productId: productId
        }
        if (localStorage.getItem('token')) {
            API.addwishlist(obj)
                .then((findresponse, err) => {
                    console.log("addWishList response===", findresponse);
                    Swal.fire("Item Added Successfully In Wishlist!", "", "success");
                    this.getwishList();
                }).catch((err) => {
                    Swal.fire("Already Added In Wishlist!", "", "warning");
                });
        } else {
            Swal.fire("Please Login First");
        }
    }

    render() {
        let displayData;

        /** Display Productlist data */
        if (this.state.productlist) displayData = this.state.productlist.map((data,index) =>
            <div className="single_product" data-aos="flip-left" data-aos-duration="1500" key={index}>
                <div className="product_content">
                    <div className="product_image">
                        {(data.Images) ?
                            (<div>
                                {data.Images.containerName ? (<img src={config.baseMediaUrl + data.Images.containerName + data.Images.image} className="img-fluid" alt="produc" />) : (<img src={config.baseMediaUrl + data.Images.image} className="img-fluid" alt="produc" />)}
                            </div>) : ('')}
                        <div className="on_hover_btns">
                            <div className="d-flex flex-wrap align-content-center">
                                <div className="text-center p-2 m-auto">
                                    <Link to={`/singleproduct/${data._id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link>
                                    <Link to={{ javascript: void (0) }}><i className="fa fa-shopping-cart" aria-hidden="true" onClick={() => this.addInCart(data.productId)}></i></Link>
                                    <Link to={{ javascript: void (0) }}><i className="fa fa-heart" aria-hidden="true" onClick={() => this.addWishList(data.productId)}></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product_text">
                        <span className="product_type">{data.metaTagTitle}</span>
                        <p>{data.name}</p>
                        <ul>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        </ul>
                        <p><i className="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
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
            </div>
        );
    }
}

export default AllProduct;
