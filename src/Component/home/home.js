import React from 'react';
import Product from './product/product';
import AllProduct from './allproduct/allproduct';
import ThreeBox from './threebox/threebox';
import CategoryProduct from './categoryproduct/categoryproduct';
import Service from './service/service';
import Footer from './footer/footer';
import Header from './header/header';
import Blog from './blog/blog';

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
                <Blog/>
                <Service />
                <Footer />
            </div>
        );
    }
}


export default Home;
