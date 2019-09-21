import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdbreact';
import Grid from '@material-ui/core/Grid';
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
            if (this.value.indexOf(productId) === -1) {
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
            API.addwishlist(obj)
                .then((findresponse) => {
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
        API.searchList(this.state.value)
            .then((findresponse) => {
                console.log("searchList response===", findresponse);
                this.setState({ searchList: findresponse.data.data.productList })
                console.log("data==", this.state.searchList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        let displayProduct;

        if (this.state.searchList) displayData = this.state.searchList.slice(0, Math.floor(this.state.searchList.length / 2)).map((data, index) =>
            <MDBCard className="card_height" key={index}>
                {(data.Images) ?
                    (<div>
                        {data.Images.containerName ? (
                            <MDBCardImage  src={config.baseMediaUrl + data.Images.containerName + data.Images.image} className="img-fluid" alt="product" />)
                            : (
                                <MDBCardImage className="img-fluid" src={config.baseMediaUrl + data.Images.image} alt="product"  waves />
                            )}
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
                    <p className="txt"><b>Price:</b> <i className="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>

                    {/* <p><b>Price:</b> <i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p> */}
                    {/* <p><b>Description:</b></p>
                        <p>{renderHTML(data.description)}</p> */}

                </MDBCardBody>

            </MDBCard>
        )

        if (this.state.searchList) displayProduct = this.state.searchList.slice(Math.floor(this.state.searchList.length / 2)).map((data, index) =>
            <MDBCard className="card_height" key={index}>
                {(data.Images) ?
                    (<div>
                        {data.Images.containerName ? (
                            <MDBCardImage  src={config.baseMediaUrl + data.Images.containerName + data.Images.image} className="img-fluid" alt="product" />)
                            : (
                                <MDBCardImage className="img-fluid" alt="product" src={config.baseMediaUrl + data.Images.image} waves />
                            )}
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
                    <p className="txt"><b>Price:</b> <i className="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>


                </MDBCardBody>

            </MDBCard>
        )

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
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6}>
                            {displayData}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {displayProduct}
                        </Grid>
                    </Grid>
                </div>
                <Footer />
            </div>
        );
    }
}

export default SearchProduct;
