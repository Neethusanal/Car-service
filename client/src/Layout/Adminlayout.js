import React from "react";



import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../Components/AdminNavbar";
import { Adminsidebar } from "../Components/Adminsidebar";


export const Adminlayout = () => {
  return (
    <>
      
       
        <AdminNavbar />
        <div className="flex">
          <div className="bg-black min-h-screen ">
          <Adminsidebar/>
          </div>
        
        <div className="mx-auto">
        <Outlet/>
        </div>
      </div>
    
    </>
  );
};
