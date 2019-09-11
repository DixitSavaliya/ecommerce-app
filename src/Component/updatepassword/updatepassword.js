import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import history from '../../history';
import Swal from 'sweetalert2';

class UpdatePassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            oldPasswordError: '',
            newPassword: '',
            newPasswordError: ''
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

        if (!this.state.oldPassword) {
            oldPasswordError = "please enter old password";
        }

        if (!this.state.newPassword) {
            newPasswordError = "please enter new password";
        }

        if (oldPasswordError || newPasswordError) {
            this.setState({oldPasswordError, newPasswordError });
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
                newPasswordError: ''
            })
        };

        if (this.state.oldPassword && this.state.newPassword) {
            const obj = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
            }
            API.UpdatePasswordUser(obj).
                then((findresponse) => {
                    console.log("response==", findresponse);
                    Swal.fire("Password Update Succesfully!", "", "success");
                    history.push('/home');
                }).catch({ status: 500, message: 'Internal Server Error' });
        }
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <form>
                            <p className="h4 text-center mb-4">UpdatePassword</p>
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
                            <div className="text-center mt-4">
                                <MDBBtn color="unique" onClick={this.UpdatePassword}>
                                    Update Password
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default UpdatePassword;
