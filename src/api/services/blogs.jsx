import { BLOG_CREATE_URL, BLOG_DELETE_URL, BLOG_LIST_URL, BLOG_STATUS_CHANGE_URL } from "../constants";
import axiosInstance from "../api";
import { BLOG_DETAIL_URL } from "../constants";

// Function to create/update blog 
export const createBlog = (props) => onResponse =>{
        
    try {
        axiosInstance.post(BLOG_CREATE_URL, props)
            .then((response) => {                
                onResponse(response.data);
            })
            .catch((err) => {
                console.log(err)
                onResponse(err);
            });

    } catch (error) {        
        
    }
}

// Function to update blog status
export const blogStatusChange = (props) => onResponse =>{
        
    try {
        axiosInstance.post(BLOG_STATUS_CHANGE_URL, props)
            .then((response) => {                
                onResponse(response.data);
            })
            .catch((err) => {
                console.log(err)
                onResponse(err);
            });

    } catch (error) {        
        
    }
}

// Function to get blog detail
export const getBlogDetail = (props) => onResponse =>{
    
    try {
        let BASE_URL = BLOG_DETAIL_URL + "?";

        if(props?.id){
            BASE_URL += `id=${props?.id}`
        }
        axiosInstance.get(BASE_URL)
            .then((response) => {                
                onResponse(response.data);
            })
            .catch((err) => {
                console.log(err)
                onResponse(err);
            });

    } catch (error) {        
        
    }
}

// Function to get blogs 
export const getBlogs = (props) => onResponse =>{
        
    try {
        let BASE_URL = BLOG_LIST_URL + "?";

        if(props?.search){
            BASE_URL += `search=${props?.search}&`;
        }

        if(props?.page){
            BASE_URL = BASE_URL + `page=${props.page}&`
        }
       
        if(props?.limit){
            BASE_URL += `limit=${props?.limit}&`
        }
        if(props?.urls){
            BASE_URL += `urls=${props?.urls}`
        }
        axiosInstance.get(BASE_URL)
            .then((response) => {                
                onResponse(response.data);
            })
            .catch((err) => {
                console.log(err)
                onResponse(err);
            });

    } catch (error) {        
        
    }
}

// Function to delete blog 
export const deleteBlog = (props) => onResponse =>{
        
    try {
        axiosInstance.delete(BLOG_DELETE_URL, {data: props})
            .then((response) => {                
                onResponse(response.data);
            })
            .catch((err) => {
                console.log(err)
                onResponse(err);
            });

    } catch (error) {        
        
    }
}