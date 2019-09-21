import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Header from '../../Component/home/header/header';
import './addnewaddress.css';
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
            address_2Error: '',
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

    /** Intially Call */
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
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    /** Validation */
    validate = () => {
        let address_1Error = "";
        let cityError = "";
        let stateError = "";
        let pincodeError = "";
        let address_2Error = "";

        if (!this.state.address_1) {
            address_1Error = "please enter address_1";
        }

        if (!this.state.address_2) {
            address_2Error = "please enter  address_2";
        }

        if (!this.state.city) {
            cityError = "please enter city";
        }

        if (!this.state.state) {
            stateError = "please enter state";
        }

        const pincode = /^[1-9][0-9]{5}$/;
        if (!pincode.test(this.state.pincode)) {
            pincodeError = "please enter valid pincode";
        }

        if (address_1Error || address_2Error || cityError || stateError || pincodeError) {
            this.setState({ address_1Error, address_2Error, cityError, stateError, pincodeError });
            return false;
        }
        return true;
    };


    /** 
    * @param {JSON} event
    * handleChangeName
    */
    handleChangeName(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    /** Add Address */
    addAddress() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                address_1: '',
                address_1Error: '',
                address_2: '',
                address_2Error: '',
                city: '',
                cityError: '',
                state: '',
                stateError: '',
                pincode: '',
                pincodeError: ''
            })
        };

        if (this.state.address_1 && this.state.address_2 && this.state.city && this.state.state && this.state.pincode && this.state.pincode.length === 6) {
            const obj = {
                customerId: this.state.getProfileList.id,
                address1: this.state.address_1,
                address2: this.state.address_2,
                city: this.state.city,
                state: this.state.state,
                postcode: this.state.pincode
            }

            /** 
            * @param {JSON} obj
            * Add Address 
            */
            API.addAddress(obj)
                .then((findresponse) => {
                    console.log("addAddress response===", findresponse);
                    history.push('/address');
                }).catch(
                    { status: 500, message: 'Internal Server Error' }
                );
        }
    }

    render() {
        return (
            <div>
                <Header />
                <MDBContainer>
                    <MDBRow>
                        <h1 className="h4 text-center mb-4">Add-Address</h1>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <label className="grey-text">
                                    Address_1:
                                </label>
                                <input
                                    type="text"
                                    name="address_1"
                                    value={this.state.address_1}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.address_1Error}
                                </div>
                                <br />
                                <label className="grey-text">
                                    City:
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.cityError}
                                </div>
                                <br />
                                <label
                                    className="grey-text"
                                >
                                    Pincode:
                                </label>
                                <input
                                    type="number"
                                    name="pincode"
                                    value={this.state.pincode}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.pincodeError}
                                </div>
                                <br />
                            </form>
                        </MDBCol>
                        <MDBCol md="6">
                            <form>
                                <label className="grey-text">
                                    Address_2:
                                </label>
                                <input
                                    type="text"
                                    name="address_2"
                                    value={this.state.address_2}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.address_2Error}
                                </div>
                                <br />
                                <label className="grey-text">
                                    State:
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={this.state.state}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.stateError}
                                </div>
                                <br />
                            </form>
                        </MDBCol>
                    </MDBRow>
                    <div className="text-center mt-4">
                        <MDBBtn color="primary" onClick={this.addAddress} >
                            Save
                         </MDBBtn>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default Address;
