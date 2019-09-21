import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2';
import Header from '../../Component/home/header/header';
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

    /** Intially call  */
    componentDidMount() {
        /** Get Profile */
        API.getProfile()
            .then((findresponse) => {
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
        /** Get Address */
        API.getAddress(id)
            .then((findresponse) => {
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
        /** Delete address */
        API.deleteAddress(deletedata)
            .then((findresponse) => {
                console.log("deleteAddress response===", findresponse);
                Swal.fire("Address Deleted Succesfully!", "", "success");
                this.componentDidMount();
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        let displayAddress;

        if (this.state.addressList) displayData = this.state.addressList.slice(0, Math.floor(this.state.addressList.length / 2)).map((data,index) =>
            <div key={index}>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Address</MDBCardTitle>
                     
                            <MDBRow>
                                <MDBCol md="8">
                                    <p><b>Address_1:</b> {data.address1}</p>
                                    <p><b>Address_2:</b> {data.address2}</p>
                                    <p><b>City:</b> {data.city}</p>
                                    <p><b>Postcode:</b> {data.postcode}</p>
                                    <p><b>State:</b> {data.state}</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <Link to={{ pathname: `/editaddress/${data.addressId}`, state: { name: data } }}><i className="fas fa-edit"></i></Link>
                                    <i className="fas fa-trash" onClick={this.deleteaddress.bind(this, data)}></i>
                                </MDBCol>
                            </MDBRow>
                      
                    </MDBCardBody>
                </MDBCard>
                <br />
            </div>
        )

        if (this.state.addressList) displayAddress = this.state.addressList.slice(Math.floor(this.state.addressList.length / 2)).map((data,index) =>
            <div key={index}>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Address</MDBCardTitle>
                    
                            <MDBRow>
                                <MDBCol md="8">
                                    <div>
                                    <p><b>Address_1:</b> {data.address1}</p>
                                    <p><b>Address_2:</b> {data.address2}</p>
                                    <p><b>City:</b> {data.city}</p>
                                    <p><b>Postcode:</b> {data.postcode}</p>
                                    <p><b>State:</b> {data.state}</p>
                                    </div>
                                </MDBCol>
                                <MDBCol md="4">
                                    <Link to={{ pathname: `/editaddress/${data.addressId}`, state: { name: data } }}><i className="fas fa-edit"></i></Link>
                                    <i className="fas fa-trash" onClick={this.deleteaddress.bind(this, data)}></i>
                                </MDBCol>
                            </MDBRow>
                      
                    </MDBCardBody>
                </MDBCard>
                <br />
            </div>
        )
        return (
            <div>
                <Header />
                <MDBContainer>
                    <MDBRow>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={6}>
                                {displayData}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {displayAddress}
                            </Grid>
                        </Grid>
                    </MDBRow>
                    <div className="text-center mt-4">
                        <Link to="/addnewaddress"><MDBBtn color="primary">
                            Add New Address
                        </MDBBtn></Link>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default Address;
