import axios from 'axios';
import { config } from '../config';

export default {
    BannerList: () => {
        console.log("msg");
        return axios.get(config.baseApiUrl + "api/list/banner-list")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    ProductList: () => {
        console.log("msg");
        return axios.get(config.baseApiUrl + "api/product-store/featureproduct-list")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    Signup: (obj) => {
        return axios.post(config.baseApiUrl + "api/customer/register", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    Login: (obj) => {
        return axios.post(config.baseApiUrl + "api/customer/login", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    CategoryList: () => {
        return axios.get(config.baseApiUrl + "api/list/category-list")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    SubCategoryList: (data) => {
        return axios.get(config.baseApiUrl + "api/list/productlist", {
            params: {
                categoryId: data
            }
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    productDetail: (id) => {
        return axios.get(config.baseApiUrl + "api/product-store/productdetail/"+id)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    }
}