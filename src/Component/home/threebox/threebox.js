import React from 'react';

class ThreeBox extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <section className="three_box_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 m-auto">
                                <div className="box_content type_one" data-aos="fade-up" data-aos-duration="1500">
                                    <img src={require('../images/image_box_1.png')} alt="box images" />
                                    <div className="box_content_text float-right">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                        <button className="btn btn-blue">
                                            <span>view all</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 m-auto">
                                <div className="box_content type_two" data-aos="fade-up" data-aos-duration="1500">
                                    <img src={require('../images/image_box_2.png')} alt="box images" />
                                    <div className="box_content_text float-left">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                        <button className="btn">
                                            <span>view all</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 m-auto">
                                <div className="box_content type_one" data-aos="fade-up" data-aos-duration="1500">
                                    <img src={require('../images/image_box_3.png')} alt="box images" />
                                    <div className="box_content_text float-right">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                        <button className="btn btn-blue">
                                            <span>view all</span>
                                        </button>
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

export default ThreeBox;
