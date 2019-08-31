import React from 'react';

class Blog extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <section className="blog_and_testimonial_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4">
                                <div className="testimonial_section">
                                    <h2>testimonial</h2>
                                    <div className="testimonial_slider">
                                        <div className="single_testimonial" data-aos="zoom-in" data-aos-duration="1500">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>
                                        </div>
                                        <div className="single_testimonial" data-aos="zoom-in" data-aos-duration="1500">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>
                                        </div>
                                        <div className="single_testimonial" data-aos="zoom-in" data-aos-duration="1500">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8">
                                <div className="blog_section">
                                    <h2>Our Blog</h2>
                                    <div className="blog_slider">
                                        <div className="single_blog" data-aos="zoom-in" data-aos-duration="1500">
                                            <div className="blog_image">
                                                <img src={require('../images/blog_1.jpg')} className="img-fluid" alt="blog image" />
                                            </div>
                                            <div className="blog_text">
                                                <h4>new brands arrivals</h4>
                                                <p>Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod</p>
                                                <hr />
                                                <a href="#">read more</a>
                                            </div>
                                        </div>
                                        <div className="single_blog" data-aos="zoom-in" data-aos-duration="1500">
                                            <div className="blog_image">
                                                <img src={require('../images/blog_2.jpg')} className="img-fluid" alt="blog image" />
                                            </div>
                                            <div className="blog_text">
                                                <h4>new brands arrivals</h4>
                                                <p>Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod</p>
                                                <hr />
                                                <a href="#">read more</a>
                                            </div>
                                        </div>
                                        <div className="single_blog" data-aos="zoom-in" data-aos-duration="1500">
                                            <div className="blog_image">
                                                <img src={require('../images/blog_1.jpg')} className="img-fluid" alt="blog image" />
                                            </div>
                                            <div className="blog_text">
                                                <h4>new brands arrivals</h4>
                                                <p>Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod</p>
                                                <hr />
                                                <a href="#">read more</a>
                                            </div>
                                        </div>
                                        <div className="single_blog" data-aos="zoom-in" data-aos-duration="1500">
                                            <div className="blog_image">
                                                <img src={require('../images/blog_2.jpg')} className="img-fluid" alt="blog image" />
                                            </div>
                                            <div className="blog_text">
                                                <h4>new brands arrivals</h4>
                                                <p>Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod</p>
                                                <hr />
                                                <a href="#">read more</a>
                                            </div>
                                        </div>
                                        <div className="single_blog" data-aos="zoom-in" data-aos-duration="1500">
                                            <div className="blog_image">
                                                <img src={require('../images/blog_1.jpg')} className="img-fluid" alt="blog image" />
                                            </div>
                                            <div className="blog_text">
                                                <h4>new brands arrivals</h4>
                                                <p>Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod</p>
                                                <hr />
                                                <a href="#">read more</a>
                                            </div>
                                        </div>
                                        <div className="single_blog" data-aos="zoom-in" data-aos-duration="1500">
                                            <div className="blog_image">
                                                <img src={require('../images/blog_2.jpg')} className="img-fluid" alt="blog image" />
                                            </div>
                                            <div className="blog_text">
                                                <h4>new brands arrivals</h4>
                                                <p>Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod</p>
                                                <hr />
                                                <a href="#">read more</a>
                                            </div>
                                        </div>
                                        <div className="single_blog" data-aos="zoom-in" data-aos-duration="1500">
                                            <div className="blog_image">
                                                <img src={require('../images/blog_1.jpg')} className="img-fluid" alt="blog image" />
                                            </div>
                                            <div className="blog_text">
                                                <h4>new brands arrivals</h4>
                                                <p>Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod</p>
                                                <hr />
                                                <a href="#">read more</a>
                                            </div>
                                        </div>
                                        <div className="single_blog" data-aos="zoom-in" data-aos-duration="1500">
                                            <div className="blog_image">
                                                <img src={require('../images/blog_2.jpg')} className="img-fluid" alt="blog image" />
                                            </div>
                                            <div className="blog_text">
                                                <h4>new brands arrivals</h4>
                                                <p>Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod</p>
                                                <hr />
                                                <a href="#">read more</a>
                                            </div>
                                        </div>
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

export default Blog;
