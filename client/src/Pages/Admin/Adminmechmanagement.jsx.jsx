

import { Card, CardHeader, Typography, Button, CardBody, CardFooter, Avatar, Input, } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { approveMechanic, blockMechanic, getAllMechanic, rejectMechanic } from "../../Services/AdminApi";

import Swal from "sweetalert2"
const TABLE_HEAD = ["Image", "Name", "Email","certificate ", "status" , "Adminapproval", ""];


export const Adminmechmanagement = () => {
  const [mechanic, setMechanic] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const limit = 2;
    getAllMechanic({ page: currentPage, limit: limit}).then((res) => {
      if (res.data.status === 'success') {
        setMechanic(res?.data?.result)
        setTotalPages(res?.data?.result?.totalPages);
      }
    });
  }, [currentPage]);
  const handleApprove = (mechanic) => {
    const id = mechanic?._id
    console.log(id, "mechanicid")
    if (mechanic?.status === "pending") {
      approveMechanic(id).then((res) => {
        console.log(res)
        if (res.data.success) {


          Swal.fire(res.data.message)
        }
        else {


          Swal.fire(res.data.message)
        }


      })
    }
  }
  const handleReject = (mechanic) => {

    const id = mechanic?._id
    if (mechanic?.status === "pending") {
      rejectMechanic(id).then((res) => {
        console.log(res)
        if (res.data.success) {


          Swal.fire(res.data.message)
        }
        else {


          Swal.fire(res.data.message)
        }

      })


    }

  }
  const handleBlock = (mechanic) => {
    const id = mechanic?._id
    blockMechanic(id).then((res) => {
      if (res.data.success) {
        Swal.fire(res.data.message)
      }


    })
  }
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter mechanic data based on the search query
  const filteredMechanic = mechanic.filter((item) => {
    const name = item.name.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    return name.includes(searchLower);
  });




  return (
    <Card className="h-full w-fit mt-20 ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Mechanic Management
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

            </div>

        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0">
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
          {filteredMechanic?.map(
              (items, index) => {
                const isLast = index === mechanic.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={items.image}
                          alt={""}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                       
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {items.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {items.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <div className="flex items-center gap-3">
                       <img
                          src={items.certificate}
                          alt={""}
                          size="md"
                          className="border h-20 w-20 border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                       
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {items.status}
                      </Typography>
                    </td>
                    

                    <td className={classes}>
                      <Button size="sm" onClick={() => handleApprove(items)}>
                        Approve
                      </Button>
                    </td>
                    {items.status === "pending" ? (
                      <td className={classes}>
                        <Button size="sm" onClick={() => handleReject(items)}>
                          Reject
                        </Button>
                      </td>
                    ) : (
                      <td className={classes}>
                        <Button size="sm" onClick={() => handleBlock(items)}>
                          Block
                        </Button>
                      </td>
                    )}



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
  );
}