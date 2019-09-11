import axios from 'axios';
import NavigationService from './service/homeservice';
axios.interceptors.request.use((config) => {
   // Do something before request is sent
   // console.log('config in interseptor======================>', config.url);
   // const urlArray = config.url.split('/');
   // console.log("urlArray==============>", urlArray);
   // if (urlArray[urlArray.length - 1] === 'login' || urlArray[urlArray.length - 1] === 'signUp') {
   //     return config;
   // }
   //If the header does not contain the token and the url not public, redirect to login
   const token = localStorage.getItem('token')
   // console.log('curuuntuser---------------------------->', JSON.parse(curruntUser).token);
   console.log('token-=-=', token);
   // const token = JSON.parse(curruntUser).token;
   // if token is found add it to the header
   if (token) {
       if (config.method !== 'OPTIONS') {
           config.headers.Authorization = token;
       }
   }
   // console.log('config in interseptor====={{{}}}===========>', config)
   return config;
}, function (error) {
   // Do something with request error
   console.log('how are you error: ', error);
//    return promise.reject(error);
});
