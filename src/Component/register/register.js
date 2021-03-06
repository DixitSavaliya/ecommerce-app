import React from 'react';
import { MDBContainer, MDBRow, MDBBtn } from 'mdbreact';
import API from '../../service/homeservice';
import '../login/login.css'
import Swal from 'sweetalert2';

class SignUp extends React.Component {
    /** constructor call */
    constructor(props) {
        console.log("props======", props);
        super(props);
        this.state = {
            name: '',
            nameError: '',
            password: '',
            passwordError: '',
            emailId: '',
            emailIdError: '',
            confirmPassword: '',
            confirmPasswordError: '',
            phoneNumber: '',
            phoneNumberError: ''
        };
        this.Signup = this.Signup.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    /** Validation  */
    validate = () => {
        let nameError = "";
        let passwordError = "";
        let emailIdError = "";
        let confirmPasswordError = "";
        let phoneNumberError = "";

        if (!this.state.name) {
            nameError = "please enter  name";
        }

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.emailId)) {
            emailIdError = "invalid email";
        }

        if (!this.state.password) {
            passwordError = "please enter  password";
        }

        if (!this.state.confirmPassword) {
            confirmPasswordError = "please enter confirm password";
        } else if (this.state.confirmPassword !== this.state.password || this.state.confirmPassword.length !== this.state.password.length) {
            confirmPasswordError = "does not match password or confirm paswword";
        }

        const phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phone.test(this.state.phoneNumber)) {
            phoneNumberError = "please enter valid number";
        }

        if (nameError || emailIdError || passwordError || confirmPasswordError || phoneNumberError) {
            this.setState({ nameError, emailIdError, confirmPasswordError, phoneNumberError, passwordError });
            return false;
        }
        return true;
    };

    /** New-User Register */
    Signup() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                name: '',
                nameError: '',
                password: '',
                passwordError: '',
                emailId: '',
                emailIdError: '',
                confirmPassword: '',
                confirmPasswordError: '',
                phoneNumber: '',
                phoneNumberError: ''
            })
        };

        if (this.state.name && this.state.password && this.state.emailId && this.state.confirmPassword && this.state.phoneNumber && this.state.phoneNumber.length === 10 && !this.state.emailIdError && this.state.password.length === this.state.confirmPassword.length && this.state.confirmPassword === this.state.password) {
            const obj = {
                name: this.state.name,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                emailId: this.state.emailId,
                phoneNumber: this.state.phoneNumber
            }
            /** User Sign-up */
            API.Signup(obj)
                .then((findresponse) => {
                    window.location.href = '/login';
                    // history.push('/login');
                }).catch(Swal.fire("Something went wrong!", "", "warning"));
        }
    }

    /** 
* @param {JSON} event
* handleChangeEvent
*/
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    render() {
        return (
            <div>
                {/** User Signup form */}
                <MDBContainer>
                    <MDBRow>
                        <h1 className="h4 text-center mb-4">Sign up</h1>
                    </MDBRow>
                    <MDBRow>
                        <form>
                            <label className="grey-text">
                                Name
            					</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.nameError}
                            </div>
                            <br />
                            <label className="grey-text">
                                Email
           						 </label>
                            <input
                                type="email"
                                name="emailId"
                                className="form-control"
                                value={this.state.emailId}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.emailIdError}
                            </div>
                            <br />
                            <label
                                className="grey-text"
                            >
                                Password
          						  </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.passwordError}
                            </div>
                            <br />
                            <label
                                className="grey-text"
                            >
                                ConfirmPassword
          						  </label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.confirmPasswordError}
                            </div>
                            <br />
                            <label
                                className="grey-text"
                            >
                                PhoneNumber
          						  </label>
                            <input
                                type="number"
                                className="form-control"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.phoneNumberError}
                            </div>
                            <div className="text-center mt-4">
                                <MDBBtn color="primary" onClick={this.Signup} disabled={!this.state.name}>
                                    SignUp
								</MDBBtn>
                            </div>
                        </form>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default SignUp;
