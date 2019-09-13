import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import renderHTML from 'react-render-html';
import Swal from 'sweetalert2';
import './subcategories.css';
const _ = require('lodash');

class SubCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SubCategoryList: []
        }
    }

    componentDidMount() {
        console.log("query=", this.props.location.pathname.split('/')[2]);
        const query = this.props.location.pathname.split('/')[2];
        API.SubCategoryList(query).
            then((findresponse) => {
                console.log("SubCategoryList response===", findresponse);
                if (!findresponse.data.data.productList.length) {
                    Swal.fire("Product not available!", "", "warning");
                } else {
                    this.setState({ SubCategoryList: findresponse.data.data.productList })
                    console.log("SubCategoryList response===", this.state.SubCategoryList);
                }
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
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
    console.log("data",data);
    const strVal = data.toString();
    console.log('strVal=====', strVal);
    const arrVal = strVal.split(',');
    console.log('arrVal=====', _.uniq(arrVal));
    const filter = _.filter(_.uniq(arrVal), _.size);
    console.log('filter=====', filter);
    localStorage.setItem('productId', data.toString());
    localStorage.setItem('cartCount', filter.length.toString());
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

    render() {
        let displayData;

        if (this.state.SubCategoryList) displayData = this.state.SubCategoryList.map(data =>
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
                                    <i className="fa fa-shopping-cart" aria-hidden="true" onClick={() => this.addInCart(data.productId)}></i>
                                    <i className="fa fa-heart" aria-hidden="true" onClick={() => this.addWishList(data.productId)}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product_text">
                        <span className="product_type">{data.metaTagTitle}</span>
                        <p>{data.name}</p>
                        <p><i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                        <p> {renderHTML(data.description)}</p>
                    </div>
                </div>
                <hr />
            </div>
        )
        return (
            <div>
                <section className="product_section">
                    <div className="container">
                        <div>
                            {displayData}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SubCategories;
