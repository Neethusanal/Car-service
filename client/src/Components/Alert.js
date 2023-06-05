import React, { useEffect } from "react";
import { Alert, Button, Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../Redux/AlertSlice";

 
const Alerts=()=> {
  const [open, setOpen] = React.useState(false);
  const { show, type, message } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(()=>{
    let timeout
    if (show) {
        timeout = setTimeout(() => {
          dispatch(clearAlert());
        }, 5000);
    } return () => {
        clearTimeout(timeout);
    }
  }, [dispatch, show])
 
  return (
    
    <React.Fragment>
      {!open &&  (
        <Button
          color={type}
          className="absolute"
          onClick={() => setOpen(true)}
        >
          Show Alert
        </Button>
      )}
     
      <Alert
        open={open}
        color={type}
        className="max-w-screen-md"
        icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
        onClose={() => setOpen(false)}
      >
        <Typography variant="h5" color="white">
          {message}
        </Typography>
       
      </Alert>
    </React.Fragment>
  );
}
export default Alerts