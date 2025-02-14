import axios from "axios";
import React from 'react'

const axiosInstance =axios.create({
    baseURL:'https://planetapi.akshtest.xyz/api/v1',
    headers:{
        'Content-Type':
        'application/json'
    }
})

axiosInstance.interceptors.request.use(
    config=>{
        const token= localStorage.getItem('token');
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    error =>{
return Promise.reject(error)
    }
)
export default axiosInstance;