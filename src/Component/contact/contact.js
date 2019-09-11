import React from 'react';
import API from '../../service/homeservice';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            email: '',
            message: ''
        }
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.contact = this.contact.bind(this);
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

    /** Contact form functionality */
    contact() {
        const obj = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            message: this.state.message
        }
        API.contactUs(obj).
            then((findresponse) => {
                console.log("response==", findresponse);
            }).catch({ status: 500, message: 'Internal Server Error' });
    }


    render() {
        return (
            <div>
                <section class="mb-4">
                    <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
                    <div class="row">
                        <div class="col-md-9 mb-md-0 mb-5">
                            <form id="contact-form" name="contact-form" method="POST">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="md-form mb-0">
                                            <input type="text" name="name" value={this.state.name}
                                                onChange={this.handleChangeEvent} class="form-control" />
                                            <label for="name">Your name</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="md-form mb-0">
                                            <input type="email" name="email" value={this.state.email}
                                                onChange={this.handleChangeEvent} class="form-control" />
                                            <label for="email">Your email</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="md-form mb-0">
                                            <input type="text" name="phoneNumber" value={this.state.phoneNumber}
                                                onChange={this.handleChangeEvent} class="form-control" />
                                            <label for="phoneNumber">phoneNumber</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="md-form">
                                            <textarea type="text" name="message" value={this.state.message}
                                                onChange={this.handleChangeEvent} rows="2" class="form-control md-textarea"></textarea>
                                            <label for="message">Your message</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="text-center text-md-left">
                                <a class="btn btn-primary" onClick={this.contact}>Send</a>
                            </div>
                            <div class="status"></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Contact;
