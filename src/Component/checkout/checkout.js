import React from 'react';
import API from '../../service/homeservice';
import './checkout.css';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getProfileList: [],
            countryList: [],
            zoneList: [],
            firstName: '',
            firstNameError: '',
            lastName: '',
            lastNameError: '',
            email: '',
            emailError: '',
            mobileNumber: '',
            mobileNumberError: '',
            address_1: '',
            address_1Error: '',
            address_2: '',
            city: '',
            cityError: '',
            zone: '',
            zoneError: '',
            pincode: '',
            pincodeError: '',
            country: '',
            countryError: ''

        }
        this.productDetails = this.props.location.state.name;
        console.log("data", this.productDetails);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.Checkout = this.Checkout.bind(this);
    }

    componentDidMount() {

        /** Get Countrylist */
        API.getCountryList().
            then((findresponse) => {
                // console.log("getCountryList response===", findresponse);
                this.setState({ countryList: findresponse.data.data })
                console.log("countryList==", this.state.countryList);

            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );

        /** Get Zonelist */
        API.getZoneList().
            then((findresponse) => {
                console.log("getZoneList response===", findresponse);
                this.setState({ zoneList: findresponse.data.data })
                console.log("data==", this.state.zoneList);

            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );

        /** Get Profile */
        API.getProfile().
            then((findresponse) => {
                // console.log("getProfile response===", findresponse);
                this.setState({ getProfileList: findresponse.data.data })
                console.log("data==", this.state.getProfileList);
                this.setState({
                    firstName: this.state.getProfileList.firstName,
                    email: this.state.getProfileList.email,
                    mobileNumber: this.state.getProfileList.mobileNumber
                });
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    validate = () => {
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let mobileNumberError = '';
        let address_1Error = '';
        let cityError = '';
        let zoneError = '';
        let pincodeError = '';
        let countryError = '';

        if (!this.state.firstName) {
            firstNameError = "please enter firstName name";
        }

        if (!this.state.lastName) {
            lastNameError = "please enter lastNameError name";
        }

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.email)) {
            emailError = "invalid email";
        }

        if (!this.state.mobileNumber) {
            mobileNumberError = "please enter phone number";
        }

        if (!this.state.address_1) {
            address_1Error = "please enter address";
        }

        if (!this.state.city) {
            cityError = "please enter  city";
        }

        if (!this.state.pincode) {
            pincodeError = "please enter pincode";
        }

        if (!this.state.zone) {
            zoneError = "please select state";
        }

        if (!this.state.country) {
            countryError = "please select country";
        }

        if (firstNameError || lastNameError || emailError || mobileNumberError || address_1Error || cityError || pincodeError || zoneError || countryError) {
            this.setState({ firstNameError, lastNameError, emailError, mobileNumberError, address_1Error, cityError, pincodeError, zoneError, countryError });
            return false;
        }
        return true;
    };

    handleChangeName(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleChange(event) {
        this.setState({ zone: event.target.value })
    }

    handleChangeCountry(event) {
        this.setState({ country: event.target.value })
    }

    Checkout() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                firstName: '',
                firstNameError: '',
                lastName: '',
                lastNameError: '',
                email: '',
                emailError: '',
                mobileNumber: '',
                mobileNumberError: '',
                address_1: '',
                address_1Error: '',
                address_2: '',
                city: '',
                cityError: '',
                zone: '',
                zoneError: '',
                pincode: '',
                pincodeError: '',
                country: '',
                countryError: ''
            })
        };

        if (this.state.firstName && this.state.lastName && this.state.email && this.state.mobileNumber && this.state.address_1 && this.state.city && this.state.zone && this.state.pincode && this.state.country) {
            const obj = {
                productDetails: this.productDetails,
                shippingFirstName: this.state.firstName,
                emailId: this.state.email,
                phoneNumber: this.state.mobileNumber,
                shippingLastName: this.state.lastName,
                shippingAddress_1: this.state.address_1,
                shippingAddress_2: this.state.address_2,
                shippingCity: this.state.city,
                shippingZone: this.state.zone,
                shippingPostCode: this.state.pincode,
                shippingCountry: this.state.country
            }
            API.checkoutListOrder(obj).
                then((findresponse) => {
                    console.log("checkoutListOrder response===", findresponse);
                    window.location.href = '/home';
                }).catch(
                    { status: 500, message: 'Internal Server Error' }
                );
        }
    }

    render() {
        return (
            <div>
                <form className="center">
                    First name:<br />
                    <input type="text" name="firstName" value={this.state.firstName}
                        onChange={this.handleChangeName} />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.firstNameError}
                    </div>
                    <br />
                    Last name:<br />
                    <input type="text" name="lastName" value={this.state.lastName}
                        onChange={this.handleChangeName} />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.lastNameError}
                    </div>
                    <br />
                    Address_1:<br />
                    <textarea rows="4" cols="50" name="address_1" value={this.state.address_1} onChange={this.handleChangeName}>

                    </textarea>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.address_1Error}
                    </div>
                    <br />
                    Address_2:<br />
                    <textarea rows="4" cols="50" name="address_2" value={this.state.address_2} onChange={this.handleChangeName}>

                    </textarea>
                    <br />
                    Country:<br />
                    <select name="shippingCountry" onChange={this.handleChangeCountry}>
                        {this.state.countryList.map((e, key) => {
                            return <option key={key} value={e.countryId}>{e.name}</option>;
                        })}
                    </select>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.countryError}
                    </div>
                    <br />
                    Phone Number:<br />
                    <input type="text" name="phoneNumber" value={this.state.mobileNumber}
                        onChange={this.handleChangeName} />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.mobileNumberError}
                    </div>
                    <br />
                    Email:<br />
                    <input type="text" name="emailId" value={this.state.email}
                        onChange={this.handleChangeName} />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
                    </div>

                    <br />
                    City:<br />
                    <input type="text" name="city" value={this.state.city}
                        onChange={this.handleChangeName} />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.cityError}
                    </div>
                    <br />
                    Zone:<br />
                    <select name="shippingZone" onChange={this.handleChange}>
                        {this.state.zoneList.map((e, key) => {
                            return <option key={key} value={e.zoneId}>{e.name}</option>;
                        })}
                    </select>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.zoneError}
                    </div>
                    <br />
                    PinCode:<br />
                    <input type="text" name="pincode" value={this.state.pincode}
                        onChange={this.handleChangeName} />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.pincodeError}
                    </div>
                    <br />
                    <button type="button" onClick={this.Checkout} >Submit</button>
                </form>
            </div>
        );
    }
}

export default Checkout;
