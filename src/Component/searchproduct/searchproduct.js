import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import './searchproduct.css';
const _ = require('lodash');

class SearchProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            productlist: [],
            images: []
        }
        this.handleLoginKeyUp = this.keyUpHandler.bind(this);
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
                Swal.fire("Added Successfully!", "", "success");
            } else {
                console.log("new added", localStorage.getItem('productId'))
                Swal.fire("Already Added In cart!", "", "warning");
            }
            localStorage.setItem('productId', filter);
            localStorage.setItem('cartCount', filter.length.toString());
        } else {
            localStorage.setItem('productId', filter);
            localStorage.setItem('cartCount', filter.length.toString());
            Swal.fire("Added Successfully!", "", "success");
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
                    Swal.fire("Successfully Added!", "", "success");
                }).catch((err) => {
                    Swal.fire("Already Added In Wishlist!", "", "warning");
                });
        } else {
            Swal.fire("Please Login First");
        }
    }

    /** 
    * @param {JSON} e
    * keyUpHandler event
    */
    keyUpHandler(e) {
        console.log("e", e.target.value);
        this.setState({ value: e.target.value })
        console.log("event====", this.state.value);
        /** Search product */
        API.searchList(this.state.value).
            then((findresponse) => {
                console.log("searchList response===", findresponse);
                this.setState({ searchList: findresponse.data.data.productList })
                console.log("data==", this.state.searchList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );

    }

    render() {
        let displayData;

        {/** Display search data */ }
        if (this.state.searchList) displayData = this.state.searchList.map(data =>
            <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                <div className="product_content">
                    <div>
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
                        <ul className="flex">
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        </ul>
                        <p><i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                    </div>
                </div>
                <hr />
            </div>
        )
        return (
            <div>
                <div className="text_center">
                    <span><strong>Search:</strong>
                        <input type="text" onKeyUp={this.handleLoginKeyUp} />
                    </span>
                </div>
                <div>
                    {displayData}
                </div>
            </div>
        );
    }
}

export default SearchProduct;
