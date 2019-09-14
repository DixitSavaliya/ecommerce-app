import React from 'react';
import Product from './product/product';
import AllProduct from './allproduct/allproduct';
import ThreeBox from './threebox/threebox';
import CategoryProduct from './categoryproduct/categoryproduct';
import Service from './service/service';
import Footer from './footer/footer';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                {/** Home-Page All Component */}
                <Product />
                <AllProduct />
                <ThreeBox />
                <CategoryProduct />
                <Service />
                <Footer />
            </div>
        );
    }
}

export default Home;
