
import { BANNER_CREATE_URL, BANNER_DELETE_URL, BANNER_LIST_URL, BANNER_DETAIL_URL, BANNER_VIDEO_CREATE_URL, BANNER_VIDEO_DELETE_URL, BANNER_VIDEO_LIST_URL, BANNER_VIDEO_DETAIL_URL, SCROLLING_HIGHLIGHTS_CREATE_URL, SCROLLING_HIGHLIGHTS_DELETE_URL, SCROLLING_HIGHLIGHTS_LIST_URL, SCROLLING_HIGHLIGHTS_DETAIL_URL, ABOUT_CREATE_URL, ABOUT_DELETE_URL, ABOUT_LIST_URL, ABOUT_DETAIL_URL, ABOUT_STATUS_CHANGE_URL, HOW_WE_WORK_CREATE_URL, HOW_WE_WORK_DELETE_URL, HOW_WE_WORK_LIST_URL, HOW_WE_WORK_DETAIL_URL, HOW_WE_WORK_STATUS_CHANGE_URL, REGIONAL_LEVELS_CREATE_URL, REGIONAL_LEVELS_DELETE_URL, REGIONAL_LEVELS_LIST_URL, REGIONAL_LEVELS_DETAIL_URL, REGIONAL_LEVELS_STATUS_CHANGE_URL, WHAT_WE_DO_CREATE_URL, WHAT_WE_DO_DELETE_URL, WHAT_WE_DO_LIST_URL, WHAT_WE_DO_DETAIL_URL, WHAT_WE_DO_STATUS_CHANGE_URL, IMPACT_CREATE_URL, IMPACT_DELETE_URL, IMPACT_LIST_URL, IMPACT_DETAIL_URL, IMPACT_STATUS_CHANGE_URL, HIGHLIGHTS_SLIDER_CREATE_URL, HIGHLIGHTS_SLIDER_LIST_URL, HIGHLIGHTS_SLIDER_DETAIL_URL, HIGHLIGHTS_SLIDER_DELETE_URL, LIBRARY_CREATE_URL, LIBRARY_LIST_URL, LIBRARY_DETAIL_URL, LIBRARY_DELETE_URL, MODULAR_APPROACH_CREATE_URL, MODULAR_APPROACH_LIST_URL, MODULAR_APPROACH_DETAIL_URL, MODULAR_APPROACH_DELETE_URL, MODULAR_APPROACH_STATUS_CHANGE_URL } from "../constants";
import axiosInstance from "../api";

/***************** Banner Function Start *****************/

// Function to create/update banner
export const createBanner = (props) => onResponse =>{
    try {
        axiosInstance.post(BANNER_CREATE_URL, props)
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

// Function to get banner detail
export const getBannerDetail = (props) => onResponse =>{
    try {
        let BASE_URL = BANNER_DETAIL_URL + "?";

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

// Function to get banners
export const getBanners = (props) => onResponse =>{
    try {
        let BASE_URL = BANNER_LIST_URL + "?";

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

// Function to delete banner
export const deleteBanner = (props) => onResponse =>{
    try {
        axiosInstance.delete(BANNER_DELETE_URL, { data: props })
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

/***************** Banner Function End *****************/

/***************** Banner Video Function Start *****************/

// Function to create/update banner video
export const createBannerVideo = (props) => onResponse =>{
    try {
        axiosInstance.post(BANNER_VIDEO_CREATE_URL, props, {
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

// Function to update banner video status
// Function to get banner videos
export const getBannerVideos = (props) => onResponse =>{
    try {
        let BASE_URL = BANNER_VIDEO_LIST_URL + "?";

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

// Function to delete banner video
export const deleteBannerVideo = (props) => onResponse =>{
    try {
        axiosInstance.delete(BANNER_VIDEO_DELETE_URL, { data: props })
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

// Function to get banner video detail
export const getBannerVideoDetail = (props) => onResponse =>{
    try {
        let BASE_URL = BANNER_VIDEO_DETAIL_URL + "?";

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

/***************** Banner Video Function End *****************/

/***************** Scrolling Highlights Function Start *****************/

// Function to create/update scrolling highlights
export const createScrollingHighlights = (props) => onResponse =>{
    try {
        axiosInstance.post(SCROLLING_HIGHLIGHTS_CREATE_URL, props)
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

// Function to get scrolling highlights detail
export const getScrollingHighlightsDetail = (props) => onResponse =>{
    try {
        let BASE_URL = SCROLLING_HIGHLIGHTS_DETAIL_URL + "?";

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

// Function to get scrolling highlights
export const getScrollingHighlights = (props) => onResponse =>{
    try {
        let BASE_URL = SCROLLING_HIGHLIGHTS_LIST_URL + "?";

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

// Function to delete scrolling highlights
export const deleteScrollingHighlights = (props) => onResponse =>{
    try {
        axiosInstance.delete(SCROLLING_HIGHLIGHTS_DELETE_URL, { data: props })
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

/***************** Scrolling Highlights Function End *****************/

/***************** About Function Start *****************/

// Function to create/update about
export const createAbout = (props) => onResponse =>{
    try {
        axiosInstance.post(ABOUT_CREATE_URL, props)
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

// Function to update about status
export const aboutStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.post(ABOUT_STATUS_CHANGE_URL, props)
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

// Function to get about detail
export const getAboutDetail = (props) => onResponse =>{
    try {
        let BASE_URL = ABOUT_DETAIL_URL + "?";

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

// Function to get abouts
export const getAbouts = (props) => onResponse =>{
    try {
        let BASE_URL = ABOUT_LIST_URL + "?";

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

// Function to delete about
export const deleteAbout = (props) => onResponse =>{
    try {
        axiosInstance.delete(ABOUT_DELETE_URL, { data: props })
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

/***************** About Function End *****************/

/***************** How We Work Function Start *****************/

// Function to create/update how we work
export const createHowWeWork = (props) => onResponse =>{
    try {
        axiosInstance.post(HOW_WE_WORK_CREATE_URL, props)
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

// Function to get how we work detail
export const getHowWeWorkDetail = (props) => onResponse =>{
    try {
        let BASE_URL = HOW_WE_WORK_DETAIL_URL + "?";

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

// Function to get how we work list
export const getHowWeWorkList = (props) => onResponse =>{
    try {
        let BASE_URL = HOW_WE_WORK_LIST_URL + "?";

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

// Function to delete how we work
export const deleteHowWeWork = (props) => onResponse =>{
    try {
        axiosInstance.delete(HOW_WE_WORK_DELETE_URL, { data: props })
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

// Function to update how we work status
export const howWeWorkStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(HOW_WE_WORK_STATUS_CHANGE_URL, props)
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

/***************** How We Work Function End *****************/

/***************** Regional Levels Function Start *****************/

// Function to create/update regional levels
export const createRegionalLevels = (props) => onResponse =>{
    try {
        axiosInstance.post(REGIONAL_LEVELS_CREATE_URL, props)
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

// Function to get regional levels detail
export const getRegionalLevelsDetail = (props) => onResponse =>{
    try {
        let BASE_URL = REGIONAL_LEVELS_DETAIL_URL + "?";

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

// Function to get regional levels list
export const getRegionalLevelsList = (props) => onResponse =>{
    try {
        let BASE_URL = REGIONAL_LEVELS_LIST_URL + "?";

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

// Function to delete regional levels
export const deleteRegionalLevels = (props) => onResponse =>{
    try {
        axiosInstance.delete(REGIONAL_LEVELS_DELETE_URL, { data: props })
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

// Function to update regional levels status
export const regionalLevelsStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(REGIONAL_LEVELS_STATUS_CHANGE_URL, props)
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

/***************** Regional Levels Function End *****************/

/***************** What We Do Function Start *****************/

// Function to create/update what we do
export const createWhatWeDo = (props) => onResponse =>{
    try {
        axiosInstance.post(WHAT_WE_DO_CREATE_URL, props)
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

// Function to get what we do detail
export const getWhatWeDoDetail = (props) => onResponse =>{
    try {
        let BASE_URL = WHAT_WE_DO_DETAIL_URL + "?";

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

// Function to get what we do list
export const getWhatWeDoList = (props) => onResponse =>{
    try {
        let BASE_URL = WHAT_WE_DO_LIST_URL + "?";

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

// Function to delete what we do
export const deleteWhatWeDo = (props) => onResponse =>{
    try {
        axiosInstance.delete(WHAT_WE_DO_DELETE_URL, { data: props })
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

// Function to update what we do status
export const whatWeDoStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(WHAT_WE_DO_STATUS_CHANGE_URL, props)
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

/***************** What We Do Function End *****************/

/***************** Impact Function Start *****************/

// Function to create/update impact
export const createImpact = (props) => onResponse =>{
    try {
        axiosInstance.post(IMPACT_CREATE_URL, props)
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

// Function to get impact detail
export const getImpactDetail = (props) => onResponse =>{
    try {
        let BASE_URL = IMPACT_DETAIL_URL + "?";

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

// Function to get impact list
export const getImpactList = (props) => onResponse =>{
    try {
        let BASE_URL = IMPACT_LIST_URL + "?";

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

// Function to delete impact
export const deleteImpact = (props) => onResponse =>{
    try {
        axiosInstance.delete(IMPACT_DELETE_URL, { data: props })
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

// Function to update impact status
export const impactStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(IMPACT_STATUS_CHANGE_URL, props)
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

/***************** Impact Function End *****************/

/***************** Highlights Slider Function Start *****************/

// Function to create/update highlights slider
export const createHighlightsSlider = (props) => onResponse =>{
    try {
        axiosInstance.post(HIGHLIGHTS_SLIDER_CREATE_URL, props)
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

// Function to get highlights slider detail
export const getHighlightsSliderDetail = (props) => onResponse =>{
    try {
        let BASE_URL = HIGHLIGHTS_SLIDER_DETAIL_URL + "?";

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

// Function to get highlights slider list
export const getHighlightsSliderList = (props) => onResponse =>{
    try {
        let BASE_URL = HIGHLIGHTS_SLIDER_LIST_URL + "?";

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

// Function to delete highlights slider
export const deleteHighlightsSlider = (props) => onResponse =>{
    try {
        axiosInstance.delete(HIGHLIGHTS_SLIDER_DELETE_URL, { data: props })
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

/***************** Highlights Slider Function End *****************/

/***************** Library Function Start *****************/

// Function to create/update library
export const createLibrary = (props) => onResponse =>{
    try {
        axiosInstance.post(LIBRARY_CREATE_URL, props)
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

// Function to get library detail
export const getLibraryDetail = (props) => onResponse =>{
    try {
        let BASE_URL = LIBRARY_DETAIL_URL + "?";

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

// Function to get library list
export const getLibraryList = (props) => onResponse =>{
    try {
        let BASE_URL = LIBRARY_LIST_URL + "?";

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

// Function to delete library
export const deleteLibrary = (props) => onResponse =>{
    try {
        axiosInstance.delete(LIBRARY_DELETE_URL, { data: props })
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

/***************** Library Function End *****************/

/***************** Modular Approach Function Start *****************/

// Function to create/update modular approach
export const createModularApproach = (props) => onResponse =>{
    try {
        axiosInstance.post(MODULAR_APPROACH_CREATE_URL, props)
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

// Function to get modular approach detail
export const getModularApproachDetail = (props) => onResponse =>{
    try {
        let BASE_URL = MODULAR_APPROACH_DETAIL_URL + "?";

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

// Function to get modular approach list
export const getModularApproachList = (props) => onResponse =>{
    try {
        let BASE_URL = MODULAR_APPROACH_LIST_URL + "?";

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

// Function to delete modular approach
export const deleteModularApproach = (props) => onResponse =>{
    try {
        axiosInstance.delete(MODULAR_APPROACH_DELETE_URL, { data: props })
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

// Function to update modular approach status
export const modularApproachStatusChange = (props) => onResponse =>{
    try {
        axiosInstance.put(MODULAR_APPROACH_STATUS_CHANGE_URL, props)
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

/***************** Modular Approach Function End *****************/
