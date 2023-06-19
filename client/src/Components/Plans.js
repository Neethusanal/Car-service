import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter
  } from "@material-tailwind/react";

export const Plans = () => {

  return (
    <>
    <div className='py-20 px-20 '>
<Card className="w-96  white">
      <CardHeader shadow={false} floated={false} className="h-96 bg-gray-300" >
      
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium text-black">
            Apple AirPods
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            $95.00
          </Typography>
        </div>
       
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-black text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
    </div>
    </>
  )
}
