import {
    ENQUIRIES_DELETE_URL,
    ENQUIRIES_DETAIL_URL,
    ENQUIRIES_EXPORT_URL,
    ENQUIRIES_LIST_URL
} from "../constants";
import axiosInstance from "../api";

/***************** Enquiries Function Start *****************/

// Function to get enquiries list
export const getEnquiriesList = (props) => onResponse =>{
    try {
        let BASE_URL = ENQUIRIES_LIST_URL + "?";

        if (props?.search) {
            BASE_URL += `search=${props?.search}&`;
        }

        if (props?.page) {
            BASE_URL = BASE_URL + `page=${props.page}&`
        }

        if (props?.limit) {
            BASE_URL += `limit=${props?.limit}&`
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

// Function to get enquiry details
export const getEnquiryDetails = (props) => onResponse =>{
    try {
        axiosInstance.get(ENQUIRIES_DETAIL_URL, { params: props })
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

// Function to delete enquiry
export const deleteEnquiry = (props) => onResponse =>{
    try {
        axiosInstance.delete(ENQUIRIES_DELETE_URL, { data: props })
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

// Function to export enquiries to excel
export const exportEnquiries = () => onResponse =>{
    try {
        axiosInstance.get(ENQUIRIES_EXPORT_URL, { responseType: 'blob' })
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

/***************** Enquiries Function End *****************/
