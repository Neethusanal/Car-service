import {adminAxiosInstance} from '../axios/Instance'

const adminSignin=(data)=>{
    return adminAxiosInstance.post('/login',data)
  }
  const getAllMechanic = () => {
    console.log("iiinn")
    return adminAxiosInstance.get("/getallmechanic");
  };
  const getAllUsers = () => {
    console.log("entered")
    return adminAxiosInstance.get("/getallusers");
  };
  const AddNewBrands = (data) => {
    console.log("brands entered")
    return adminAxiosInstance.post("/addbrands",data);
  };
  const getAllBrands = () => {
    console.log("gggg came")
    return adminAxiosInstance.get("/getallbrands");
  };
  const brandDelete = (id) => {
    console.log(id,"nnnnn")
    return adminAxiosInstance.post(`/deletebrands/${id}`);
  };
  const blockUser = (id) => {
    console.log(id,"userblock")
    return adminAxiosInstance.put(`/blockuser/${id}`);
  };
  const unblockUser = (id) => {
    console.log(id,"unuserblock")
    return adminAxiosInstance.put(`/unblockuser/${id}`);
  };
  const addNewServices = (data) => {
    console.log("services entered")
    return adminAxiosInstance.post("/addservices",data);
  };
  const updateBrand = (data) => {
    console.log(data,"brandupdate")
    return adminAxiosInstance.put("/updatebrand",data);
  };
  const getServices = () => {
    console.log("services ")
    return adminAxiosInstance.get("/getallservices");
  };
  const updateService = (data) => {
    console.log(data,"serviceupdate")
    return adminAxiosInstance.put("/updateservice",data);
  };
  const serviceDelete = (id) => {
    console.log(id,"service")
    return adminAxiosInstance.post(`/deleteservice/${id}`);
  };
  //getting brands to add new car models
  const getBrands=()=>{

    return adminAxiosInstance.get("/getallbrandNames");
  }
  const addcarModel = (data) => {
   
    return adminAxiosInstance.post("/addcarmodels",data);
  };
  const getallCars = () => {
  
    return adminAxiosInstance.get("/getallcars");
  };
  const carDelete = (id) => {
 
    return adminAxiosInstance.post(`/deletecar/${id}`);
  };
  const updateCars = (data) => {
 
    return adminAxiosInstance.put("/updatecars",data);
  };
  const addBanner = (data) => {
  
    return adminAxiosInstance.post("/addbanner",data);
  };
  const getBanner = () => {
    console.log("banner came")
    return adminAxiosInstance.get("/getallbanner");
  };
  
 export {adminSignin,getAllMechanic,getAllUsers,AddNewBrands,getAllBrands,brandDelete ,blockUser,addNewServices, updateBrand, getServices
  ,updateService,serviceDelete,getBrands,addcarModel, getallCars ,carDelete,updateCars,addBanner,getBanner 
}