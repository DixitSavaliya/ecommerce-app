import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Grid from '@material-ui/core/Grid';
import renderHTML from 'react-render-html';
import Header from '../../Component/home/header/header';
import Footer from '../../Component/home/footer/footer';
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
                    Swal.fire(" Item Added Successfully In Wishlist!", "", "success");
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

        if (this.state.searchList) displayData = this.state.searchList.map(data =>
            <MDBCard>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        {(data.Images) ?
                            (<div>
                                {data.Images.containerName ? (
                                    <MDBCardImage className="img-fluid" src={config.baseMediaUrl + data.Images.containerName + data.Images.image} className="img-fluid" alt="product image" />)
                                    : (
                                        <MDBCardImage className="img-fluid" src={config.baseMediaUrl + data.Images.image} waves />
                                    )}
                            </div>) : ('')}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <MDBCardBody>
                            <MDBCardText>
                                {/* <div className="text_center_icon">
                                <i className="fa fa-shopping-cart" aria-hidden="true" onClick={() => this.addInCart(data.productId)}></i>
                                <i className="fa fa-heart" aria-hidden="true" onClick={() => this.addWishList(data.productId)}></i>
                            </div> */}
                            </MDBCardText>
                            <MDBCardTitle>{data.metaTagTitle}</MDBCardTitle>
                            <MDBCardText>
                                <p className="text_color"><Link to={`/singleproduct/${data.productId}`}>{data.name}</Link></p>
                                {/* <p><b>Price:</b> <i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p> */}
                                <p><b>Description:</b></p>
                                <p>{renderHTML(data.description)}</p>
                            </MDBCardText>
                        </MDBCardBody>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <MDBCardText>
                            {/* <p><b>Name:</b> {data.name}</p> */}
                            <div>
                                <p className="text_top"><b>Price:</b> <i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                                <p className="text-left">No Cost EMI</p>
                            </div>
                            {/* <p><b>Description:</b></p>
                            <p>{renderHTML(data.description)}</p> */}
                        </MDBCardText>
                    </Grid>
                </Grid>
            </MDBCard>
        )
        {/** Display search data */ }
        // if (this.state.searchList) displayData = this.state.searchList.map(data =>
        //     <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
        //         <div className="product_content">
        //             <div>
        //                 {(data.Images) ?
        //                     (<div>
        //                         {data.Images.containerName ? (<img src={config.baseMediaUrl + data.Images.containerName + data.Images.image} className="img-fluid" alt="product image" />) : (<img src={config.baseMediaUrl + data.Images.image} className="img-fluid" alt="product image" />)}
        //                     </div>) : ('')}

        //                 <div className="on_hover_btns">
        //                     <div className="d-flex flex-wrap align-content-center">
        //                         <div className="text-center p-2 m-auto">
        //                             <Link to={`/singleproduct/${data._id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link>
        //                             <Link><i className="fa fa-shopping-cart" aria-hidden="true" onClick={() => this.addInCart(data.productId)}></i></Link>
        //                             <Link><i className="fa fa-heart" aria-hidden="true" onClick={() => this.addWishList(data.productId)}></i></Link>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="product_text">
        //                 <span className="product_type">{data.metaTagTitle}</span>
        //                 <p>{data.name}</p>
        //                 <ul className="flex">
        //                     <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
        //                     <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
        //                     <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
        //                     <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
        //                     <li><i className="fa fa-star" aria-hidden="true"></i></li>
        //                 </ul>
        //                 <p><i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
        //             </div>
        //         </div>
        //         <hr />
        //     </div>
        // )
        return (
            <div>
                <Header />
                <MDBContainer>
                    <MDBRow>
                        <h1 className="h4 text-center mb-4">SearchProduct</h1>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="1">
                            <label className="grey-text">
                                <b>Search :</b>
                            </label>
                        </MDBCol>
                        <MDBCol md="11">
                            <input
                                type="text"
                                onKeyUp={this.handleLoginKeyUp}
                                className="form-control"
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div>
                    {displayData}
                </div>
                <Footer />
            </div>
        );
    }
}

export default SearchProduct;
