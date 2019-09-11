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
        return axios.get(config.baseApiUrl + "api/product-store/productdetail/" + id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addwishlist: (obj) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        console.log("id======================{}", obj);
        return axios.post(config.baseApiUrl + 'api/customer/add-product-to-wishlist', obj, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getWishList: () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.get(config.baseApiUrl + 'api/customer/wishlist-product-list', {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteWishList: (pid) => {
        console.log("id=====", pid);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.delete(config.baseApiUrl + 'api/customer/wishlist-product-delete/' + pid, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchList: (data) => {
        console.log("data===", data);
        return axios.get(config.baseApiUrl + 'api/list/productlist', {
            params: {
                keyword: data
            }
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getProfile: () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.get(config.baseApiUrl + 'api/customer/get-profile', {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    updateProfile: (obj) => {
        console.log("object======", obj);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.post(config.baseApiUrl + 'api/customer/edit-profile', obj, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getCountryList: () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.get(config.baseApiUrl + 'api/list/country-list', {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getZoneList: () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.get(config.baseApiUrl + 'api/list/zone-list', {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    checkoutListOrder: (obj) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.post(config.baseApiUrl + 'api/orders/customer-checkout', obj, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    ForgotPassword: (obj) => {
        return axios.post(config.baseApiUrl + 'api/customer/forgot-password', obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    UpdatePasswordUser: (obj) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.post(config.baseApiUrl + "api/customer/change-password", obj, {
            headers: headers
        })
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addAddress: (obj) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.post(config.baseApiUrl + 'api/address/add-address', obj, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAddress: (id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.get(config.baseApiUrl + 'api/address/get-address-list/' + id, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editAddress: (obj, id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.put(config.baseApiUrl + 'api/address/update-address/' + id, obj, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteAddress: (id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.delete(config.baseApiUrl + 'api/address/delete-address/' + id, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getOrderHistory: () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.get(config.baseApiUrl + 'api/orders/order-list', {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getOrderDetails: (obj) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.get(config.baseApiUrl + 'api/orders/order-detail?orderId='+obj, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    }

}