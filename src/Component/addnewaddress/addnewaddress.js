import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from '../../history';

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
            pincodeError: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.addAddress = this.addAddress.bind(this);
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
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    handleChangeName(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    addAddress() {
        const obj = {
            customerId: this.state.getProfileList.id,
            address1: this.state.address_1,
            address2: this.state.address_2,
            city: this.state.city,
            state: this.state.state,
            postcode: this.state.pincode
        }

        API.addAddress(obj).
            then((findresponse) => {
                console.log("addAddress response===", findresponse);
                history.push('/address');
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <label className="grey-text">
                                    Address_1
                                </label>
                                <input
                                    type="text"
                                    name="address_1"
                                    value={this.state.address_1}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <br />
                                <label className="grey-text">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <br />
                                <label
                                    className="grey-text"
                                >
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={this.state.pincode}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <br />

                            </form>
                        </MDBCol>

                        <MDBCol md="6">
                            <form>
                                <label className="grey-text">
                                    Address_2
                                </label>
                                <input
                                    type="text"
                                    name="address_2"
                                    value={this.state.address_2}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <br />
                                <label className="grey-text">
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={this.state.state}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <br />
                            </form>
                        </MDBCol>
                    </MDBRow>
                    <div className="text-center mt-4">
                        <MDBBtn color="unique" onClick={this.addAddress} >
                            Save
                         </MDBBtn>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default Address;
