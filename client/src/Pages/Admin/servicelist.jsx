import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2"
import { addServicelist, getServiceName } from "../../Services/AdminApi";
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
 
const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];
 
const TABLE_ROWS = [
  {
    img: "/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];
 
export const ServiceList=()=> {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const[servicedata,setServiceData]=useState()
  const [serviceName,setServiceName]=useState()
 const [price,setPrice]=useState()
  const[name,setName]=useState()
  const [descriptionLines, setDescriptionLines] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
   
    ServicelistName()
    
    

  }, []);
  const ServicelistName=async ()=>{
    try {
      let { data } = await getServiceName()
      console.log(data)
      if (data.success) {
        console.log(data.result, "ppppp")
        setServiceData(data?.result)

      }

    } catch (error) {

    }
  }
  console.log(servicedata,"data is there")
  const handleAddServicelist=(e)=>{
    e.preventDefault()
    console.log(serviceName,descriptionLines)

    addServicelist({ serviceName, descriptionLines ,name,price}).then((res) => {
      console.log(res);
      if (res.data.success) {
        setServiceName("")
        setPrice('')
        setName('')
        setDescriptionLines([])
        Swal.fire(res.data.message);


      } else {
        console.log(res.data.errors, "error");
        Swal.fire(res.data.message);
      }
    });
  }
  const handleDescriptionChange = (e) => {
    const lines = e.target.value.split('\n');
    setDescriptionLines(lines);
  }

  return (
    <>
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Service List
            </Typography>
           
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            
            <Button className="flex items-center gap-3" color="blue" size="sm" onClick={openModal}>
            Add Servicelists
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
            {TABLE_ROWS.map(
              ({ img, name, amount, date, status, account, accountNumber, expiry }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={img}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          color={
                            status === "paid" ? "green" : status === "pending" ? "amber" : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                          <Avatar
                            src={
                              account === "visa"
                                ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                            }
                            size="sm"
                            alt={account}
                            variant="square"
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {account.split("-").join(" ")} {accountNumber}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {expiry}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
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
     <div>
     <Modal
       isOpen={modalIsOpen}

       onRequestClose={closeModal}
       style={customStyles}
       contentLabel="Example Modal"
     >
       <div className="text-4xl font-bold flex-items-center">Add car Models</div>
       <form onSubmit={handleAddServicelist}>
        
         <div className="mb-4">
            <label htmlFor="items" className="block font-bold mb-1">
              Select the Service Name
            </label>
            <select
              id="items"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select the brand</option>
              {servicedata?.map((items, index) => {
                return (
                  <option value={items._id}>{items.serviceName}</option>
                )
              })}


            </select>
          </div>
         <div className="mb-4">
           <label
             htmlFor="brand"
             className="block font-bold mb-1"
           >
             Name
           </label>
           <input
             type="text"
             id="fuelType"
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
             placeholder="Enter the name for the service providing"
             required
           />
         </div>
         <div className="mb-4">
                            <label
                                htmlFor="brand"
                                className="block font-bold mb-1"
                            >
                            Price
                            </label>
                            <input
                                type="text"
                                id="brand"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter Amount"
                                required
                            />
                        </div>
        
         <div className="mb-4">
            <label htmlFor="brand" className="block font-bold mb-1">
              Description
            </label>
            <textarea
              id="fuelType"
              value={descriptionLines.join('\n')}
              onChange={handleDescriptionChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter the list of things covered (Press Enter for each line)"
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