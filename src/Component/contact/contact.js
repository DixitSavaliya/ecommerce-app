import React from 'react';
import API from '../../service/homeservice';
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
            phoneNumberErrors:'',
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
        console.log("event=",event);
        event.preventDefault();
        const state = this.state
        console.log("state==",state);
        state[event.target.name] = event.target.value;
        console.log("state==",state);
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
            this.setState({isButtonDisabled:true})
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
                <Header/>
                {/** Contact Us Form */}
                <section class="mb-4">
                    <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
                    <div class="row">
                        <div class="col-md-9 mb-md-0 mb-5">
                            <form id="contact-form" name="contact-form" method="POST">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="md-form mb-0">
                                            <input type="text" id="name" name="name" value={this.state.name}
                                                onChange={this.handleChangeEvent} class="form-control" placeholder="Your Name" />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.nameError}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="md-form mb-0">
                                            <input type="email" id="email" name="email" value={this.state.email}
                                                onChange={this.handleChangeEvent} class="form-control" placeholder="Your email" />
                                        
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.emailError}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="md-form mb-0">
                                            <input type="number" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber}
                                                onChange={this.handleChangeEvent}  minlength="10" maxlength="10" class="form-control"  placeholder="Your Phonenumber" />
                                         
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.phoneNumberError}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="md-form">
                                            <textarea type="text" id="message" name="message" value={this.state.message}
                                                onChange={this.handleChangeEvent} rows="2" class="form-control md-textarea" placeholder="message"></textarea>
                                         
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.messageError}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="text-center text-md-left">
                                <a class="btn btn-primary" onClick={this.contact} disabled={this.state.isButtonDisabled}>Send</a>
                            </div>
                            <div class="status"></div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        );
    }
}

export default Contact;
