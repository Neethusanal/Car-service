import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  
    Button,
   
} from "@material-tailwind/react";
import { getMechBrands, updateDetails,  } from "../../Services/MechanicApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const MechanicApproval = () => {
    const [email,setEmail]=useState()
    const [brand, setBrand] = useState()
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [certificate, setCertificate] = useState("");
    const [brandData, setBrandData] = useState([])
    const navigate=useNavigate()
 
    useEffect(()=>{
        getBrands()
      
      },[])
      const getBrands = () => {
        getMechBrands().then((res) => {
    
            if (res.data.success) {
    
                setBrandData(res?.data?.result);
            }
        });
    };
    const handleDetails=(e)=>{

    const formData = new FormData();
    formData.append("email",email)
    formData.append("brand", brand);
    formData.append("qualification", qualification);
    formData.append("experience", experience);
    formData.append("certificate", certificate
    );
    try
    { let {data} =updateDetails(formData)
    console.log(data)
    if(data.success)
    {
      Swal.fire(data.message)
      navigate('mechanic/login')
      
       
      setQualification(data.result.qualification)
      setExperience(data.result.experience)
      setBrand(data.result.brandserved)
    }
    else{
      Swal.fire(data.error)
    }

    }catch(error)
    {
      console.log(error)
    }
  }
    return (
        <Card className="w-full max-w-[26rem] shadow-lg">
            <form onSubmit={handleDetails}>
                <CardHeader floated={false} color="blue-gray">
                    <h1>Complete the Mechanic Details</h1>

                </CardHeader>
                <CardBody>
                <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <textarea
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="address"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Qualification
                        </label>
                        <textarea
                            id="address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Experience
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="items" className="block font-bold mb-1">
                            Brand served
                        </label>
                        <select
                            id="items"
                            value={brand || ""}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Select the brand</option>
                            {brandData?.map((brand, index) => {
                                return (
                                    <option key={brand._id} value={brand._id}>{brand.brandName}</option>
                                )
                            })}


                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="brand" className="block font-bold mb-1">
                            Experience Certificate
                        </label>
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => setCertificate(e.target.files[0])}
                            className="file-input w-full max-w-xs"
                            required
                        />
                    </div>

                    


                </CardBody>
                <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true} type="submit" >
                        submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}