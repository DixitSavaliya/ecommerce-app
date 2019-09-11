import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { MDBBtn, MDBCard, MDBCardBody, MDBRow, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Swal from 'sweetalert2';

class WishList extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {
            wishList: []
        }
    }

    componentDidMount() {
        API.getWishList().
            then((findresponse) => {
                console.log("getWishList response===", findresponse);
                this.setState({ wishList: findresponse.data.data })
                console.log("data==", this.state.wishList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    /** 
  * @param {string} id
  * delete wishlist
  */
    deleteWishList(id) {
        API.deleteWishList(id).
            then((findresponse) => {
                console.log("deleteWishList response===", findresponse);
                Swal.fire("Successfully Delete!", "", "success");
                this.componentDidMount();
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;

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
                        <i class="fas fa-trash" onClick={() => this.deleteWishList(data._id)}></i>
                    </MDBCol>
                    <MDBCol md="1"></MDBCol>
                </MDBRow>
            </div>
        )

        return (
            <div>
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
            </div>
        );
    }
}

export default WishList;
