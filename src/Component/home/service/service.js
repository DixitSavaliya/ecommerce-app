import React from 'react';

class Service extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <section className="our_services_section">
                    <div className="container">
                        <div className="row m-0">
                            <div className="col-md-4" data-aos="zoom-in" data-aos-duration="1500">
                                <div className="service_content">
                                    <div className="icon">
                                    <img src={require("../iconSVG/box1.png")} className="image" alt="My Awesome" />
                                    </div>
                                    <div className="text-white">
                                        <h3>Free Worldwide Delivery</h3>
                                        <p>Lorem Ipsum Dolor Sit Amet</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4" data-aos="zoom-in" data-aos-duration="1500">
                                <div className="service_content">
                                    <div className="icon">
                                    <img src={require("../iconSVG/back1.png")} className="image" alt="My Awesome" />
                                    </div>
                                    <div className="text-white">
                                        <h3>Money back Guarantee</h3>
                                        <p>Lorem Ipsum Dolor Sit Amet</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4" data-aos="zoom-in" data-aos-duration="1500">
                                <div className="service_content">
                                    <div className="icon">
                                    <img src={require("../iconSVG/call1.png")} className="image" alt="My Awesome"/>
                                    </div>
                                    <div className="text-white">
                                        <h3>24/7 Customer Support</h3>
                                        <p>Lorem Ipsum Dolor Sit Amet</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Service;
