import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  CardHeader,
  Button,
  Input,
} from "@material-tailwind/react";

export const MechHome = () => {
  return (
    <>
      <div className=" flex justify-center item-center ">
        <Card className="mt-14 w-m-full h-screen bg-yellow-100">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-16 place-items-center"
          >
            <Typography variant="h3" color="white">
              Profile
            </Typography>
          </CardHeader>
          <CardBody className="flex ">
            <div className="w-1/2">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              <div className="w-full max-w-xs mr-4">
                <img
                  className="h-32 w-32 rounded-full"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
              </div>
            </Typography>

            <Typography variant="h5" color="blue-gray" className="mb-2">
              <div className="flex items-center">
                <label htmlFor="name" className="block font-bold mb-1 mr-2">
                  Name
                </label>

                <input
                  type="text"
                  id="basic_pay"
                  name="basic_pay"
                  value={""}
                  className="w-72 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              </Typography>
              <Typography variant="h5" color="blue-gray" className="mb-2">
              <div className="flex items-center">
                <label htmlFor="name" className="block font-bold mb-1 mr-2">
                  Name
                </label>

                <input
                  type="text"
                  id="basic_pay"
                  name="basic_pay"
                  value={""}
                  className="w-72 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              </Typography>
              <Typography variant="h5" color="blue-gray" className="mb-2">
              <div className="flex items-center">
                <label htmlFor="name" className="block font-bold mb-1 mr-2">
                  Name
                </label>

                <input
                  type="text"
                  id="basic_pay"
                  name="basic_pay"
                  value={""}
                  className="w-72 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              </Typography>

             
</div>
              <div className="w-1/2">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                <div className="flex items-center">
                <label htmlFor="name" className="block font-bold mb-1 mr-2">
                  Email
                </label>

                <input
                  type="text"
                  id="basic_pay"
                  name="basic_pay"
                  value={""}
                  className="w-72 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
                </Typography>
              </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>Read More</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
