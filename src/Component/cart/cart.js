import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { MDBBtn, MDBCard, MDBCardBody, MDBRow, MDBCardTitle, MDBCol } from 'mdbreact';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Header from '../../Component/home/header/header';
import Footer from '../../Component/home/footer/footer';
import './cart.css';
const _ = require('lodash');
let finalArr = [];
let priceArr = [];
let total = 0;

class Cart extends React.Component {
  constructor(props) {
    console.log("props Home======", props);
    super(props);
    this.state = {
      cartItem: '',
      demo: '',
      productDetails: [],
      finalArry: [],
      qtyArray: '',
      qty: ''
    }
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  /** Intially Call  */
  componentDidMount() {
    if (localStorage.getItem('qtyObject')) {
      console.log("id===", localStorage.getItem('productId'), localStorage.getItem('isFlag'))
      if (localStorage.getItem('productId')) {
        const value = localStorage.getItem('productId');
        const value1 = localStorage.getItem('qtyObject');
        console.log('value of qtyobject-=-=', localStorage.getItem('qtyObject'));
        const qty = value1.split(',');
        this.setState({
          qtyArray: qty
        })
        console.log("qty=", qty);
        console.log("qty====", qty);
        const val = _.uniq(value.split(',')); //dplicate value remove
        const val1 = _.uniq(value1.split(','));
        console.log('value of token-=-=', val, val1);
        const filter = _.filter(val, _.size); // null value remove
        const filter1 = _.filter(val1, _.size);
        console.log('value of filter-=-=', filter, filter1, priceArr);
        finalArr = filter;
        console.log('finalArr', finalArr);
        let finalArrLength = finalArr.length;
        console.log('cart count in get item=====', finalArrLength);
        localStorage.setItem('cartCount', finalArrLength.toString());
        finalArr.map((id, index) =>

          /** Get Productdetail */
          API.productDetail(id)
            .then((response, err) => {
              console.log('respone from cart-=-=', response.data.data);
              this.state.qtyArray.map((data, index) => {
                if (data.split('/')[0] === id) {
                  response.data.data[0]['qty'] = data.split('/')[1];
                } else {
                  response.data.data[0]['qty'] = 1;
                }
              })
              console.log('priceArr initial-=-=', priceArr, response.data.data[0].price);
              let index = priceArr.indexOf(response.data.data[0].price);
              if (index === -1) {
                for (let i = 0; i < response.data.data[0]['qty']; i++) {
                  priceArr.push(response.data.data[0].price);
                }
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
        )
      } else {
        Swal.fire("Cart is a empty");
      }
    } else {
      console.log("id===", localStorage.getItem('productId'), localStorage.getItem('isFlag'))
      if (localStorage.getItem('productId')) {
        const value = localStorage.getItem('productId');

        const val = _.uniq(value.split(',')); //dplicate value remove

        console.log('value of token-=-=', val);
        const filter = _.filter(val, _.size); // null value remove

        console.log('value of filter-=-=', filter, priceArr);
        finalArr = filter;
        console.log('finalArr', finalArr);
        let finalArrLength = finalArr.length;
        console.log('cart count in get item=====', finalArrLength);
        localStorage.setItem('cartCount', finalArrLength.toString());
        finalArr.map((id, index) =>

          /** Get Productdetail */
          API.productDetail(id)
            .then((response, err) => {
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
        )
      } else {
        Swal.fire("Cart is a empty");
      }
    }
  }

  /** 
 * @param {string} id
 * @param {string} price
 * Delete wishlist
 */
  deleteWishList(id, price) {
    priceArr.splice(_.findIndex(priceArr, price), 1);
    console.log("pricearr==========>", priceArr)
    const index = finalArr.indexOf(id);
    if (index !== -1) {
      finalArr.splice(index, 1);
    }
    console.log('finalArr-=-=', finalArr);
    this.setState({ finalArry: finalArr });
    Swal.fire("Item Deleted Successfully!", "", "success");
    localStorage.setItem('productId', finalArr.toString());
    localStorage.setItem('qtyObject', finalArr.toString());
    localStorage.setItem('cartCount', finalArr.length);
    this.setState({
      cartItem: ''
    })
    priceArr = [];
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
    console.log("qtantity===", this.state.cartItem[index].qty);
    this.state.cartItem[index].qty = +this.state.cartItem[index].qty + +1;
    priceArr.push(this.state.cartItem[index].price);
    this.state.productDetails[index].quantity = this.state.productDetails[index].quantity + 1;
    console.log("details==========", this.state.productDetails);
    this.setState({
      demo: ''
    })
    console.log(this.state.cartItem[index]);
    console.log("after increment=============", this.state.cartItem[index].qty);
  }

  handleFormChange() {
    console.log("This is the form change function inside -Form-");
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
      <div key={index}>
        <MDBRow>
          <MDBCol md="1"></MDBCol>
          <MDBCol md="2">
            <div>
              {(data.productImage[0]) ?
                (<div className="img_height">
                  {data.productImage[0].containerName ? (<img src={config.baseMediaUrl + data.productImage[0].containerName + data.productImage[0].image} className="img-fluid" alt="product" />) : (<img src={config.baseMediaUrl + data.productImage[0].image} className="img-fluid" alt="product" />)}
                </div>) : ('')}
            </div>
          </MDBCol>
          <MDBCol md="2"><Link to={`/singleproduct/${data._id}`}>{data.name}</Link></MDBCol>
          <MDBCol md="2"><i className="fas fa-rupee-sign"></i> {data.price}</MDBCol>
          <MDBCol md="2">
            <MDBRow>
              <MDBCol md="2" className="button_increment "><button onClick={() => this.increment(index)}>+</button></MDBCol>
              <MDBCol md="2" className="box"><input className="input" value={data.qty} onChange={this.handleFormChange} /></MDBCol>
              <MDBCol md="2" className="button_decrement"><button onClick={() => this.decrement(index)}>-</button></MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="2">
            <i className="fas fa-trash" onClick={() => this.deleteWishList(data.productId, data.price)}></i>
          </MDBCol>
          <MDBCol md="1"></MDBCol>
        </MDBRow>
        <hr />
      </div>
    )
    )

    return (
      <div>
        <Header />
        <MDBCol>
          <MDBRow>
            <h1 className="h4 text-center mb-4">Cart</h1>
          </MDBRow>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>
                <MDBRow>
                  <MDBCol md="1"></MDBCol>
                  <MDBCol md="2">Product</MDBCol>
                  <MDBCol md="2" >Name</MDBCol>
                  <MDBCol md="2">Price</MDBCol>
                  <MDBCol md="2">Quantity</MDBCol>
                  <MDBCol md="2">Action</MDBCol>
                  <MDBCol md="1"></MDBCol>
                </MDBRow>
              </MDBCardTitle>
              <div>
                {displayData}
              </div>
              {
                localStorage.getItem('productId') ? (<div className="row">
                  <div className="col-md-4">
                    <div className="text-center mt-4">
                      <Link to="/home"> <MDBBtn color="primary">Continue With Shopping</MDBBtn></Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center mt-4">
                      <span><b>Total:</b> <h3><i className="fas fa-rupee-sign"></i> {this.totalFunc()}</h3></span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center mt-4">
                      <Link to={{ pathname: '/checkout', state: { name: this.state.productDetails } }}  > <MDBBtn color="primary">Proceed To Checkout</MDBBtn></Link>
                    </div>
                  </div>
                </div>) : ('')
              }
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <Footer />
      </div>
    );
  }
}

export default Cart;
