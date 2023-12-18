/* eslint-disable no-useless-catch */
import axios from "./axios";

export const registerRequest = async (user) => {
  try {
    const res = await axios.post(`/auth/signup`, user);
    return res;
  } catch (error) {
    throw error;
  }
};

export const loginRequest = async (user) => {
  try {
    const res = await axios.post(`/auth/login`, user);
    return res;
  } catch (error) {
    throw error;
  }
};

export const decodedRequest = async (token) => {
  try {
    const res = await axios.post(`/auth/${token}`);
    return res;
  } catch (error) {
    throw error;
  }
};
