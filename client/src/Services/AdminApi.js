import { adminAxiosInstance } from "../axios/Instance";

const authAdmin = () => {
  return adminAxiosInstance.get("/isAdminAuth");
};

const adminSignin = (data) => {
  return adminAxiosInstance.post("/login", data);
};

const getAllMechanic = (data) => {
  return adminAxiosInstance.get(`/getallmechanic?page=${data.page}&limit=${data.limit}`);
};
const getAllUsers = (data) => {
  return adminAxiosInstance.get(`/getallusers?page=${data.page}&limit=${data.limit}`);
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
const getServices = (data) => {
  return adminAxiosInstance.get(`/getallservices?page=${data.page}&limit=${data.limit}`);
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
const getAllServiceList = (data) => {
  return adminAxiosInstance.get(`/getallSiervicelsts?page=${data.page}&limit=${data.limit}`);
};
const updateServicesList = (data) => {
  return adminAxiosInstance.put("/updateservicelist", data);
};
const approveMechanic = (id) => {
  console.log(id, "approve");
  return adminAxiosInstance.post(`/approvemechanic/${id}`);
};
const rejectMechanic = (id) => {
  console.log(id, "reject");
  return adminAxiosInstance.post(`/rejectmechanic/${id}`);
};
const blockMechanic = (id) => {
  console.log("block mechanic");
  return adminAxiosInstance.post(`/blockmechanic/${id}`);
};
const addLocation = (data) => {
  return adminAxiosInstance.post('/addlocation', data);
};
const getAllLocations = () => {
  return adminAxiosInstance.get("/getalllocations");
};
const deleteLoc = (id) => {
  return adminAxiosInstance.post(`/deleteloc/${id}`);
};
 const getBookingData=()=>{
  return adminAxiosInstance.get('/getallbookingdata')
 }
 const getSalesData=(data)=>{
  console.log(data)
  return adminAxiosInstance.get(`/getsalesdata?from=${data.fromDate}&to=${data.toDate}`)
}
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
  rejectMechanic,
  blockMechanic,
  addLocation ,
  getAllLocations,
  deleteLoc, 
  getBookingData,
  getSalesData
};
