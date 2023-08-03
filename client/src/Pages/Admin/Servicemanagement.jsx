
import { Card, CardHeader, Typography, Button, CardBody, CardFooter,Input } from "@material-tailwind/react";
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
    maxWidth: "90%", 
    width: "400px", 
  },
};



export const Servicemanagement = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [serviceName, setServiceName] = useState("")
  const [description, setDescription] = useState("")
  const [services, setServices] = useState()
  const [deleted, setDeleted] = useState("")
  const [image, setImage] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    getAllServices()
    console.log("hhhiiii");
  }, [deleted, modalIsOpen,currentPage])

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleServices = async (e) => {
    e.preventDefault();
    console.log(serviceName, description);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('serviceName', serviceName)
    formData.append('description', description)
    let { data } = await addNewServices(formData)
    console.log(data)
    if (data.success) {
      setServiceName("")
      setDescription("")
      setImage('')
      Swal.fire(data.message);


    } else {
      console.log(data.errors, "error");
      Swal.fire(data.message);
    }
  }







  // Get All services from Back end
  const getAllServices = () => {
    const limit = 3;
    getServices({page: currentPage, limit: limit}).then((res) => {
      console.log("getBrands");
      console.log(res);
      if (res.data.success) {

        setServices(res.data?.result);
        setTotalPages(res.data?.result.totalPages);
      }
    });
  }
  const handleEdit = (service) => {

    navigate('/admin/editservice', { state: { service } })
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
  const filterServices = (services, query) => {
    if (!query) {
      return services; // If the query is empty, return all services
    }

    // If there is a query, filter services based on it
    const filteredServices = services.filter((service) => {
      return service.serviceName.toLowerCase().includes(query.toLowerCase());
    });

    return filteredServices;
  };

  // Filter the services based on the search query
  const filteredServices = filterServices(services, searchQuery);

  return (
    <>
      <Card className="h-screen max-w-full mt-20">
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
            <div className="w-full md:w-72">
                <Input
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

                <Button className="flex items-center gap-3" color="blue" size="sm" onClick={openModal}>
                  Add Service
                </Button>
              
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0">
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
            {filteredServices?.map((service, index) => {
                const isLast = index === services.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={service.serviceName}>

                    <td className={`${classes} p-4 md:p-2`}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {service.serviceName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <img
                        className="h-14 w-20 rounded-lg shadow-xl shadow-blue-gray-900/50"
                        src={service.image}
                        alt="nature image"
                      />
                    </td>
                    <td className={`${classes} p-4 md:p-2`}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {service.description}
                      </Typography>
                    </td>
                    <td className={`${classes} p-4 md:p-2`}>
                      <Button size="sm" onClick={() => handleEdit(service)} > Edit</Button>
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
        <button
        className="px-2 py-1 mr-2 border rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
      >
        Previous
      </button>
      <span className="px-2 py-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-2 py-1 ml-2 border rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
      >
        Next
      </button>
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
            <div className="mb-4">
              <label htmlFor="banner" className="block font-bold mb-1">
                Service Image
              </label>
              <input
                type="file"
                name='file'
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
                className="file-input w-full max-w-xs" required
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