import React from 'react';
import Header from './header/header';
import Product from './product/product';
import AllProduct from './allproduct/allproduct';
import ThreeBox from './threebox/threebox';
import CategoryProduct from './categoryproduct/categoryproduct';
import Blog from './blog/blog';
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
                <Header />
                <Product />
                <AllProduct />
                <ThreeBox />
                <CategoryProduct />
                <Blog />
                <Service />
                <Footer />
            </div>
        );
    }
}

export default Home;
