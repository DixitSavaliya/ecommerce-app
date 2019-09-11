import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from '../../history';

class EditAddress extends React.Component {
    constructor(props) {
        console.log("props", props);
        super(props);
        this.state = {
            getProfileList: [],
            addressList: [],
            editList: [],
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
            addressId: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.EditAddress = this.EditAddress.bind(this);
    }

    componentDidMount() {
        const data = this.props.location.state.name;
        console.log("editaddress====", data);
        this.setState({
            address_1: data.address1,
            city: data.city,
            address_2: data.address2,
            state: data.state,
            pincode: data.postcode,
            addressId: data.addressId
        })

        API.getProfile().
            then((findresponse) => {
                this.setState({ getProfileList: findresponse.data.data })
                console.log("getProfileList", this.state.getProfileList);
                this.setState({
                    id: this.state.getProfileList.id
                });
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }


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

    /** EditAddress functionality */
    EditAddress() {
        const obj = {
            addressId: this.state.addressId,
            customerId: this.state.getProfileList.id,
            address1: this.state.address_1,
            address2: this.state.address_2,
            city: this.state.city,
            state: this.state.state,
            postcode: this.state.pincode
        }
        API.editAddress(obj, this.state.addressId).
            then((findresponse) => {
                console.log("editList======", findresponse);
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
                        <MDBBtn color="unique" onClick={this.EditAddress} >
                            Save
                         </MDBBtn>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default EditAddress;
