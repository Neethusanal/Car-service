
import Navbar from '../../Components/Navbar'

import { UserBanner } from '../../Components/UserBanner';
import { UserBrands } from '../../Components/UserBrands';
import { UserServices } from '../../Components/UserServices';



export const Homepage = () => {
  
  return (
    <div>
      <Navbar/>
      <UserBanner/>
      <UserServices/>
      <UserBrands/>
      
    </div>
  )
}
