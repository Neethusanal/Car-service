
import { Card, CardHeader, Typography, Button, CardBody, Chip, CardFooter, Avatar, IconButton, Tooltip, } from "@material-tailwind/react";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { addcarModel, carDelete, getBrands, getallCars, updateCars } from "../../Services/AdminApi";

import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Car", "BrandName", "FuelType", " ", "Actions", ""];
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


export const Modelmanagement = () => {
  const [carName, setcarName] = useState("");
  const [brandName, setbrandName] = useState("");
  const [brandData, setBrandData] = useState();
  const [fuelType, setfuelType] = useState("");
  // modal for adding
  const [modalIsOpen, setIsOpen] = React.useState(false);
  //modal for editing

  const [modalOpen, setOpen] = React.useState(false);
  const [modelData, setModelData] = useState([])
  const [deleted, setDeleted] = useState()
  const navigate = useNavigate()
  //Edit Modal
  function openEditModal() {
    setOpen(true);
  }
  function closeEditModal() {
    setOpen(false);
  }
  //Add Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    console.log("llllllllll");
    BrandName()
    getAllModels()


  }, [deleted]);
  const BrandName = async () => {
    try {
      let { data } = await getBrands()
      console.log(data)
      if (data.success) {
        console.log(data.result, "ppppp")
        setBrandData(data?.result)

      }

    } catch (error) {

    }
  }
  const handleAddCars = (e) => {
    e.preventDefault()
    console.log(carName, brandName, fuelType)

    addcarModel({ carName, brandName, fuelType }).then((res) => {
      console.log(res);
      if (res.data.success) {
        setcarName("")
        setbrandName("")
        setfuelType("")
        Swal.fire(res.data.message);


      } else {
        console.log(res.data.errors, "error");
        Swal.fire(res.data.message);
      }
    });
  }
  const getAllModels = () => {
    getallCars().then((res) => {
      console.log("getcars");
      console.log(res.data);
      if (res.data.success) {
        console.log(res.data.result, "ddddddd");
        setModelData(res?.data?.result);
      }
    });
  };


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
        let { data } = await carDelete(id)
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




  const handleEdit = (cars) => {

    setcarName(cars.carName)
    setbrandName(cars.brandData)
    setfuelType(cars.fuelType)
    openEditModal()
  }

  const handleupdateCars = (e) => {
    e.preventDefault();

    updateCars({
      carName,
      brandName,
      fuelType,
    }).then((res) => {

      if (res.data.success) {
        console.log(res.data.result, "ddddddd");
        setcarName("")
        setbrandName('')
        setfuelType("")

        Swal.fire(res.data.message)
        navigate('/admin/models')
      }
      else {
        console.log("else part executing")
        Swal.fire(res.data.message)

      }
    });
  }


  return (
    <>

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Car Models
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">

              <Button className="flex items-center gap-3" color="blue" size="sm" onClick={openModal}>
                Add Models
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
              {modelData?.map(
                (cars, index) => {
                  const isLast = index === modelData.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index + 'xyz'}>

                      <td className={`${classes} p-4 md:p-2`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {cars.carName}
                        </Typography>
                      </td>
                      <td className={`${classes} p-4 md:p-2`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {cars.brandName.brandName}
                        </Typography>
                      </td>
                      <td className={`${classes} p-4 md:p-2`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {cars.fuelType}
                        </Typography>
                      </td>


                      <td className={`${classes} p-4 md:p-2`}>
                        <Button size="sm" onClick={() => handleEdit(cars)} > Edit</Button>
                      </td>
                      <td className={`${classes} p-4 md:p-2`}>
                        <Button size="sm" onClick={() => handleDelete(cars._id)}>Delete</Button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          {/* <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" color="blue-gray" size="sm">
              1
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              2
            </IconButton>

          </div>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button> */}
        </CardFooter>
      </Card>
      {/* Modal for Adding New Cars */}

      <div>
        <Modal
          isOpen={modalIsOpen}

          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="text-4xl font-bold flex-items-center">Add car Models</div>
          <form onSubmit={handleAddCars}>
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block font-bold mb-1"
              >
                Car Model Name
              </label>
              <input
                type="text"
                id="brand"
                value={carName}
                onChange={(e) => setcarName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter car name"
                required
              />
            </div  >
            <div className="mb-4">
              <label htmlFor="items" className="block font-bold mb-1">
                Select the Brand Name
              </label>
              <select
                id="items"
                value={brandName}
                onChange={(e) => setbrandName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select the brand</option>
                {brandData?.map((brand, index) => {
                  return (
                    <option value={brand._id}>{brand.brandName}</option>
                  )
                })}


              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block font-bold mb-1"
              >
                fuel Type
              </label>
              <input
                type="text"
                id="fuelType"
                value={fuelType}
                onChange={(e) => setfuelType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter the Fuel type"
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

      {/* Modal for Editing */}
      <div >
        <Modal
          isOpen={modalOpen}

          onRequestClose={closeEditModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="text-4xl font-bold flex-items-center">Edit car Models</div>
          <form onSubmit={handleupdateCars}>
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block font-bold mb-1"
              >
                Car Model Name
              </label>
              <input
                type="text"
                id="brand"
                value={carName}
                onChange={(e) => setcarName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter car name"
                required
              />
            </div  >
            <div className="mb-4">
              <label htmlFor="items" className="block font-bold mb-1">
                Select the Brand Name
              </label>
              <select
                id="items"
                value={brandName}
                onChange={(e) => setbrandName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select the brand</option>
                {brandData?.map((brand, index) => {
                  return (
                    <option value={brand._id}>{brand.brandName}</option>
                  )
                })}


              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block font-bold mb-1"
              >
                fuel Type
              </label>
              <input
                type="text"
                id="fuelType"
                value={fuelType}
                onChange={(e) => setfuelType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter the Fuel type"
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
              onClick={closeEditModal}
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