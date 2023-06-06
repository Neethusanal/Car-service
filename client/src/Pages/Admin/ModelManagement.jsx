import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Typography, Button, CardBody, Chip, CardFooter, Avatar, IconButton, Tooltip, } from "@material-tailwind/react";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { addcarModel, getBrands } from "../../Services/AdminApi";

import Swal from "sweetalert2"

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];
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

export const Modelmanagement = () => {
  const [carName, setcarName] = useState("");
  const [brandName, setbrandName] = useState("");
  const [brandData, setBrandData] = useState();
  const [fuelType, setfuelType] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    console.log("llllllllll");
    BrandName()
  }, []);
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
      console.log(carName,brandName,fuelType)

      addcarModel({carName,brandName,fuelType}).then((res) => {
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
                {/* <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
            </div> */}
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

            </div>
            <Button variant="outlined" color="blue-gray" size="sm">
              Next
            </Button>
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
                  className="block mb-2 text-lg text-gray-700"
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
                <label htmlFor="items" className="block mb-2 text-lg text-gray-700">
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
                  className="block mb-2 text-lg text-gray-700"
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
      </>
    );
  
}