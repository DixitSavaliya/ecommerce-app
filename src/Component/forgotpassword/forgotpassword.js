import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import API from '../../service/homeservice';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Swal from 'sweetalert2';

class ForgotPassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            modal: false
        }
        this.forgotpassword = this.forgotpassword.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    /** first this method call when app run */
    componentDidMount() {
        this.toggle();
    }

    /** Model Open */
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** validation of forgotpassword */
    validate = () => {
        let emailError = "";

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.email)) {
            emailError = "invalid email";
        }

        if (emailError) {
            this.setState({ emailError });
            return false;
        }
        return true;
    };

    /** ForgotPassword function*/
    forgotpassword() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                email: '',
                emailError: ''
            })
        };
        if (this.state.email) {
            const obj = {
                emailId: this.state.email
            }
            console.log("obj==", obj);
            API.ForgotPassword(obj).
                then((findresponse) => {
                    console.log("response==", findresponse);
                    Swal.fire("Email sent Succesfully!", "", "success");
                    this.setState({ modal: false })
                }).catch({ status: 500, message: 'Internal Server Error' });
        }
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>ForgotPassword</MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <label className="grey-text">
                                    Enter Your email
                          </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.handleChangeEvent}
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.emailError}
                                </div>
                                <br />
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={this.forgotpassword} disabled={!this.state.email}>Send</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}

export default ForgotPassword;
