import { client } from "./client";

export const signupUser = async (payload) => {
  try {
    const response = await client.post(`/api/v1/users`, payload);
    return response;
  } catch (err) {
    //Show error toast
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await client.post(`/api/v1/users/login`, payload);
    return response;
  } catch (err) {
    //Show error toast
  }
};
