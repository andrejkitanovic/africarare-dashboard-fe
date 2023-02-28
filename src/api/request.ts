import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { history } from "../App";
import { APICall } from "./utils";

// const debuggingToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmE1OTk3OTkwMmQ4NzRhMjA4NzdlZiIsImlhdCI6MTY1MTEzNjkzM30.oieHmV2Evd3Eek9Zg2aBSn_q9DwAkH0b8tvmEAdszq0";

const i18Config = localStorage.getItem("i18nConfig");

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    "Accept-Language": i18Config ? JSON.parse(i18Config)?.selectedLang : "sr",
  },
});

interface Props extends AxiosRequestConfig {
  ignoreUnauthorizedLogout?: boolean;
}

const request = ({ ignoreUnauthorizedLogout = false, ...options }: Props) => {
  // Authorization header with Bearer token is set up in PrivateRoute component
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError) => {
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      !ignoreUnauthorizedLogout
    ) {
      history.push(`/login`, { unauthorized401: true });
    }

    /* tslint:disable:no-console */
    // DISPLAY API ERROR MESSAGES ON DEV ENVIRONMENT
    if (process.env.NODE_ENV === "development") {
      if (error.response) {
        // Request was made but server responded with something
        // other than 2xx
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else {
        // Something else happened while setting up the request
        // triggered the error
        console.error("Error Message:", error.message);
      }
    }
    /* tslint:enable:no-console */

    return Promise.reject(error.response || error.message);
  };

  return axiosInstance(options).then(onSuccess).catch(onError);
};

export default request;

export type { APICall };
