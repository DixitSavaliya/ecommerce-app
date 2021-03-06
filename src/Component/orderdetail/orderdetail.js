import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';
import * as jsPDF from 'jspdf';
import { Link } from "react-router-dom";
import * as html2canvas from 'html2canvas';
import './orderdetail.css';
import Header from '../../Component/home/header/header';
import Footer from '../../Component/home/footer/footer';

class OrderDetail extends React.Component {
    constructor(props) {
        console.log("props", props);
        super(props);
        this.state = {
            orderDetailsList: [],
            numPages: null
        }
        this.handlePdf = this.handlePdf.bind(this);
        this.orderId = props.location.state.name;
    }

    /** Intailly Call */
    componentDidMount() {
        console.log("query=", this.props.location.pathname.split('/')[2]);
        const orderId = this.props.location.pathname.split('/')[2];
        /** Get Orderdetails */
        API.getOrderDetails(orderId)
            .then((findresponse) => {
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
                pdf.addImage(imgData, 'JPEG', 0, 0, height, width);
                pdf.save("myOrder.pdf");
            });
    };

    render() {
        let displayData;
        let displayProduct;
        let totalamount;
        let displayDate;

        /** Display Orderdetaillist Data */

        if (this.state.orderDetailsList) displayData = this.state.orderDetailsList.map((data, index) =>
            <div key={index}>
                <span>{data.shippingAddress1} {data.shippingAddress2}</span>
                <p>Phone: {data.telephone}</p>
            </div>
        )

        if (this.state.orderDetailsList) displayDate = this.state.orderDetailsList.map((data, index) =>
            <h3 key={index}><strong>Date:</strong> {data.createdDate}</h3>
        )

        if (this.state.orderDetailsList[0]) displayProduct = this.state.orderDetailsList[0].productList.map((data, index) =>
            <div key={index}>
                <MDBRow>
                    <MDBCol md="3"><Link to={`/singleproduct/${data.productId}`}>{data.name}</Link></MDBCol>
                    <MDBCol md="3"><i className="fas fa-rupee-sign"></i> {data.productDetail.price}</MDBCol>
                    <MDBCol md="3">{data.quantity}</MDBCol>
                    <MDBCol md="3"><i className="fas fa-rupee-sign"></i> {data.total}</MDBCol>
                </MDBRow>
                <br />
            </div>
        )

        if (this.state.orderDetailsList) totalamount = this.state.orderDetailsList.map((data, index) =>
            <p key={index}>Total Amount: <i className="fas fa-rupee-sign"></i> {data.total}</p>
        )

        return (
            <div>
                <Header />
                <MDBContainer id="page">
                    <MDBRow>
                        <h1 className="h4 text-center mb-4">Order-Details</h1>
                    </MDBRow>
                    <MDBRow>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <h3><strong>OrderId:</strong> {this.orderId}</h3>
                        </MDBCol>
                        <MDBCol md="6">
                            {displayDate}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>Shipping Adreess</MDBCardTitle>
                                    {displayData}

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBCard>
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
                                <h1 className="padding">ItemList</h1>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                        <MDBRow>
                                            <MDBCol md="3">Products</MDBCol>
                                            <MDBCol md="3">Price</MDBCol>
                                            <MDBCol md="3">Qty</MDBCol>
                                            <MDBCol md="3">Total</MDBCol>
                                        </MDBRow>
                                    </MDBCardTitle>
                                    <div>
                                        {displayProduct}
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="8">
                        </MDBCol>
                        <MDBCol md="4">

                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" className="paddimg_top">
                            <MDBBtn color="primary" onClick={this.handlePdf} >Download Invoice</MDBBtn>
                        </MDBCol>
                        <MDBCol md="6" className="paddimg_bottom">
                            <MDBCardTitle className="float_right" >
                                {totalamount}
                            </MDBCardTitle>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <Footer />
            </div>
        );
    }
}

export default OrderDetail;
