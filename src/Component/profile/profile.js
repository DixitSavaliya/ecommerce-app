import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getProfileList: [],
            addressList: [],
            id: '',
            firstName: '',
            email: '',
            mobileNumber: '',
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
        this.editProfile = this.editProfile.bind(this);

    }

    componentDidMount() {
        API.getProfile().
            then((findresponse) => {
                console.log("getProfile response===", findresponse);
                this.setState({ getProfileList: findresponse.data.data })
                console.log("data==", this.state.getProfileList);
                this.setState({
                    firstName: this.state.getProfileList.firstName,
                    email: this.state.getProfileList.email,
                    mobileNumber: this.state.getProfileList.mobileNumber,
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

    editProfile() {
        const obj = {
            firstName: this.state.firstName,
            emailId: this.state.email,
            phoneNumber: this.state.mobileNumber
        }
        API.updateProfile(obj).
            then((findresponse) => {
                console.log("getProfile response===", findresponse);
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
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <br />
                                <label className="grey-text">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <br />
                                <label
                                    className="grey-text"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={this.state.mobileNumber}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <br />

                                <div className="text-center mt-4">
                                    <MDBBtn color="unique" onClick={this.editProfile} >
                                        Save
                                 </MDBBtn>
                                    <div>
                                        <span>
                                            <p><Link to="/updatepassword">update password</Link></p>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default Profile;
