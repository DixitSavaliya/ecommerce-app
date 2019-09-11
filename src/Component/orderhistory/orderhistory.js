import React from 'react';
import API from '../../service/homeservice';
import { MDBBtn, MDBCard, MDBCardBody, MDBRow, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderHistoryList: []
        }
    }

    componentDidMount() {
        API.getOrderHistory().
            then((findresponse) => {
                console.log("getOrderHistory response===", findresponse);
                this.setState({ orderHistoryList: findresponse.data.data })
                console.log("data==", this.state.orderHistoryList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }


    /** 
   * @param {string} data
   * get myorder details
   */
    getOrderDetails(data) {
        API.getOrderDetail(data.orderId).
            then((findresponse) => {
                console.log("getOrderHistory response===", findresponse);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;

        if (this.state.orderHistoryList) displayData = this.state.orderHistoryList.map(data =>
            <div>
                <MDBRow>
                    <MDBCol md="3">{data.orderId}</MDBCol>
                    <MDBCol md="2">{data.orderStatus.name}</MDBCol>
                    <MDBCol md="2">{data.createdDate}</MDBCol>
                    <MDBCol md="2">{data.total}</MDBCol>
                    <MDBCol md="3">
                        <Link to={{ pathname: `orderdetail/${data.orderId}` }}><i class="fas fa-eye"></i></Link>
                    </MDBCol>
                </MDBRow>
                <br />
            </div>
        )
        return (
            <div>
                <MDBCol>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>
                                <MDBRow>
                                    <MDBCol md="3">OrderId</MDBCol>
                                    <MDBCol md="2">Status</MDBCol>
                                    <MDBCol md="2">Date</MDBCol>
                                    <MDBCol md="2">Total Amount</MDBCol>
                                    <MDBCol md="3">Action</MDBCol>
                                </MDBRow>
                            </MDBCardTitle>
                            <MDBCardText>
                                {displayData}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        );
    }
}

export default OrderHistory;
