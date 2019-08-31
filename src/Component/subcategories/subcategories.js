import React from 'react';
import API from '../../service/homeservice';
import { config } from '../../config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SubCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SubCategoryList: []
        }
    }

    componentDidMount() {
        console.log("query=", this.props.location.pathname.split('/')[2]);
        const query = this.props.location.pathname.split('/')[2];
        API.SubCategoryList(query).
            then((findresponse) => {
                console.log("SubCategoryList response===", findresponse);
                this.setState({ SubCategoryList: findresponse.data.data.productList })
                console.log("SubCategoryList response===", this.state.SubCategoryList);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let displayData;

        if (this.state.SubCategoryList) displayData = this.state.SubCategoryList.map(data =>
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
                                    <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                                    <Link to="/wishlist"><i className="fa fa-heart" aria-hidden="true"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product_text">
                        <span className="product_type">{data.metaTagTitle}</span>
                        <p>{data.name}</p>
                        <p><i class="fas fa-rupee-sign"></i> <span className="procuct_price">{data.price}</span></p>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                <section className="product_section">
                    <div className="container">
                        <div>
                            {displayData}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SubCategories;
