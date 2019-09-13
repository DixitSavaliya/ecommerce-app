import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import * as jsPDF from 'jspdf';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../home/header/header';
import * as html2canvas from 'html2canvas';
import './orderdetail.css';

class OrderDetail extends React.Component {
    constructor(props) {
        console.log("props",props);
        super(props);
        this.state = {
            orderDetailsList: [],
            numPages: null
        }
        this.handlePdf = this.handlePdf.bind(this);
           this.orderId = props.location.state.name
     
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

    /** Order pdf generate */
    handlePdf() {
        const input = document.getElementById('page');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'px', 'a4');
                const width = pdf.internal.pageSize.getWidth();
                const height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                pdf.save("myOrder.pdf");
            });
    };

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

        if (this.state.orderDetailsList[0]) displayProduct = this.state.orderDetailsList[0].productList.map(data =>
            <MDBCardText>
                <MDBRow>
                    <MDBCol md="3"><Link to={`/singleproduct/${data.productId}`}>{data.name}</Link></MDBCol>
                    <MDBCol md="3"><i class="fas fa-rupee-sign"></i> {data.productDetail.price}</MDBCol>
                    <MDBCol md="3">{data.quantity}</MDBCol>
                    <MDBCol md="3"><i class="fas fa-rupee-sign"></i> {data.total}</MDBCol>
                </MDBRow>
                <br />
            </MDBCardText>
        )

        if (this.state.orderDetailsList) totalamount = this.state.orderDetailsList.map(data =>
            <p>Total Amount: <i class="fas fa-rupee-sign"></i> {data.total}</p>
        )

        return (
            <div>
                {/* <Header/> */}
                <MDBContainer id="page">
                        <h3><strong>OrderId:</strong> { this.orderId}</h3>
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
                    <MDBRow>
                        <MDBBtn color="unique" onClick={this.handlePdf} >Download Invoice</MDBBtn>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default OrderDetail;
