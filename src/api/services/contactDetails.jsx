import {
    CONTACT_DETAILS_CREATE_UPDATE_URL,
    CONTACT_DETAILS_DELETE_URL,
    CONTACT_DETAILS_DETAIL_URL,
    CONTACT_DETAILS_LIST_URL
} from "../constants";
import axiosInstance from "../api";

/***************** Contact Details Function Start *****************/

// Function to create/update contact details
export const createContactDetails = (props) => onResponse =>{
    try {
        axiosInstance.post(CONTACT_DETAILS_CREATE_UPDATE_URL, props)
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

// Function to get contact details list
export const getContactDetailsList = (props) => onResponse =>{
    try {
        axiosInstance.get(CONTACT_DETAILS_LIST_URL, { params: props })
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

// Function to get contact details detail
export const getContactDetailsDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(CONTACT_DETAILS_DETAIL_URL, { params: props })
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

// Function to delete contact details
export const deleteContactDetails = (props) => onResponse =>{
    try {
        axiosInstance.delete(CONTACT_DETAILS_DELETE_URL, { data: props })
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

/***************** Contact Details Function End *****************/
