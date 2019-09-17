import React from 'react';
import API from '../../../service/homeservice';
import { config } from '../../../config';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [],
            images: [],
            isFetching: true,
        }
    }

    /** Intailly call */
    componentDidMount() {
        /** Get bannerlist */
        API.BannerList().
            then((findresponse) => {
                this.state.isFetching = false;
                this.setState({ bannerList: findresponse.data.data });
                this.state.bannerList.map(data => {
                    this.setState({
                        images: [...this.state.images, config.baseMediaUrl + data.imagePath + data.image]
                    })
                })
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        if (this.state.images) displayData = this.state.images.map(data =>
            <div class="single_banner_slide">
                <div class="slider_parts">
                    <div class="box_one">
                        <img src={data} />
                    </div>
                    <a class="banner_view_all_btn" href="#">
                        <span>View all Products</span>
                    </a>
                </div>
            </div>
        )
        return (
            <div>
                <section class="banner_slider_section">
                    <div class="container-fluid">
                        <div class="banner_slider">
                            {displayData}
                        </div>
                    </div>
                </section>
                {/** Carousel */}
                {/* <Carousel>
                    {
                        this.state.images.map(data =>
                            <div>
                                <img src={data} />
                            </div>
                        )
                    }
                </Carousel> */}
            </div>
        );
    }
}

export default Product;
