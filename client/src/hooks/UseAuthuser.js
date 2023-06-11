import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../Services/UserApi";




function useAuthUser(){
    const dispatch = useDispatch();
    useEffect(() => {
      
      authUser().then((response) => {
            if (!response.data.auth) {
              dispatch(logout())
              // localStorage.clear("token")
             
            } else {
              dispatch(login(response.data));
             

            }
          });
    }, []);

   
  
}

export default useAuthUser;