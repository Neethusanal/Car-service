import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBrand } from "../../Services/AdminApi";
import Swal from "sweetalert2"
const EditBrand = () => {
    const [brandName,setBrandName]=useState('')
    const [basicPay,setBasicPay]=useState('')
    const [description,setDescription]=useState('')
    const[image,setImage]=useState()
    const [id,setid]=useState()
  const location = useLocation();
  const brand = location.state?.brand;
  const navigate=useNavigate()
  console.log(brand, "editbrandpage");
  useEffect(() => {
    console.log("llllllllll");
    setBrandName?.(brand.brandName)
    setBasicPay?.(brand.basicPay)
    setDescription?.(brand.description)
    setid?.(brand._id)
    setImage?.(brand.image)
  }, []);
  const handleUpdate=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('brandName',brandName)
    formData.append('description',description)
    formData.append('id',id)
    formData.append('basicPay', basicPay)
    formData.append('image', image);
   let {data}=  await updateBrand(formData)
       
        console.log(data,"updatebranddddddddddddddd");
      
        if (data.success) {
            Swal.fire(data.message)
            navigate('/admin/brands')
        }
        else
        {   console.log("else part executing")
            Swal.fire(data.message)
          
        }
    
}

    

  return <div>

<div class="flex flex-col items-center border-2 border-gray-600 p-6 mt-28  mx-auto max-w-md">
    <div class="text-4xl font-bold flex-items-center">Edit Brands</div>
    <form onSubmit={handleUpdate}>
        <div class="mb-4">
            <label for="brand" class="block font-bold mb-1">
                Brand Name
            </label>
            <input type="text" id="brand" name="brand" value={brandName}  onChange={(e) => setBrandName(e.target.value)} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mb-4">
            <label for="basic_pay" class="block font-bold mb-1">
                Basic Pay
            </label>
            <input type="text" id="basic_pay" name="basic_pay" value={basicPay}  onChange={(e) => setBasicPay(e.target.value)}class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mb-4">
            <label for="description" class="block font-bold mb-1">
                Description
            </label>
            <input type="text" id="description" name="description" value={description}  onChange={(e) => setDescription(e.target.value)}class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mb-4">
            <label for="basic_pay" class="block font-bold mb-1">
                BrandImage
            </label>
            <input
                  type="file"
                  name='file'
                  onChange={(e) =>
                    setImage( e.target.files[0] )
                  }
                  className="file-input w-full max-w-xs" required
                />
        </div>
        <button type="submit" class="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false">
            Update
        </button>
    </form>
</div>

  </div>;
};

export default EditBrand;
