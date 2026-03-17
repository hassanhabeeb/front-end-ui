import { CREATE_OR_UPDATE_SEO, DELETE_SEO, DETAIL_SEO, LIST_SEO, SEO_STATUS_CHANGE } from "../constants";
import axiosInstance from "../api";

// Function to create/update seo
export const createOrUpdateSeo = (props) => onResponse => {
    try {
        axiosInstance.post(CREATE_OR_UPDATE_SEO, props)
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

// Function to delete seo
export const deleteSeo = (props) => onResponse => {
    try {
        axiosInstance.delete(DELETE_SEO, { data: props })
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

// Function to get seo detail
export const getSeoDetail = (props) => onResponse => {
    try {
        let BASE_URL = DETAIL_SEO + "?";

        if (props?.id) {
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

// Function to get seo list
export const getSeoList = (props) => onResponse => {
    try {
        let BASE_URL = LIST_SEO + "?";

        if (props?.search) {
            BASE_URL += `search=${props?.search}&`;
        }

        if (props?.page) {
            BASE_URL = BASE_URL + `page=${props.page}&`
        }

        if (props?.limit) {
            BASE_URL += `limit=${props?.limit}&`
        }

        if (props?.page_name) {
             BASE_URL += `page_name=${props?.page_name}&`
        }

         if (props?.slug) {
             BASE_URL += `slug=${props?.slug}`
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

// Function to active/inactive seo
export const activeInactiveSeo = (props) => onResponse => {
    try {
        axiosInstance.put(SEO_STATUS_CHANGE, props)
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
