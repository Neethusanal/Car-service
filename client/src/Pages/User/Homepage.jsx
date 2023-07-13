
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar'
import { UserBanner } from '../../Components/UserBanner';
import { UserBrands } from '../../Components/UserBrands';
import { UserServices } from '../../Components/UserServices';

import useAuthUser from '../../hooks/UseAuthuser';




export const Homepage = () => {

useAuthUser()
  return (
    <div>
      
      <UserBanner />
      <UserServices />
      <UserBrands />
    </div>
  )
}
