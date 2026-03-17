import { ABOUT_US_BANNER_CREATE_URL, ABOUT_US_BANNER_DELETE_URL, ABOUT_US_BANNER_DETAIL_URL, ABOUT_US_BANNER_LIST_URL, FACTS_AND_FIGURES_CREATE_URL, FACTS_AND_FIGURES_DELETE_URL, FACTS_AND_FIGURES_DETAIL_URL, FACTS_AND_FIGURES_LIST_URL, FACTS_AND_FIGURES_STATUS_CHANGE_URL, KEY_HEALTH_PRIORITIES_CREATE_UPDATE_URL,
    KEY_HEALTH_PRIORITIES_DELETE_URL,
    KEY_HEALTH_PRIORITIES_DETAIL_URL,
    KEY_HEALTH_PRIORITIES_LIST_URL,
    OUR_APPROACH_CREATE_UPDATE_URL,
    OUR_APPROACH_DELETE_URL,
    OUR_APPROACH_DETAIL_URL,
    OUR_APPROACH_LIST_URL,
    AIMS_TO_ACHIEVE_CREATE_UPDATE_URL,
    AIMS_TO_ACHIEVE_DELETE_URL,
    AIMS_TO_ACHIEVE_DETAIL_URL,
    AIMS_TO_ACHIEVE_LIST_URL, AIMS_TO_ACHIEVE_STATUS_CHANGE_URL, OUR_ANSWER_CREATE_UPDATE_URL, OUR_ANSWER_DELETE_URL, OUR_ANSWER_DETAIL_URL, OUR_ANSWER_LIST_URL, OUR_ANSWER_STATUS_CHANGE_URL, WHY_AYA_MATTERS_CREATE_URL, WHY_AYA_MATTERS_DELETE_URL, WHY_AYA_MATTERS_DETAIL_URL, WHY_AYA_MATTERS_LIST_URL, WHY_AYA_MATTERS_STATUS_CHANGE_URL, OUR_APPROACH_STATUS_CHANGE_URL } from "../constants";
import axiosInstance from "../api";

/***************** About Us Banner Function Start *****************/

// Function to create/update about us banner
export const createAboutUsBanner = (props) => onResponse =>{
    try {
        axiosInstance.post(ABOUT_US_BANNER_CREATE_URL, props)
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

// Function to get about us banner detail
export const getAboutUsBannerDetail = (props) => onResponse =>{
    try {
        let BASE_URL = ABOUT_US_BANNER_DETAIL_URL + "?";

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

// Function to get about us banner list
export const getAboutUsBannerList = (props) => onResponse =>{
    try {
        let BASE_URL = ABOUT_US_BANNER_LIST_URL + "?";

        if(props?.search){
            BASE_URL += `search=${props?.search}&`;
        }

        if(props?.page){
            BASE_URL = BASE_URL + `page=${props.page}&`
        }

        if(props?.limit){
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

// Function to delete about us banner
export const deleteAboutUsBanner = (props) => onResponse =>{
    try {
        axiosInstance.delete(ABOUT_US_BANNER_DELETE_URL, { data: props })
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
/***************** About Us Banner Function End *****************/

/***************** Facts and Figures Function Start *****************/

// Function to create/update facts and figures
export const createFactsAndFigures = (props) => onResponse =>{
    try {
        axiosInstance.post(FACTS_AND_FIGURES_CREATE_URL, props)
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

// Function to get facts and figures detail
export const getFactsAndFiguresDetail = (props) => onResponse =>{
    try {
        let BASE_URL = FACTS_AND_FIGURES_DETAIL_URL + "?";

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

// Function to get facts and figures list
export const getFactsAndFiguresList = (props) => onResponse =>{
    try {
        let BASE_URL = FACTS_AND_FIGURES_LIST_URL + "?";

        if(props?.search){
            BASE_URL += `search=${props?.search}&`;
        }

        if(props?.page){
            BASE_URL = BASE_URL + `page=${props.page}&`
        }

        if(props?.limit){
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

// Function to delete facts and figures
export const deleteFactsAndFigures = (props) => onResponse =>{
    try {
        axiosInstance.delete(FACTS_AND_FIGURES_DELETE_URL, { data: props })
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
// Function to update facts and figures status
export const factsAndFiguresStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(FACTS_AND_FIGURES_STATUS_CHANGE_URL, props)
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

/***************** Facts and Figures Function End *****************/

/***************** Why AYA Matters Function Start *****************/

// Function to create/update why aya matters
export const createWhyAyaMatters = (props) => onResponse =>{
    try {
        axiosInstance.post(WHY_AYA_MATTERS_CREATE_URL, props)
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

// Function to get why aya matters detail
export const getWhyAyaMattersDetail = (props) => onResponse =>{
    try {
        let BASE_URL = WHY_AYA_MATTERS_DETAIL_URL + "?";

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

// Function to get why aya matters list
export const getWhyAyaMattersList = (props) => onResponse =>{
    try {
        let BASE_URL = WHY_AYA_MATTERS_LIST_URL + "?";

        if(props?.search){
            BASE_URL += `search=${props?.search}&`;
        }

        if(props?.page){
            BASE_URL = BASE_URL + `page=${props.page}&`
        }

        if(props?.limit){
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

// Function to delete why aya matters
export const deleteWhyAyaMatters = (props) => onResponse =>{
    try {
        axiosInstance.delete(WHY_AYA_MATTERS_DELETE_URL, { data: props })
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
// Function to update why aya matters status
export const whyAyaMattersStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(WHY_AYA_MATTERS_STATUS_CHANGE_URL, props)
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

/***************** Why AYA Matters Function End *****************/

/***************** Our Answer Function Start *****************/

// Function to create/update our answer
export const createOurAnswer = (props) => onResponse =>{
    try {
        axiosInstance.post(OUR_ANSWER_CREATE_UPDATE_URL, props)
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

// Function to get our answer list
export const getOurAnswerList = (props) => onResponse =>{
    try {
        axiosInstance.get(OUR_ANSWER_LIST_URL, { params: props })
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

// Function to get our answer details
export const getOurAnswerDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(OUR_ANSWER_DETAIL_URL, { params: props })
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

// Function to delete our answer
export const deleteOurAnswer = (props) => onResponse =>{
    try {
        axiosInstance.delete(OUR_ANSWER_DELETE_URL, { data: props })
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
// Function to update our answer status
export const ourAnswerStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(OUR_ANSWER_STATUS_CHANGE_URL, props)
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

/***************** Our Answer Function End *****************/

/***************** Our Approach Function Start *****************/

// Function to create or update our approach
export const createOurApproach = (props) => onResponse =>{
    try {
        axiosInstance.post(OUR_APPROACH_CREATE_UPDATE_URL, props)
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

// Function to get our approach list
export const getOurApproachList = (props) => onResponse =>{
    try {
        axiosInstance.get(OUR_APPROACH_LIST_URL, { params: props })
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

// Function to get our approach detail
export const getOurApproachDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(OUR_APPROACH_DETAIL_URL, { params: props })
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

// Function to delete our approach
export const deleteOurApproach = (props) => onResponse =>{
    try {
        axiosInstance.delete(OUR_APPROACH_DELETE_URL, { data: props })
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
// Function to update our approach status
export const ourApproachStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(OUR_APPROACH_STATUS_CHANGE_URL, props)
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

/***************** Our Approach Function End *****************/

/***************** Aims To Achieve Function Start *****************/

// Function to create or update aims to achieve
export const createAimsToAchieve = (props) => onResponse =>{
    try {
        axiosInstance.post(AIMS_TO_ACHIEVE_CREATE_UPDATE_URL, props)
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

// Function to get aims to achieve list
export const getAimsToAchieveList = (props) => onResponse =>{
    try {
        axiosInstance.get(AIMS_TO_ACHIEVE_LIST_URL, { params: props })
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

// Function to get aims to achieve detail
export const getAimsToAchieveDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(AIMS_TO_ACHIEVE_DETAIL_URL, { params: props })
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

// Function to delete aims to achieve
export const deleteAimsToAchieve = (props) => onResponse =>{
    try {
        axiosInstance.delete(AIMS_TO_ACHIEVE_DELETE_URL, { data: props })
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
// Function to update aims to achieve status
export const aimsToAchieveStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(AIMS_TO_ACHIEVE_STATUS_CHANGE_URL, props)
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

/***************** Aims To Achieve Function End *****************/

/***************** Key Health Priorities Function Start *****************/

// Function to create/update key health priorities
export const createKeyHealthPriorities = (props) => onResponse =>{
    try {
        axiosInstance.post(KEY_HEALTH_PRIORITIES_CREATE_UPDATE_URL, props)
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

// Function to get key health priorities list
export const getKeyHealthPrioritiesList = (props) => onResponse =>{
    try {
        axiosInstance.get(KEY_HEALTH_PRIORITIES_LIST_URL, { params: props })
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

// Function to get key health priorities detail
export const getKeyHealthPrioritiesDetail = (props) => onResponse =>{
    try {
        axiosInstance.get(KEY_HEALTH_PRIORITIES_DETAIL_URL, { params: props })
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

// Function to delete key health priorities
export const deleteKeyHealthPriorities = (props) => onResponse =>{
    try {
        axiosInstance.delete(KEY_HEALTH_PRIORITIES_DELETE_URL, { data: props })
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
/***************** Key Health Priorities Function End *****************/