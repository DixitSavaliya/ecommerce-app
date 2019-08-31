import React from 'react';
import API from '../../../service/homeservice';
import { config } from '../../../config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AllProduct extends React.Component {
    constructor(props) {
        console.log("props Home======", props);
        super(props);
        this.state = {
            productlist: [],
            images: []
        }
    }

    componentDidMount() {
        API.ProductList().
            then((findresponse) => {
                console.log("ProductList response===", findresponse);
                this.setState({ productlist: findresponse.data.data });
                console.log("all products=====", this.state.productlist);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;

        if (this.state.productlist) displayData = this.state.productlist.map(data =>
            <div className="single_product" data-aos="flip-left" data-aos-duration="1500">
                <div className="product_content">
                    <div className="product_image">
                        {(data.Images) ?
                            (<div>
                                {data.Images.containerName ? (<img src={config.baseMediaUrl + data.Images.containerName + data.Images.image} className="img-fluid" alt="product image" />) : (<img src={config.baseMediaUrl + data.Images.image} className="img-fluid" alt="product image" />)}
                            </div>) : ('')}

                        <div className="on_hover_btns">
                            <div className="d-flex flex-wrap align-content-center">
                                <div className="text-center p-2 m-auto">
                                    <Link to={`/singleproduct/${data._id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link>
                                    <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                                    <Link to="/wishlist"><i className="fa fa-heart" aria-hidden="true"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product_text">
                        <span className="product_type">{data.metaTagTitle}</span>
                        <p>{data.name}</p>
                        <ul>
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
            </div>
        );
    }
}

export default AllProduct;
