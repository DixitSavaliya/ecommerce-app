import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBBtn } from 'mdbreact';
import history from '../../history';
import Header from '../../Component/home/header/header';
import Footer from '../../Component/home/footer/footer';
import Swal from 'sweetalert2';

class UpdatePassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            oldPasswordError: '',
            newPassword: '',
            newPasswordError: '',
            confirmPassword: '',
            confirmPasswordError: ''
        }
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.UpdatePassword = this.UpdatePassword.bind(this);
    }

    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** validation of updatepassword form */
    validate = () => {
        let oldPasswordError = "";
        let newPasswordError = "";
        let confirmPasswordError = "";

        if (!this.state.oldPassword) {
            oldPasswordError = "please enter old password";
        }

        if (!this.state.newPassword) {
            newPasswordError = "please enter new password";
        }

        if (!this.state.confirmPassword) {
            confirmPasswordError = "please enter confirm password";
        }

        if (oldPasswordError || newPasswordError || confirmPasswordError) {
            this.setState({ oldPasswordError, newPasswordError, confirmPasswordError });
            return false;
        }
        return true;
    };


    /** Update Password */
    UpdatePassword() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                oldPassword: '',
                oldPasswordError: '',
                newPassword: '',
                newPasswordError: '',
                confirmPassword: '',
                confirmPasswordError: ''
            })
        };

        if (this.state.oldPassword && this.state.newPassword && this.state.confirmPassword) {
            if (this.state.newPassword === this.state.confirmPassword) {
                const obj = {
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                }
                /** Update Password */
                API.UpdatePasswordUser(obj)
                    .then((findresponse) => {
                        Swal.fire("Password Updated Successfully!", "", "success");
                        history.push('/home');
                    }).catch({ status: 500, message: 'Internal Server Error' });
            } else {
                Swal.fire("Does not match new password && confirm password!", "", "warning");
            }
        }
    }

    render() {
        return (
            <div>
                <Header />
                {/** Update Password form */}
                <MDBContainer>
                    <MDBRow>
                        <h1 className="h4 text-center mb-4">UpdatePassword</h1>
                    </MDBRow>
                    <MDBRow>
                        <form>
                            <label
                                className="grey-text"
                            >
                                Your old password
                            </label>
                            <input
                                type="password"
                                name="oldPassword"
                                id="defaultFormRegisterPasswordEx2"
                                className="form-control"
                                value={this.state.oldPassword}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.oldPasswordError}
                            </div>
                            <label
                                className="grey-text"
                            >
                                Your new password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                id="defaultFormRegisterPasswordEx3"
                                className="form-control"
                                value={this.state.newPassword}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.newPasswordError}
                            </div>
                            <label
                                className="grey-text"
                            >
                                confirm password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="defaultFormRegisterPasswordEx3"
                                className="form-control"
                                value={this.state.confirmPassword}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.confirmPasswordError}
                            </div>
                            <div className="text-center mt-4">
                                <MDBBtn color="primary" onClick={this.UpdatePassword}>
                                    Update Password
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBRow>
                </MDBContainer>
                <Footer />
            </div>
        );
    }
}

export default UpdatePassword;
