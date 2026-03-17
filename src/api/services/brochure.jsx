import {
    BROCHURE_CREATE_UPDATE_URL,
    BROCHURE_DELETE_URL,
    BROCHURE_DETAIL_URL,
    BROCHURE_DOWNLOAD_URL,
    BROCHURE_LIST_URL
} from "../constants";
import axiosInstance from "../api";

/***************** Brochure Function Start *****************/

// Function to create/update brochure
export const createBrochure = (props) => onResponse =>{
    try {
        axiosInstance.post(BROCHURE_CREATE_UPDATE_URL, props, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
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

// Function to get brochure list
export const getBrochureList = (props) => onResponse =>{
    try {
        axiosInstance.get(BROCHURE_LIST_URL, { params: props })
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

// Function to get brochure detail
export const getBrochureDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(BROCHURE_DETAIL_URL, { params: props })
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

// Function to delete brochure
export const deleteBrochure = (props) => onResponse =>{
    try {
        axiosInstance.delete(BROCHURE_DELETE_URL, { data: props })
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

// Function to download brochure
export const downloadBrochure = () => onResponse =>{
    try {
        axiosInstance.get(BROCHURE_DOWNLOAD_URL, { responseType: 'blob' })
            .then((response) => {
                onResponse(response);
            })
            .catch((err) => {
                console.log(err)
                onResponse(err);
            });
    } catch (error) {

    }
}

/***************** Brochure Function End *****************/
