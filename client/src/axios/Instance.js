import axios from "axios";
// Base URLs for different instances
const baseUrl = process.env.REACT_APP_BASE_URL;
const mechanicUrl = process.env.REACT_APP_MECHANIC_URL;
const adminUrl = process.env.REACT_APP_ADMIN_URL;
// Function to create an Axios client with specified baseURL
const createAxiosClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 9000,
    timeoutErrorMessage: "Request timeout... Please Try Again!!!",
  });
  return client;
};
// Function to attach authentication token to the request headers
const attachToken = (req, tokenName = "usertoken") => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
};
// Create separate Axios instances for different purposes

// Mechanic Axios instance
const mechanicAxiosInstance = createAxiosClient(mechanicUrl);
mechanicAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "mechanictoken");
  return modifiedReq;
});
// User Axios instance
const userAxiosInstance = createAxiosClient(baseUrl);

userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "usertoken");
  return modifiedReq;
});
// Admin Axios instance
const adminAxiosInstance = createAxiosClient(adminUrl);
// Interceptor for attaching admin token to requests
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "admintoken");
  return modifiedReq;
});
// Export the Axios instances for usage in other files/modules
export { mechanicAxiosInstance, userAxiosInstance, adminAxiosInstance };
