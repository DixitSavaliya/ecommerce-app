import React from 'react';
import API from '../../../service/homeservice';
import { config } from '../../../config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
            wishList: []
        }
    }

    componentDidMount() {
        API.ProductList().
            then((findresponse) => {
                console.log("ProductList response===", findresponse);
                this.setState({ productlist: findresponse.data.data });
                console.log("all products=====", this.state.productlist);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );

        API.getWishList().
            then((findresponse) => {
                console.log("getWishList response===", findresponse);
                this.setState({ wishList: findresponse.data.data })
                console.log("data==", this.state.wishList);
                console.log("data==", this.state.wishList.length);
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
        localStorage.setItem('productId', filter.toString());
        localStorage.setItem('cartCount', filter.length.toString());
        Swal.fire("Added Successfully!", "", "success");
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
            API.addwishlist(obj).
                then((findresponse, err) => {
                    console.log("addWishList response===", findresponse);
                    Swal.fire("Added Successfully!", "", "success");
                    this.componentDidMount();
                }).catch((err) => {
                    Swal.fire("Already Added In Wishlist!", "", "warning");
                });
        } else {
            Swal.fire("Please Login First");
        }
    }

    render() {
        let displayData;

        if (this.state.productlist) displayData = this.state.productlist.map(data =>
            <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                <div className="product_content">
                    <div className="product_image">
                        {(data.Images) ?
                            (<div>
                                {data.Images.containerName ? (<img src={config.baseMediaUrl + data.Images.containerName + data.Images.image} className="img-fluid" alt="product image" />) : (<img src={config.baseMediaUrl + data.Images.image} className="img-fluid" alt="product image" />)}
                            </div>) : ('')}
                        <div className="on_hover_btns">
                            <div className="d-flex flex-wrap align-content-center">
                                <div className="text-center p-2 m-auto">
                                    <Link to={`/singleproduct/${data._id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link>
                                    <Link><i className="fa fa-shopping-cart" aria-hidden="true" onClick={() => this.addInCart(data.productId)}></i></Link>
                                    <Link><i className="fa fa-heart" aria-hidden="true" onClick={() => this.addWishList(data.productId)}></i></Link>
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
                        <p><i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
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
