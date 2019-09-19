import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../../Component/home/header/header';
import Footer from '../../Component/home/footer/footer';
import Swal from 'sweetalert2';
import { EventEmitter } from '../../event';
const _ = require('lodash');

class WishList extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {
            wishList: [],
            isDeleted: false
        }
        EventEmitter.subscribe('length', (event) => {
            console.log("wishlist=", event);
            this.count = event;
            console.log("count=>", this.count);
            // this.setState({ count: this.count })
        });
    }

    /** Intailly call */
    componentDidMount() {
        /** Get Wishlist */
        API.getWishList().
            then((findresponse) => {
                this.setState({ wishList: findresponse.data.data })
                console.log("data==", this.state.wishList);
                localStorage.setItem('wishlistLength', this.state.wishList.length);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    /** 
  * @param {string} id
  * delete wishlist
  */
    deleteWishList(id) {
        /** Delete Wishlist */
        API.deleteWishList(id).
            then((findresponse) => {
                if (this.state.isDeleted == true) {
                    Swal.fire("Item Added Successfully In Cart!", "", "success");
                    this.setState({ isDeleted: false });
                    this.componentDidMount();
                } else {
                    Swal.fire("Item Deleted Successfully!", "", "success");
                    this.componentDidMount();
                }
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    /** 
     * @param {string} productId
     * Add Cart function
     */
    addInCart(productId, id) {
        this.setState({ isDeleted: true });
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
        setTimeout(
            this.deleteWishList(id),
            10000
        );
    }

    render() {
        let displayData;

        /** Display wishlist data */
        if (this.state.wishList) displayData = this.state.wishList.map(data =>
            <div>
                <MDBRow>
                    <MDBCol md="1"></MDBCol>
                    <MDBCol md="2">
                        <div>
                            {(data.productImage) ?
                                (<div>
                                    {data.productImage.containerName ? (<img src={config.baseMediaUrl + data.productImage.containerName + data.productImage.image} className="img-fluid" alt="product image" />) : (<img src={config.baseMediaUrl + data.productImage.image} className="img-fluid" alt="product image" />)}
                                </div>) : ('')}
                        </div>
                    </MDBCol>
                    <MDBCol md="2"><Link to={`/singleproduct/${data.productId}`}>{data.product.name}</Link></MDBCol>
                    <MDBCol md="2"><i class="fas fa-rupee-sign"></i> {data.product.price}</MDBCol>
                    <MDBCol md="2">{data.product.dateAvailable}</MDBCol>
                    <MDBCol md="2">
                        <i className="fa fa-shopping-cart" aria-hidden="true" onClick={() => this.addInCart(data.productId, data._id)}></i>
                        <i class="fas fa-trash" onClick={() => this.deleteWishList(data._id)}></i>
                    </MDBCol>
                    <MDBCol md="1"></MDBCol>
                </MDBRow>
            </div>
        )

        return (
            <div>
                <Header />
                <MDBContainer>
                    <MDBRow>
                        <h1 className="h4 text-center mb-4">WishList</h1>
                    </MDBRow>
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>
                                    <MDBRow>
                                        <MDBCol md="1"></MDBCol>
                                        <MDBCol md="2">Product</MDBCol>
                                        <MDBCol md="2">Name</MDBCol>
                                        <MDBCol md="2">Price</MDBCol>
                                        <MDBCol md="2">Available Date</MDBCol>
                                        <MDBCol md="2">Action</MDBCol>
                                        <MDBCol md="1"></MDBCol>
                                    </MDBRow>
                                </MDBCardTitle>
                                <MDBCardText>
                                    {displayData}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
                <Footer />
            </div>
        );
    }
}

export default WishList;
