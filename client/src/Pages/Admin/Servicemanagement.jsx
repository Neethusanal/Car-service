import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {Card,CardHeader,Typography,Button,CardBody,Chip,CardFooter,Avatar,IconButton,Tooltip,Input} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2"
import { addNewServices, getServices, serviceDelete } from "../../Services/AdminApi";
import { useNavigate } from "react-router-dom";
const TABLE_HEAD = ["Name", "Amount", "Description", " ", "Actions", ""];
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "90%", // Adjust the maximum width as needed
        width: "400px", // Set a fixed width or use percentage
    },
};
 

 
export const Servicemanagement=()=> {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [serviceName,setServiceName]=useState("")
    const[description,setDescription]=useState("")
    const [price,setPrice]=useState()
    const[services,setServices]=useState()
    const [deleted, setDeleted] = useState("")
    const navigate=useNavigate()
    useEffect(() => {
       getAllServices()
      console.log( "hhhiiii");
  },[deleted,modalIsOpen])
  
    function openModal() {
        setIsOpen(true);
      }
      function closeModal() {
        setIsOpen(false);
      }
      const handleServices=(e)=>{
        e.preventDefault();
        console.log(serviceName, description,price);
        addNewServices({
            serviceName,
            price,
            description,
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                setServiceName("")
                setDescription("")
                setPrice("")
                Swal.fire(res.data.message);


            } else {
                console.log(res.data.errors, "error");
                Swal.fire(res.data.message);
            }
        });
      }
      // Get All services from Back end
      const getAllServices=()=>{
        console.log("hii i came")
         getServices().then((res) => {
          console.log("getBrands");
          console.log(res);
          if (res.data.success) {
              console.log(res.data.result, "ddddddd");
              setServices(res.data?.result);
          }
      });
      }
      const handleEdit=(service)=>{
        console.log(service)
        navigate('/admin/editservice',{ state: { service } })
    }
    const handleDelete = (id) => {
      Swal.fire({
          title: "Are you sure?",
          text: "Are you sure you want to delete this?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then(async (willdelete) => {
          if (willdelete) {
              let { data } = await serviceDelete(id)
              if (data.success) {
                  Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                  )
                  setDeleted(id)

              }
          }


      })
  }
    
  return (
    <>
    <Card className="h-screen max-w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              services management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details 
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className=" w-full md:w-72 ">
            <Button className="flex items-center gap-3"  color="blue" size="sm" onClick={openModal}>
              Add Service
            </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {services?.map((service,index) => {
                const isLast = index === services.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={service.serviceName}>
                    
                    <td className={`${classes} p-4 md:p-2`}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {service.serviceName}
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 md:p-2`}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {service.price}
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 md:p-2`}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {service.description}
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 md:p-2`}>
                                        <Button size="sm" onClick={()=>handleEdit(service)} > Edit</Button>
                                    </td>
                                    <td className={`${classes} p-4 md:p-2`}>
                                        <Button size="sm" onClick={() => handleDelete(service._id)} >Delete</Button>
                                    </td>
              
                    
              
                    
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" color="blue-gray" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" color="blue-gray" size="sm">
            1
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            2
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            3
          </IconButton>
          
        </div>
        <Button variant="outlined" color="blue-gray" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>

    {/* Modal for Adding services */}
    <div>
                <Modal
                    isOpen={modalIsOpen}
                   
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="text-4xl font-bold flex-items-center">Add Services</div>
                    <form onSubmit={handleServices}>
                        <div className="mb-4">
                            <label
                                htmlFor="brand"
                                className="block mb-2 text-lg text-gray-700"
                            >
                                Service Name
                            </label>
                            <input
                                type="text"
                                id="brand"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter brand name"
                                required
                            />
                        </div  >
                        <div className="mb-4">
                        <label
                                htmlFor="brand"
                                className="block mb-2 text-lg text-gray-700"
                            >
                                Price
                            </label>
                            <input
                                type="text"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter the price"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="brand"
                                className="block mb-2 text-lg text-gray-700"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                               
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter the Description"
                                required
                              
                                
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                        >
                            submit
                        </button>
                        <button
                            onClick={closeModal}
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                        >
                            close
                        </button>
                    </form>
                    
                </Modal>
            </div>


    </>
  );
}