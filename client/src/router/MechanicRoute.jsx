import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Mechlogin from '../Pages/Mechanic/Mechlogin'
import Mechregister from '../Pages/Mechanic/Mechregister'
import { Mechanicotp } from '../Pages/Mechanic/Mechanicotp'
import  MechHome  from '../Pages/Mechanic/MechHome'
import Mechaniclayout from '../Layout/Mechaniclayout'




const MechanicRoute = () => {
  return (
    <>
    <Routes>
    <Route exact path='/register' element={<Mechregister/>}/>
    <Route exact path='/login' element={<Mechlogin/>}/>
    <Route exact path='/otp' element={<Mechanicotp/>}/>
    <Route element={<Mechaniclayout/>}>
     <Route exact path='/home' element={<MechHome/>}/>
    </Route>
    </Routes>
    </>
  )
}

export default MechanicRoute