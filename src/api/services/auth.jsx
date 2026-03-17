import { LOGIN_AUTH } from "../constants";
import axiosInstance from "../api";

export const loginAuth = (props) => onResponse => {

    try {
      
        axiosInstance.post(LOGIN_AUTH , props)
            .then((response) => {
                onResponse(response?.data);
            })
            .catch((err) => {
                onResponse(err);
            });
  
    } catch (error) {
      console.log(error)
    }
  
  };