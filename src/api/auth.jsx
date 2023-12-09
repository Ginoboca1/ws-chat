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
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
