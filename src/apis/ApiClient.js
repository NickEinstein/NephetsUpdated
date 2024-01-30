// import { EventNote } from "@mui/icons-material";
// import axios from "axios";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

// export const apiClient =

// axios
//   .create({
//   baseURL: process.env. REACT_APP_SOFTWORK_API,
//     // baseURL: ,
//     responseType: "json",
//   })
//   .interceptors.request.use(
//     (config) => {
//       console.log("setting up");
//       const token = cookies.get("token");
//       if (token != null) {
//         config.headers.authorization = token;
//       }
//     },
//     (error) => Promise.reject(error)
//   );

import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const axiosConn = axios.create({
  baseURL: process.env.REACT_APP_SOFTWORK_API,
  //   baseURL: `https://localhost:43242`,
});
console.log(cookies.get("token"));

export default axiosConn;

// Request interceptor (Outgoing)
axiosConn.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("Interceptor Request (Outgoing) ", config);

    // config.headers.API_KEY = "YOUR_API_KEY";

    if (cookies.get("token")) {
      config.headers.Authorization = `Bearer ${cookies.get("token")}`;
    }
    return config;
  },
  function (error) {
    // Request error
    return Promise.reject(error);
  }
);

// Response interceptor (Incoming) - Optional
// axiosConn.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger

//     // Response data
//     console.log("Interceptor Response (Incoming) ", response);

//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger

//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
