import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle,  MDBCol } from 'mdbreact';
import Grid from '@material-ui/core/Grid';
import renderHTML from 'react-render-html';
import Header from '../../Component/home/header/header';
import Footer from '../../Component/home/footer/footer';
import { EventEmitter } from '../../event';
import Swal from 'sweetalert2';
import './subcategories.css';
const _ = require('lodash');

class SubCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SubCategoryList: [],
            isFlag: false,
            id: ''
        }
        this.getId = this.getId.bind(this);
        EventEmitter.subscribe('id', (event) => {
            // console.log("id", event);
            // this.count = event;
            // console.log("count=>", this.count);
            this.setState({ id: event })
        });
    }

    /** Intially call */
    componentDidMount() {
        API.CategoryList()
            .then((findresponse) => {
                this.setState({ categoryList: findresponse.data.data, isLoaded: true })
                // console.log("data==", this.state.categoryList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );

        // console.log("query=", this.props.location.pathname.split('/')[2]);
        const query = this.props.location.pathname.split('/')[2];
        /** Get Subcategory details */
        API.SubCategoryList(query)
            .then((findresponse) => {
                // console.log("SubCategoryList response===", findresponse);
                if (!findresponse.data.data.productList.length) {
                    Swal.fire("Products not available!", "", "warning");
                } else {
                    this.setState({ SubCategoryList: findresponse.data.data.productList })
                    // console.log("SubCategoryList response===", this.state.SubCategoryList);
                }
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    getId() {
        // console.log("query=", this.props.location.pathname.split('/')[2]);
        const query = this.props.location.pathname.split('/')[2];

        API.SubCategoryList(query)
            .then((findresponse) => {
                // console.log("SubCategoryList response===", findresponse);
                if (!findresponse.data.data.productList.length) {
                    Swal.fire("Products not available!", "", "warning");
                } else {
                    this.setState({ SubCategoryList: findresponse.data.data.productList })
                    // console.log("SubCategoryList response===", this.state.SubCategoryList);
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
        this.value = localStorage.getItem('productId');
        // console.log("value===", this.value);
        const data = []
        data.push(this.value);
        data.push(productId);
        // console.log("data", data);
        const strVal = data.toString();
        // console.log('strVal=====', strVal);
        const arrVal = strVal.split(',');
        // console.log('arrVal=====', _.uniq(arrVal));
        const filter = _.filter(_.uniq(arrVal), _.size);
        // console.log('filter=====', filter);
        if (this.value) {
            if (this.value.indexOf(productId) === -1) {
                // console.log("new updated", localStorage.getItem('productId'))
                Swal.fire("Item Added Successfully In Cart!", "", "success");
            } else {
                // console.log("new added", localStorage.getItem('productId'))
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
            /** Add Wishlist */
            API.addwishlist(obj)
                .then((findresponse) => {
                    // console.log("addWishList response===", findresponse);
                    Swal.fire("Item Added Successfully In Wishlist!", "", "success");
                }).catch((err) => {
                    Swal.fire("Already Added In Wishlist!", "", "warning");
                });
        } else {
            Swal.fire("Please Login First");
        }
    }

    render() {
        let displayData;
        // console.log("ms==");
        this.getId();

        if (this.state.SubCategoryList) displayData = this.state.SubCategoryList.map((data, index) =>
            <MDBCard key={index}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={4}>
                        {(data.Images) ?
                            (<div>
                                {data.Images.containerName ? (
                                    <MDBCardImage className="img-fluid" src={config.baseMediaUrl + data.Images.containerName + data.Images.image} waves />
                                ) : (
                                        <MDBCardImage className="img-fluid" src={config.baseMediaUrl + data.Images.image} waves />
                                    )}
                            </div>) : ('')}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <MDBCardBody>

                            <MDBCardTitle>{data.metaTagTitle}</MDBCardTitle>

                            <Link className="text_color" to={`/singleproduct/${data.productId}`}>{data.name}</Link>
                            <div>
                                <p><b>Description:</b></p>
                                <div>{renderHTML(data.description)}</div>
                            </div>
                        </MDBCardBody>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div>
                            <p className="text_top"><b>Price:</b> <i className="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                            <p className="text-left">No Cost EMI</p>
                        </div>
                    </Grid>
                </Grid>
            </MDBCard>
        )

        return (
            <div>
                <Header />
                <MDBCol>
                    {displayData}

                </MDBCol>
                <Footer />
            </div>
        );
    }
}

export default SubCategories;
