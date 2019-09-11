import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import './address.css';

class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getProfileList: [],
            addressList: [],
            id: '',
            address_1: '',
            address_1Error: '',
            address_2: '',
            city: '',
            cityError: '',
            state: '',
            stateError: '',
            pincode: '',
            pincodeError: '',
            address: ''
        }
        this.getAddress = this.getAddress.bind(this);
    }

    componentDidMount() {
        API.getProfile().
            then((findresponse) => {
                console.log("getProfile response===", findresponse);
                this.setState({ getProfileList: findresponse.data.data })
                console.log("data==", this.state.getProfileList);
                this.setState({
                    id: this.state.getProfileList.id
                });
                this.getAddress(this.state.id);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }


    /** 
    * @param {string} id
    * get address
    */
    getAddress(id) {
        console.log("id===", id);
        API.getAddress(id).
            then((findresponse) => {
                console.log("getAddress response===", findresponse);
                this.setState({ addressList: findresponse.data.data });
                console.log("addressList[[[[[[===---", this.state.addressList);
                this.setState({ address: this.state.addressList.addressId });
                console.log("addressid===", this.state.address);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }


    /** 
    * @param {string} data
    * delete address
    */
    deleteaddress(data) {
        const deletedata = data.addressId;
        console.log("delete", deletedata);
        API.deleteAddress(deletedata).
            then((findresponse) => {
                console.log("deleteAddress response===", findresponse);
                Swal.fire("Address Delete Succesfully!", "", "success");
                this.componentDidMount();
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        if (this.state.addressList) displayData = this.state.addressList.map(data =>
            <div>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Address</MDBCardTitle>
                        <MDBCardText>
                            <MDBRow>
                                <MDBCol md="8">
                                    <p>{data.address1}</p>
                                    <p>{data.address2}</p>
                                    <p>{data.city}</p>
                                    <p>{data.postcode}</p>
                                    <p>{data.state}</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <Link to={{ pathname: `/editaddress/${data.addressId}`, state: { name: data } }}><i class="fas fa-edit"></i></Link>
                                    <i class="fas fa-trash" onClick={this.deleteaddress.bind(this, data)}></i>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <br />
            </div>
        )
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <div>
                            {displayData}
                        </div>
                    </MDBRow>
                    <div className="text-center mt-4">
                        <Link to="/addnewaddress"><MDBBtn color="unique">
                            Add New Address
                        </MDBBtn></Link>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default Address;
