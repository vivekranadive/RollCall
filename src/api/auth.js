import axios from "axios";
import axiosInstance from "./axiosInstance";
import { getUserInfoDetails } from "../utlis";

const { clientId, companyId } = getUserInfoDetails()

export const login = async (loginData) => {
  let response;
  try {
    response = await axios.post("url", loginData);
    return response;
  } catch (error) {
    return error;
  }
};

export const signup = async (signupData) => {
  let response;
  try {
    response = await axios.post("url", signupData);
    return response;
  } catch (error) {
    return error;
  }
};

export const subscribe = async (subscribeData) => {
  let response;
  try {
    response = await axios.post("url", subscribeData);
    return response;
  } catch (error) {
    return error;
  }
};

export const getConfig = () => {
  return axiosInstance.get(`/config?client=${clientId}&&type=ui_defaults&&company=${companyId}`)
}

export const getUserInfo = () => {
  return axiosInstance.get(`/UserInfo`)
}

// praneeths
// Praneeth12
