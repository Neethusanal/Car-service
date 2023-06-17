import { adminAxiosInstance } from "../axios/Instance";

const authAdmin = () => {
  return adminAxiosInstance.get("/isAdminAuth");
};

const adminSignin = (data) => {
  return adminAxiosInstance.post("/login", data);
};

const getAllMechanic = () => {
  return adminAxiosInstance.get("/getallmechanic");
};
const getAllUsers = () => {
  return adminAxiosInstance.get("/getallusers");
};
const AddNewBrands = (data) => {
  return adminAxiosInstance.post("/addbrands", data);
};
const getAllBrands = () => {
  return adminAxiosInstance.get("/getallbrands");
};
const brandDelete = (id) => {
  return adminAxiosInstance.post(`/deletebrands/${id}`);
};
const blockUser = (id) => {
  return adminAxiosInstance.put(`/blockuser/${id}`);
};
const unblockUser = (id) => {
  return adminAxiosInstance.put(`/unblockuser/${id}`);
};
const addNewServices = (data) => {
  return adminAxiosInstance.post("/addservices", data);
};
const updateBrand = (data) => {
  return adminAxiosInstance.put("/updatebrand", data);
};
const getServices = () => {
  return adminAxiosInstance.get("/getallservices");
};
const updateService = (data) => {
  return adminAxiosInstance.put("/updateservice", data);
};
const serviceDelete = (id) => {
  return adminAxiosInstance.post(`/deleteservice/${id}`);
};
//getting brands to add new car models
const getBrands = () => {
  return adminAxiosInstance.get("/getallbrandNames");
};
const addcarModel = (data) => {
  return adminAxiosInstance.post("/addcarmodels", data);
};
const getallCars = () => {
  return adminAxiosInstance.get("/getallcars");
};
const carDelete = (id) => {
  return adminAxiosInstance.post(`/deletecar/${id}`);
};
const updateCars = (data) => {
  return adminAxiosInstance.put("/updatecars", data);
};
const addBanner = (data) => {
  return adminAxiosInstance.post("/addbanner", data);
};
const getBanner = () => {
  return adminAxiosInstance.get("/getallbanner");
};
const updateBanner = (data) => {
  return adminAxiosInstance.put("/updatebanner", data);
};
const blockBanner = (id) => {
  return adminAxiosInstance.put(`/blockbanner/${id}`);
};
const unblockBanner = (id) => {
  return adminAxiosInstance.put(`/unblockbanner/${id}`);
};
const getServiceName = () => {
  return adminAxiosInstance.get("/getallServiceNames");
};
const addServicelist = (data) => {
  return adminAxiosInstance.post("/addserviceslist", data);
};
const getAllServiceList = () => {
  return adminAxiosInstance.get("/getallSiervicelsts");
};
const updateServicesList = (data) => {
  return adminAxiosInstance.put("/updateservicelist", data);
};
const approveMechanic = (id) =>{ 
  console.log(id,"approve")
  return adminAxiosInstance.post(`/approvemechanic/${id}`);
};
const rejectMechanic = (id) =>{
  console.log(id,"reject")
  return adminAxiosInstance.post(`/rejectmechanic/${id}`)
};

export {
  adminSignin,
  authAdmin,
  getAllMechanic,
  getAllUsers,
  AddNewBrands,
  getAllBrands,
  brandDelete,
  blockUser,
  addNewServices,
  updateBrand,
  getServices,
  updateService,
  serviceDelete,
  getBrands,
  addcarModel,
  getallCars,
  carDelete,
  updateCars,
  addBanner,
  getBanner,
  updateBanner,
  blockBanner,
  unblockBanner,
  getServiceName,
  addServicelist,
  getAllServiceList,
  updateServicesList,
  approveMechanic,
  rejectMechanic
};
