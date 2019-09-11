import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import './orderdetail.css';

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsList: []
        }
    }


    componentDidMount() {
        console.log("query=", this.props.location.pathname.split('/')[2]);
        const orderId = this.props.location.pathname.split('/')[2];
        API.getOrderDetails(orderId).
            then((findresponse) => {
                console.log("getOrderHistory response===", findresponse);
                this.setState({ orderDetailsList: findresponse.data.data })
                console.log("data==", this.state.orderDetailsList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        let displayProduct;
        let totalamount;

        if (this.state.orderDetailsList) displayData = this.state.orderDetailsList.map(data =>
            <MDBCardText>
                <span>{data.shippingAddress1} {data.shippingAddress2}</span>
                <p>Phone: {data.telephone}</p>
            </MDBCardText>

        )

        if(this.state.orderDetailsList[0]) displayProduct = this.state.orderDetailsList[0].productList.map(data =>
            <MDBCardText>
            <MDBRow>
            <MDBCol md="3">{data.name}</MDBCol>
            <MDBCol md="3"><i class="fas fa-rupee-sign"></i> {data.productDetail.price}</MDBCol>
            <MDBCol md="3">{data.quantity}</MDBCol>
             <MDBCol md="3"><i class="fas fa-rupee-sign"></i> {data.total}</MDBCol>
           </MDBRow>
           <br/>
        </MDBCardText>
            )

            if (this.state.orderDetailsList) totalamount = this.state.orderDetailsList.map(data =>
                    <p>Total Amount:{data.total}</p>
            )

        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBCard style={{ width: "22rem" }}>
                                <MDBCardBody>
                                    <MDBCardTitle>Shipping Adreess</MDBCardTitle>
                                    {displayData}

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBCard style={{ width: "22rem" }}>
                                <MDBCardBody>
                                    <MDBCardTitle>Billing Adreess</MDBCardTitle>
                                    {displayData}

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol>
                       
                    <MDBCard>
                        <h1>ItemList</h1>                       
                        <MDBCardBody> 
                            <MDBCardTitle>
                                <MDBRow>
                                    <MDBCol md="3">Products</MDBCol>
                                    <MDBCol md="3">Price</MDBCol>
                                    <MDBCol md="3">Qty</MDBCol>
                                    <MDBCol md="3">Total</MDBCol>
                                </MDBRow>
                            </MDBCardTitle>
                            <MDBCardText>
                               {displayProduct}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol md="8">
                    </MDBCol>
                    <MDBCol md="4">
                    <MDBCardTitle>
                    {totalamount}
                    </MDBCardTitle>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default OrderDetail;
