import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './singleproduct.css';

class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetailList: [],
            images: [],
            isFetching: true
        }
    }

    componentDidMount() {
        console.log("query=", this.props.location.pathname.split('/')[2]);
        const query = this.props.location.pathname.split('/')[2];
        API.productDetail(query).
            then((findresponse) => {
                this.state.isFetching = false;
                console.log("productDetail response===", findresponse);
                this.setState({ productDetailList: findresponse.data.data });
                console.log("productDetailList", this.state.productDetailList);
                this.state.productDetailList.map(data =>
                    data.productImage ? (
                        data.productImage.map(list =>
                            list.containerName ? (this.setState({
                                images: [...this.state.images, config.baseMediaUrl + list.containerName + list.image]
                            })) : ('')

                        )
                    ) : (null)
                )
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;
        console.log("path images===", this.state.images);

        if (this.state.productDetailList) displayData = this.state.productDetailList.map(data =>
            <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                <div className="product_content">
                    <div className="product_text">
                        <span className="product_type">{data.metaTagTitle}</span>
                        <p>{data.name}</p>
                        <ul className="ratings">
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li className="fill"><i className="fa fa-star" aria-hidden="true"></i></li>
                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        </ul>
                        <p><i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="4">
                            <Carousel>
                                {
                                    this.state.images.map(data =>
                                        <div className="slider_img">
                                            <img src={data} />
                                        </div>
                                    )
                                }
                            </Carousel>

                        </MDBCol>
                        <MDBCol md="8">
                            <section className="product_section">
                                <div className="container">
                                    <div className="section_title">
                                        <h3>New Products</h3>
                                    </div>
                                    <div className="product_slider">
                                        {displayData}
                                    </div>
                                </div>
                            </section>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        );
    }
}

export default SingleProduct;
