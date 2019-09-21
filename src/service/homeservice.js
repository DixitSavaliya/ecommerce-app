import axios from 'axios';
import { config } from '../config';

export default {

    /** Display Slider */
    BannerList: () => {
        console.log("msg");
        return axios.get(config.baseApiUrl + "api/list/banner-list")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** Display featureproduct */
    ProductList: () => {
        console.log("msg");
        return axios.get(config.baseApiUrl + "api/product-store/featureproduct-list")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
    * @param {string} obj
    * Signup
    */
    Signup: (obj) => {
        return axios.post(config.baseApiUrl + "api/customer/register", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

   /** 
   * @param {string} obj
   * Login
   */
    Login: (obj) => {
        return axios.post(config.baseApiUrl + "api/customer/login", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** CategoryList */
    CategoryList: () => {
        return axios.get(config.baseApiUrl + "api/list/category-list")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

   /** 
   * @param {string} data
   * SubCategoryList
   */
    SubCategoryList: (data) => {
        return axios.get(config.baseApiUrl + "api/list/productlist", {
            params: {
                categoryId: data
            }
        })
            .then(response => {
                // console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
    * @param {string} id
    * productDetail
    */
    productDetail: (id) => {
        return axios.get(config.baseApiUrl + "api/product-store/productdetail/" + id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
    * @param {string} obj
    * add product in wishlist
    */
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

    /** Get product wishlist */
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

    /** 
    * @param {string} pid
    * delete product in wishlist
    */
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

    /** 
    * @param {string} data
    * search product
    */
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

    /** Get Profile */
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

    /** 
    * @param {string} obj
    * Update Profile
    */
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

    /** Get Countrylist */
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

    /** Get Zonelist */
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

    /** 
     * @param {string} obj
     * Procced to checkout
     */
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

    /** 
    * @param {string} obj
    * ForgotPassword
    */
    ForgotPassword: (obj) => {
        console.log("object email=====", obj);
        return axios.post(config.baseApiUrl + 'api/customer/forgot-password', obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
    * @param {string} obj
    * UpdatePasswordUser
    */
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

    /** 
    * @param {string} obj
    * Add address
    */
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

    /** 
    * @param {string} id
    * get address
    */
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


    /** 
    * @param {string} id
    * @param {string} obj
    * editAddress 
    */
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


    /** 
    * @param {string} id
    * delete address
    */
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

    /** Get orderhistory */
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

    /** 
    * @param {string} obj
    * get order details
    */
    getOrderDetails: (obj) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        return axios.get(config.baseApiUrl + 'api/orders/order-detail?orderId=' + obj, {
            headers: headers
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
    * @param {string} obj
    * contactUs details
    */
    contactUs: (obj) => {
        return axios.post(config.baseApiUrl + 'api/list/contact-us', obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
    * @param {string} productId
    * relatedProduct details
    */
    relatedProduct: (productId) => {
        return axios.get(config.baseApiUrl + "api/list/related-product-list", {
            params: {
                productId: productId
            }
        })
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    }
}
