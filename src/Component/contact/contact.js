import React from 'react';
import API from '../../service/homeservice';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Header from '../../Component/home/header/header';
import Footer from '../../Component/home/footer/footer';
import Swal from 'sweetalert2';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameError: '',
            phoneNumber: '',
            phoneNumberError: '',
            phoneNumberErrors: '',
            email: '',
            emailError: '',
            message: '',
            messageError: ''
        }
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.contact = this.contact.bind(this);
    }

    /** Validation */
    validate = () => {
        let nameError = "";
        let messageError = "";
        let emailError = "";
        let phoneNumberError = "";

        if (!this.state.name) {
            nameError = "please enter  name";
        }

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.email)) {
            emailError = "invalid email";
        }

        if (!this.state.message) {
            messageError = "please enter  message";
        }

        const phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phone.test(this.state.phoneNumber)) {
            phoneNumberError = "please enter valid number";
        }

        if (nameError || emailError || messageError || phoneNumberError) {
            this.setState({ nameError, emailError, messageError, phoneNumberError });
            return false;
        }

        return true;
    };


    /** 
     * @param {JSON} event
     * handleChangeEvent
     */
    handleChangeEvent(event) {
        console.log("event=", event);
        event.preventDefault();
        const state = this.state
        console.log("state==", state);
        state[event.target.name] = event.target.value;
        console.log("state==", state);
        this.setState(state);
    }

    /** Contact form functionality */
    contact() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                name: '',
                nameError: '',
                phoneNumber: '',
                phoneNumberError: '',
                email: '',
                emailError: '',
                message: '',
                messageError: '',
                isButtonDisabled: false
            })
        };

        if (this.state.name && this.state.email && this.state.phoneNumber && this.state.message && this.state.phoneNumber.length == 10 && !this.state.emailError && !this.state.messageError && !this.state.nameError) {
            this.setState({ isButtonDisabled: true })
            const obj = {
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                message: this.state.message
            }
            /** Contact Us */
            API.contactUs(obj).
                then((findresponse) => {
                    console.log("response==", findresponse);
                    Swal.fire("Mail sent successfully", "", "success");
                }).catch({ status: 500, message: 'Internal Server Error' });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <MDBContainer>
                    <MDBRow>
                        <h1 className="h4 text-center mb-4">Contact-Us</h1>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <label className="grey-text">
                                    Your Name:
                                </label>
                                <input
                                    type="text"
                                    name="address_1"
                                    value={this.state.name}
                                    onChange={this.handleChangeEvent}
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.nameError}
                                </div>
                                <br />
                                <label className="grey-text">
                                    Phonenumber:
                                </label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.handleChangeEvent}
                                    minlength="10"
                                    maxlength="10"
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.phoneNumberError}
                                </div>
                                <br />

                            </form>
                        </MDBCol>
                        <MDBCol md="6">
                            <form>
                                <label className="grey-text">
                                    Your Email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChangeEvent}
                                    className="form-control"
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.emailError}
                                </div>
                                <br />
                                <label className="grey-text">
                                    Message:
                                </label>
                                <textarea type="text" id="message" name="message" value={this.state.message}
                                    onChange={this.handleChangeEvent} rows="2" class="form-control md-textarea"></textarea>
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.messageError}
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                    <div className="text-center mt-4">
                        <MDBBtn color="primary" onClick={this.contact} disabled={this.state.isButtonDisabled} >
                            Submit
                         </MDBBtn>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default Contact;
