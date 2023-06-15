import React from "react";
import { useState, useEffect } from "react";
import {Navbar,MobileNav,Typography,Button,IconButton} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { mechlogout } from "../Redux/MechanicSlice";
import { Link, useNavigate } from "react-router-dom";
 
export const MechanicNavbar=()=> {
  const [openNav, setOpenNav] = useState(false);
  const mechanic = useSelector((state) => state.mecanic);
  const [mechanicName, setMechanicName] = useState();
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(() => {
    setMechanicName(mechanic?.name)
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
  const handleLogout=()=>{
    dispatch(mechlogout());
    localStorage.removeItem("mechanictoken");
    navigate("/mechanic/login");
  }
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 bg-gray-500">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
         CAR CLINIC
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {mechanicName && (
          <div className="flex items-center">
            <Typography
              as="span"
              variant="button"
              className="mr-2 text-blue-gray-900"
            >
              Welcome, {mechanicName}
            </Typography>
            <Button
              variant="gradient"
              size="sm"
              onClick={handleLogout}
              className="hidden lg:inline-block"
            >
              Logout
            </Button>
          </div>
        )}
        {/* {!mechanicName && (
          <Button
            as={Link}
            to="/mechanic/login"
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            Login
          </Button>
        )} */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {/* Your menu icon */}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {mechanicName && (
            <Button
              variant="gradient"
              size="sm"
              fullWidth
              onClick={handleLogout}
              className="mb-2"
            >
              Logout
            </Button>
          )}
           {/* {!mechanicName && (
            <Button
              as={Link}
              to="/mechanic/login"
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
            >
              Login
            </Button> 
          )} */}
        </div>
      </MobileNav>
    </Navbar>
  );
}