import React, { useEffect, useState } from 'react'
import Modal from "react-modal";
import Swal from "sweetalert2"
import { Card, CardHeader, Typography, Button, CardBody, Chip, CardFooter, Avatar, IconButton, Tooltip, } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { addLocation, deleteLoc, getAllLocations } from '../../Services/AdminApi';
const TABLE_HEAD = ["location name"];
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
  

export const Location = () => {
    const [locationname,setLocationName]=useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [getData,setGetData]=useState()
    const [deleted, setDeleted] = useState()
    useEffect(()=>{
        getAllLocations().then((res)=>{
            setGetData(res.data.result)
        })
    },[deleted])
    console.log(getData,"fa")
    const openModal = () => {
        setIsOpen(true);
      };
    
      const closeModal = () => {
        setIsOpen(false);
      };
      const handleAddLocation=(e)=>{
        e.preventDefault()
       
    
        addLocation ({locationname }).then((res) => {
        
          if (res.data.success) {
            setLocationName("")
            Swal.fire(res.data.message);
          } else {
            Swal.fire(res.data.message);
          }
        });
      }
      //using same cardelete to handle the deletelocation 
      const handleDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            let { data } = await deleteLoc(id)
            if (data.success) {
              setDeleted(id)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          }
        })
      }
    

  return (
    <>


<Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
              Location
              </Typography>
              
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">

              <Button className="flex items-center gap-3" color="blue" size="sm" onClick={openModal}>
                Add Location
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
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
              {getData?.map(
                (loc, index) => {
                  const isLast = index === getData.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index + 'xyz'}>

                      <td className={`${classes} p-4 md:p-2`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {loc. Locationname}
                        </Typography>
                      </td>
                     

                     
                      <td className={`${classes} p-4 md:p-2`}>
                       <Button size="sm" onClick={() => handleDelete(loc._id)}>Delete</Button> 
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
            

          </div>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
         
    <div>
    <Modal
      isOpen={modalIsOpen}

      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="text-4xl font-bold flex-items-center">Add Location</div>
      <form onSubmit={handleAddLocation}>
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block font-bold mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="brand"
            value={locationname}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter place"
            required
          />
        </div  >
     
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
  )
}
