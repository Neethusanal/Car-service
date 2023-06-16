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
import { useEffect, useState } from "react";
import { getAllMechanic } from "../../Services/AdminApi";

const TABLE_HEAD = ["Image", "Name", "Email" ,"Adminapproval",];


export const Adminmechmanagement = () => {
  const [mechanic, setMechanic] = useState()
  useEffect(() => {
    getAllMechanic().then((res) => {
      if (res.data.status == 'success') {
        setMechanic(res?.data?.result)
      }
    });
  }, []);



  return (
    <Card className="h-screen w-fit">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Mechanic Management
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the mechanics
            </Typography>
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
            {mechanic?.map(
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
                        {/* <Typography variant="small" color="blue-gray" className="font-bold">
                          {name}
                        </Typography> */}
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
                    {/* <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {items.brandsserved}
                      </Typography>
                    </td>  */}
                    
                    <td className={classes}>
                      <Button size="sm" >Approved</Button>
                      <Button size="sm"  >Reject</Button>
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
  );
}