import {
    FOOTER_CREATE_UPDATE_URL,
    FOOTER_DELETE_URL,
    FOOTER_DETAIL_URL,
    FOOTER_LIST_URL
} from "../constants";
import axiosInstance from "../api";

/***************** Footer Function Start *****************/

// Function to create/update footer
export const createFooter = (props) => onResponse => {
    try {
        axiosInstance.post(FOOTER_CREATE_UPDATE_URL, props)
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

// Function to get footer list
export const getFooterList = (props) => onResponse => {
    try {
        axiosInstance.get(FOOTER_LIST_URL, { params: props })
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

// Function to get footer detail
export const getFooterDetail = (props) => onResponse => {
    try {
        axiosInstance.get(FOOTER_DETAIL_URL, { params: props })
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

// Function to delete footer
export const deleteFooter = (props) => onResponse => {
    try {
        axiosInstance.delete(FOOTER_DELETE_URL, { data: props })
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

/***************** Footer Function End *****************/
