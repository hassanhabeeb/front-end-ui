import {
    OUR_IMPACT_CREATE_UPDATE_URL,
    OUR_IMPACT_DELETE_URL,
    OUR_IMPACT_DETAIL_URL,
    OUR_IMPACT_LIST_URL,
    STEPS_CREATE_UPDATE_URL,
    STEPS_DELETE_URL,
    STEPS_DETAIL_URL,
    STEPS_LIST_URL,
    STATS_CREATE_UPDATE_URL,
    STATS_DELETE_URL,
    STATS_DETAIL_URL,
    STATS_LIST_URL,
    IMPLEMENTED_BY_CREATE_UPDATE_URL,
    IMPLEMENTED_BY_DELETE_URL,
    IMPLEMENTED_BY_DETAIL_URL,
    IMPLEMENTED_BY_LIST_URL,
    FUNDED_BY_CREATE_UPDATE_URL,
    FUNDED_BY_DELETE_URL,
    FUNDED_BY_DETAIL_URL,
    FUNDED_BY_LIST_URL,
    SUPPORTING_PARTNERS_CREATE_UPDATE_URL,
    SUPPORTING_PARTNERS_DELETE_URL,
    SUPPORTING_PARTNERS_DETAIL_URL,
    SUPPORTING_PARTNERS_LIST_URL
} from "../constants";
import axiosInstance from "../api";

/***************** Our Impact Function Start *****************/

// Function to create or update our impact
export const createOurImpact = (props) => onResponse =>{
    try {
        axiosInstance.post(OUR_IMPACT_CREATE_UPDATE_URL, props)
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

// Function to get our impact list
export const getOurImpactList = (props) => onResponse =>{
    try {
        axiosInstance.get(OUR_IMPACT_LIST_URL, { params: props })
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

// Function to get our impact detail
export const getOurImpactDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(OUR_IMPACT_DETAIL_URL, { params: props })
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

// Function to delete our impact
export const deleteOurImpact = (props) => onResponse =>{
    try {
        axiosInstance.delete(OUR_IMPACT_DELETE_URL, { data: props })
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
/***************** Our Impact Function End *****************/

/***************** Steps Function Start *****************/

// Function to create or update steps
export const createSteps = (props) => onResponse =>{
    try {
        axiosInstance.post(STEPS_CREATE_UPDATE_URL, props)
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

// Function to get steps list
export const getStepsList = (props) => onResponse =>{
    try {
        axiosInstance.get(STEPS_LIST_URL, { params: props })
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

// Function to get steps detail
export const getStepsDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(STEPS_DETAIL_URL, { params: props })
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

// Function to delete steps
export const deleteSteps = (props) => onResponse =>{
    try {
        axiosInstance.delete(STEPS_DELETE_URL, { data: props })
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
/***************** Steps Function End *****************/

/***************** Stats Function Start *****************/

// Function to create or update stats
export const createStats = (props) => onResponse =>{
    try {
        axiosInstance.post(STATS_CREATE_UPDATE_URL, props)
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

// Function to get stats list
export const getStatsList = (props) => onResponse =>{
    try {
        axiosInstance.get(STATS_LIST_URL, { params: props })
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

// Function to get stats detail
export const getStatsDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(STATS_DETAIL_URL, { params: props })
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

// Function to delete stats
export const deleteStats = (props) => onResponse =>{
    try {
        axiosInstance.delete(STATS_DELETE_URL, { data: props })
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
/***************** Stats Function End *****************/

/***************** Implemented By Function Start *****************/

// Function to create or update implementor
export const createImplementedBy = (props) => onResponse =>{
    try {
        axiosInstance.post(IMPLEMENTED_BY_CREATE_UPDATE_URL, props)
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

// Function to get implementor list
export const getImplementedByList = (props) => onResponse =>{
    try {
        axiosInstance.get(IMPLEMENTED_BY_LIST_URL, { params: props })
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

// Function to get implementor detail
export const getImplementedByDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(IMPLEMENTED_BY_DETAIL_URL, { params: props })
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

// Function to delete implementor
export const deleteImplementedBy = (props) => onResponse =>{
    try {
        axiosInstance.delete(IMPLEMENTED_BY_DELETE_URL, { data: props })
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
/***************** Implemented By Function End *****************/

/***************** Funded By Function Start *****************/

// Function to create or update funder
export const createFundedBy = (props) => onResponse =>{
    try {
        axiosInstance.post(FUNDED_BY_CREATE_UPDATE_URL, props)
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

// Function to get funder list
export const getFundedByList = (props) => onResponse =>{
    try {
        axiosInstance.get(FUNDED_BY_LIST_URL, { params: props })
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

// Function to get funder detail
export const getFundedByDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(FUNDED_BY_DETAIL_URL, { params: props })
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

// Function to delete funder
export const deleteFundedBy = (props) => onResponse =>{
    try {
        axiosInstance.delete(FUNDED_BY_DELETE_URL, { data: props })
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
/***************** Funded By Function End *****************/

/***************** Supporting Partners Function Start *****************/

// Function to create or update supporting partner
export const createSupportingPartner = (props) => onResponse =>{
    try {
        axiosInstance.post(SUPPORTING_PARTNERS_CREATE_UPDATE_URL, props)
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

// Function to get supporting partner list
export const getSupportingPartnerList = (props) => onResponse =>{
    try {
        axiosInstance.get(SUPPORTING_PARTNERS_LIST_URL, { params: props })
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

// Function to get supporting partner detail
export const getSupportingPartnerDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(SUPPORTING_PARTNERS_DETAIL_URL, { params: props })
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

// Function to delete supporting partner
export const deleteSupportingPartner = (props) => onResponse =>{
    try {
        axiosInstance.delete(SUPPORTING_PARTNERS_DELETE_URL, { data: props })
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
/***************** Supporting Partners Function End *****************/
