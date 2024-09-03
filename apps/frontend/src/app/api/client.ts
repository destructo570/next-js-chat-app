import { isDevEnvironment } from "@/lib/utils";
import axios from "axios";

const BASE_URL = isDevEnvironment ? "http://localhost:8080" : "";

export function createAxiosClient({
  options  
}) {
  const client = axios.create(options);

  client.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      if (error?.response?.status === 401 || error.response?.status === 403) {
        //Unauthorized handling
      }
      return Promise.reject(error);
    }
  );

  return client;
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    },
  }
});
