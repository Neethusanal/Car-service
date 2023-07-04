import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../Services/UserApi";
import { setUserDetails, userlogin, userlogout } from "../Redux/UserSlice";




function useAuthUser(){
    const dispatch = useDispatch();
    useEffect(() => {
      
      authUser().then((response) => {
            if (!response.data.auth) {
              dispatch(userlogout())
              localStorage.clear("token")
             
            } else {
              dispatch(setUserDetails(response.data));
             

            }
          });
    }, []);

   
  
}

export default useAuthUser;