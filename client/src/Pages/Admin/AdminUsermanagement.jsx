import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    
    CardFooter,
    
    Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../Services/AdminApi";
import Swal from "sweetalert2"
import { blockUser } from "../../Services/AdminApi";



const TABLE_HEAD = ["Name", "Email", "phonenumber", "  ", " ", "Actions"];


export const AdminUsermanagement = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    useEffect(() => {
        getAdminUser()

    }, [currentPage]);
    useEffect(() => {
        handleFiltering(); 
      }, [searchQuery]);

    const getAdminUser = () => {
        const limit = 3;
        getAllUsers({ page: currentPage, limit: limit }).then((res) => {
            if (res.data.status == "success") {
                console.log(res.data.result, "ddddddd")
                setUsers(res?.data?.result)
                setTotalPages(res?.data?.result?.totalPages);
            }
        });
    }
    const handleBlock = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You wont be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, block it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let { data } = await blockUser(id)
                if (data.success) {
                    Swal.fire(
                        'Blocked!',
                        'User has been blocked.',
                        'success'
                    )
                }
            }
        })


    }
    const handleFiltering = () => {
        if (!searchQuery) {
          setFilteredUsers(users); // If searchQuery is empty, show all users
        } else {
          const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredUsers(filtered); // If searchQuery is not empty, filter the users
        }
      };
    

    return (

        <Card className="h-screen w-fit mt-20">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Customers
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
                    {filteredUsers?.map(
                            ({ _id, name, email, mobile }, index) => {
                                const isLast = index === users.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                              
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {name}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {mobile}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                { }
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                { }
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Button size="sm" onClick={() => handleBlock(_id)}>Block</Button>
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
    );
}