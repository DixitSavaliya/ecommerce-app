import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Swal from 'sweetalert2';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getProfileList: [],
            addressList: [],
            id: '',
            firstName: '',
            firstNameError: '',
            email: '',
            emailIdError: '',
            mobileNumber: '',
            mobileNumberError: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    /** Intailly call */
    componentDidMount() {
        /** Get Profile */
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

    /** Validation  */
    validate = () => {
        let emailIdError = "";
        let mobileNumberError = "";
        let firstNameError = "";

        if (!this.state.firstName) {
            firstNameError = "please enter  name";
        }

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.email)) {
            emailIdError = "invalid email";
        }

        const phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phone.test(this.state.mobileNumber)) {
            mobileNumberError = "please enter valid number";
        }

        if (emailIdError || mobileNumberError || firstNameError) {
            this.setState({ emailIdError, mobileNumberError, firstNameError });
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

    /** Edit profile */
    editProfile() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                emailIdError: '',
                mobileNumberError: '',
                firstNameError: ''
            })
        };

        if (this.state.firstName && this.state.email && this.state.mobileNumber && this.state.mobileNumber.length == 10 && !this.state.emailIdError) {
            const obj = {
                firstName: this.state.firstName,
                emailId: this.state.email,
                phoneNumber: this.state.mobileNumber
            }
            /** Update Profile */
            API.updateProfile(obj).
                then((findresponse) => {
                    console.log("getProfile response===", findresponse);
                    Swal.fire("Edited Successfully!", "", "success");
                }).catch(
                    { status: 500, message: 'Internal Server Error' }
                );
        }
    }

    render() {
        return (
            <div>
                {/** Profile && Edit profile form */}
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
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.firstNameError}
                                </div>
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
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.emailIdError}
                                </div>
                                <br />
                                <label
                                    className="grey-text"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    name="mobileNumber"
                                    value={this.state.mobileNumber}
                                    onChange={this.handleChangeName}
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.mobileNumberError}
                                </div>
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
