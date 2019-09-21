import React from 'react';
import { MDBContainer, MDBRow, MDBBtn } from 'mdbreact';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from 'react-router-dom';
import './login.css';
import API from '../../service/homeservice';
import Swal from 'sweetalert2';
import * as jwt_decode from 'jwt-decode';

class Login extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordError: '',
            emailId: '',
            emailIdError: ''
        }
        this.login = this.login.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** validation of login form */
    validate = () => {
        let passwordError = "";
        let emailIdError = "";

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.emailId)) {
            emailIdError = "invalid email";
        }

        if (!this.state.password) {
            passwordError = "please enter password";
        }

        if (emailIdError || passwordError) {
            this.setState({ emailIdError, passwordError });
            return false;
        }
        return true;
    };

    /** User Login successfully */
    login() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                password: '',
                passwordError: '',
                emailId: '',
                emailIdError: ''
            })
        };
        if (this.state.emailId && this.state.password) {
            const obj = {
                emailId: this.state.emailId,
                password: this.state.password
            }
            /** UserLogin */
            API.Login(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        this.setState({
                            user: findresponse
                        })
                        console.log("login response===", this.state.user);
                        var token = this.state.user.data.data.token;
                        localStorage.setItem('token', token);
                        var decoded = jwt_decode(token);
                        console.log("decode=====", decoded);
                        localStorage.setItem('name', decoded.customer.first_name);
                        window.location.href = '/home';
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    render() {
        return (
            <div>
                {/** Login form */}
                <MDBContainer>
                <MDBRow>
                    <h1 className="h4 text-center mb-4">Sign In</h1>
                    </MDBRow>
                    <MDBRow>
                        <form>
                            <div>
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
                            </div>
                            <div>
                                <label
                                    className="grey-text"
                                >
                                    Your password
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
                            </div>
                            <div className="text-center mt-4">
                                <MDBBtn color="primary" onClick={this.login} disabled={!this.state.emailId && !this.state.password}>Login</MDBBtn>
                            </div>
                            <div>
                                <span>
                                    <p><Link to="/forgotpassword">Forgot password?</Link></p>
                                </span>
                                <span>
                                    <p><Link to="/register">Create new account</Link></p>
                                </span>
                            </div>
                        </form>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default Login;
