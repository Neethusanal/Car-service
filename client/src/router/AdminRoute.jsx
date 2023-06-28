import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Adminlogin } from '../Pages/Admin/Adminlogin'
import { Admindashboard } from '../Pages/Admin/Admindashboard'
import { Adminmechmanagement } from '../Pages/Admin/Adminmechmanagement.jsx'
import { Adminlayout } from '../Layout/Adminlayout'
import { AdminUsermanagement } from '../Pages/Admin/AdminUsermanagement'
import { Brandmanagement } from '../Pages/Admin/Brandmanagement.jsx'
import { Modelmanagement } from '../Pages/Admin/ModelManagement'
import { Servicemanagement } from '../Pages/Admin/Servicemanagement'
import EditBrand from '../Pages/Admin/EditBrand'
import { EditService } from '../Pages/Admin/EditService'
import { Banner } from '../Pages/Admin/Banner'
import { ServiceList } from '../Pages/Admin/ServiceList'
import Editbanners from '../Pages/Admin/Editbanners'
import PrivateRoutes from '../ProtectedRoutes/PrivateRoutes'
import { Location } from '../Pages/Admin/Location'








const AdminRoute = () => {
  return (
    <>
      <Routes>


        <Route exact path='/login' element={<Adminlogin />} />
        <Route element={<PrivateRoutes role={"admin"} route={"/admin/dashboard"} />}>
          <Route element={<Adminlayout />}>
            <Route exact path='/dashboard' element={<Admindashboard />} />
            <Route exact path='/mechanic' element={<Adminmechmanagement />} />
            <Route exact path='/customers' element={<AdminUsermanagement />} />
            <Route exact path='/brands' element={<Brandmanagement />} />
            <Route exact path='/models' element={<Modelmanagement />} />
            <Route exact path='/services' element={<Servicemanagement />} />
            <Route exact path='/editbrand' element={<EditBrand />} />
            <Route exact path='/editservice' element={<EditService />} />
            <Route exact path='/banner' element={<Banner />} />
            <Route exact path='/editbanner' element={<Editbanners />} />
            <Route exact path='/servicelist' element={<ServiceList />} />
            <Route exact path='/location' element={<Location />} />



          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoute