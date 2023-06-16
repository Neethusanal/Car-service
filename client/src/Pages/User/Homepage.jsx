
import Navbar from '../../Components/Navbar'

import { UserBanner } from '../../Components/UserBanner';
import { UserServices } from '../../Components/UserServices';



export const Homepage = () => {
  
  return (
    <div>
      <Navbar/>
      <UserBanner/>
      <UserServices/>
      
    </div>
  )
}
