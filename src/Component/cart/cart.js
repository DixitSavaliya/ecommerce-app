import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { MDBBtn, MDBCard, MDBCardBody, MDBRow, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const _ = require('lodash');
let finalArr = [];
let priceArr = [];
let total = 0;
// let productDetails =[];
class Cart extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {
            cartItem: '',
            demo: '',
            productDetails: []
        }
    }

    componentDidMount() {
        const value = localStorage.getItem('productId');
        const val = _.uniq(value.split(',')); //dplicate value remove
        console.log('value of token-=-=', val);
        const filter = _.filter(val, _.size); // null value remove
        console.log('value of filter-=-=', filter, priceArr);
        finalArr = filter;
        finalArr.map((id) => {
            console.log('id-=-=', id);
            API.productDetail(id)
                .then((response) => {
                    console.log('respone from cart-=-=', response.data.data);
                    response.data.data[0]['qty'] = 1;
                    console.log('priceArr initial-=-=', priceArr, response.data.data[0].price);
                    let index = priceArr.indexOf(response.data.data[0].price);
                    if (index === -1) {
                        priceArr.push(response.data.data[0].price);
                    }
                    console.log('price array-=-=', priceArr);
                    this.setState({
                        cartItem: [...this.state.cartItem, ...response.data.data]
                    })
                    const obj = {
                        productId: response.data.data[0].productId,
                        quantity: response.data.data[0].qty,
                        price: response.data.data[0].price,
                        name: response.data.data[0].name
                    }
                    this.setState(prevState => ({
                        productDetails: [...prevState.productDetails, obj]
                    }))
                })
                .catch((err) => {
                    console.log('err from cart-=-=', err);
                })
        })
    }

     /** 
    * @param {string} id
    * Delete wishlist
    */
    deleteWishList(id) {
        const index = finalArr.indexOf(id);
        if (index !== -1) {
            finalArr.splice(index, 1);
        }
        console.log('finalArr-=-=', finalArr);
        Swal.fire("Successfully Delete!", "", "success");
        localStorage.setItem('productId', finalArr.toString());
        this.setState({
            cartItem: ''
        })
        this.componentDidMount();
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
        this.state.productDetails[id].quantity = this.state.productDetails[id].quantity - 1;
        console.log("details==========", this.state.productDetails);
        this.setState({
            demo: ''
        })
    }

     /** 
    * @param {string} index
    * Quantity Decrement
    */
    increment(index) {
        console.log('index in increment-=-=', index);
        this.state.cartItem[index].qty = this.state.cartItem[index].qty + 1;
        priceArr.push(this.state.cartItem[index].price);
        this.state.productDetails[index].quantity = this.state.productDetails[index].quantity + 1;
        console.log("details==========", this.state.productDetails);
        this.setState({
            demo: ''
        })
        console.log(this.state.cartItem[index]);
        console.log("after increment=============", this.state.cartItem[index].qty);
    }

    /** Total amount */
    totalFunc = () => {
        console.log("pricearr---==", priceArr);
        total = _.sum(priceArr);
        return total;
    }

    render() {

        let displayData;

        if (this.state.cartItem) displayData = this.state.cartItem.map((data, index) => (
            <div>
                <MDBRow>
                    <MDBCol md="2">
                        <div>
                            {(data.productImage[0]) ?
                                (<div>
                                    {data.productImage[0].containerName ? (<img src={config.baseMediaUrl + data.productImage[0].containerName + data.productImage[0].image} className="img-fluid" alt="product image" />) : (<img src={config.baseMediaUrl + data.productImage[0].image} className="img-fluid" alt="product image" />)}
                                </div>) : ('')}
                        </div>
                    </MDBCol>
                    <MDBCol md="2"><Link to={`/singleproduct/${data._id}`}>{data.name}</Link></MDBCol>
                    <MDBCol md="2"><i class="fas fa-rupee-sign"></i> {data.price}</MDBCol>
                    <MDBCol md="2">
                        <MDBRow>
                            <MDBCol md="4"><button onClick={() => this.increment(index)}>+</button></MDBCol>
                            <MDBCol md="4"><input className="input" value={data.qty} /></MDBCol>
                            <MDBCol md="4"><button onClick={() => this.decrement(index)}>-</button></MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="2">
                        <i className="fas fa-trash" onClick={() => this.deleteWishList(data.productId)}></i>
                    </MDBCol>
                </MDBRow>
                <hr />
            </div>
        )
        )

        return (
            <div>
                <MDBCol>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>
                                <MDBRow>
                                    <MDBCol md="2">Product</MDBCol>
                                    <MDBCol md="2" >Name</MDBCol>
                                    <MDBCol md="2">Price</MDBCol>
                                    <MDBCol md="2">Quantity</MDBCol>
                                    <MDBCol md="2">total</MDBCol>
                                    <MDBCol md="2">Action</MDBCol>
                                </MDBRow>
                            </MDBCardTitle>
                            <MDBCardText>
                                <div>
                                    {displayData}
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="text-center mt-4">
                                            <Link to="/home"> <MDBBtn color="indigo">Continue With Shopping</MDBBtn></Link>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <span>Total:<h3>{this.totalFunc()}</h3></span>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to={{ pathname: '/checkout', state: { name: this.state.productDetails } }}  > <MDBBtn color="indigo">Proceed To Checkout</MDBBtn></Link>
                                    </div>
                                </div>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        );
    }
}

export default Cart;
