import React from "react";
import { Routes, Route } from "react-router-dom";
import Mechlogin from "../Pages/Mechanic/Mechlogin";
import Mechregister from "../Pages/Mechanic/Mechregister";
import { Mechanicotp } from "../Pages/Mechanic/Mechanicotp";
import MechHome from "../Pages/Mechanic/MechHome";
import Mechaniclayout from "../Layout/Mechaniclayout";
import PrivateRoutes from "../ProtectedRoutes/PrivateRoutes";
import { Editprofile } from "../Pages/Mechanic/EditProfile";
import { MechanicApproval } from "../Pages/Mechanic/MechanicApproval";
import { SlotMechanic } from "../Pages/Mechanic/SlotMechanic";


const MechanicRoute = () => {
  return (
    <>
      <Routes>
        <Route exact path="/register" element={<Mechregister />} />
        <Route exact path="/login" element={<Mechlogin />} />
        <Route exact path="/otp" element={<Mechanicotp />} />
        <Route exact path="/details" element={< MechanicApproval/>} />
        <Route
          element={<PrivateRoutes role={"mechanic"} route={"/mechanic/login"} />}
        >
          <Route element={<Mechaniclayout />}>
            <Route exact path="/home" element={<MechHome/>} />
            <Route exact path="/updateprofile" element={<Editprofile/>} />
            <Route exact path="/mechanicslot" element={<SlotMechanic/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default MechanicRoute;
