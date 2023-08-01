import { useState, useEffect } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { adminlogout } from "../Redux/AdminSlice";
import { useNavigate } from "react-router-dom";

export const AdminNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const admin = useSelector((state) => state.admin);
  const [adminEmail, setAdminEmail] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    setAdminEmail(admin.email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    dispatch(adminlogout());
    navigate("/admin/login");
  };

  const navList = (
    <ul className="mb-1 mt-1 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">
      <Typography as="li" variant="small" color="white" className="p-1 font-normal">
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography as="li" variant="small" color="white" className="p-1 font-normal">
        <a href="#" className="flex items-center">
          Account 
        </a>
      </Typography>
     
      <Typography as="li" variant="small" color="white" className="p-1 font-normal">
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="fixed top-0 left-0 w-full h-28 bg-gray-700 z-50">
      <div className="container mx-auto px-4 py-0 lg:px-8 lg:py-1 flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1 font-medium text-lg text-white">
          CAR CLINIC
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <div className="flex flex-col items-center lg:items-end">
          <p className="mb-1">
            <span className="text-sm">{adminEmail}</span>
          </p>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={handleLogout}>
            <span>Logout</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
};
