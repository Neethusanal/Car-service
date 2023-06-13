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
import { getAllUsers } from "../../Services/AdminApi";
import Swal from "sweetalert2"
import { blockUser } from "../../Services/AdminApi";



const TABLE_HEAD = ["Name", "Email", "phonenumber", "services", "  " ,"Actions"];


export const AdminUsermanagement = () => {
    const [users, setUsers] = useState()
    useEffect(() => {
        getAdminUser()
       
    }, []);

    const getAdminUser = () => {
        getAllUsers().then((res) => {
            console.log("getUsers")
            console.log(res.data)
            if (res.data.status == "success") {
                console.log(res.data.result, "ddddddd")
                setUsers(res?.data?.result)
            }
        });
    }
    const handleBlock = (id) => {
        console.log(id, "iddddd")
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

    return (

        <Card className="h-screen w-fit">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Customers
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            These are details
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        

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
                        {users?.map(
                            ({ _id, name, email, mobile }, index) => {
                                const isLast = index === users.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                {/* <Avatar
                                                    src={""}
                                                    alt={name}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                /> */}
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
                    <IconButton variant="text" color="blue-gray" size="sm">
                        ...
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" size="sm">
                        8
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" size="sm">
                        9
                    </IconButton>
                    <IconButton variant="text" color="blue-gray" size="sm">
                        10
                    </IconButton>
                </div>
                <Button variant="outlined" color="blue-gray" size="sm">
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
}