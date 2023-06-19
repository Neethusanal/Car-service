import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBanner } from "../../Services/AdminApi";
import Swal from "sweetalert2"
const Editbanners = () => {
    const [bannerName, setBannerName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [id, setId] = useState()
    const location = useLocation();
    const banner = location.state?.bannerdata;
    const navigate = useNavigate()
    console.log(banner, "editbannerpage");
    useEffect(() => {
        console.log("llllllllll");
        setBannerName?.(banner.bannerName)
        setImage?.(banner.image)
        setDescription?.(banner.description)
        setId?.(banner._id)
    }, []);
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
          } else {
            formData.append('image', banner.image); // Append previous image if no new image is added
          }
        formData.append('bannerName', bannerName)
        formData.append('description', description)
        formData.append('id', id)


        let { data } = await updateBanner(formData)



        if (data.success) {

            setBannerName("")
            setImage("")
            setDescription("")
            Swal.fire(data.message)
            navigate('/admin/banner')
        }
        else {
            console.log("else part executing")
            Swal.fire(data.message)

        }

    }



    return (
        <>
            <div class="flex flex-col items-center border-2 border-gray-600 p-6 mt-28  mx-auto max-w-md">
                <div class="text-4xl font-bold flex-items-center">Edit Banner</div>
                <form onSubmit={handleUpdate} >
                    <div class="mb-4">
                        <label for="brand" class="block font-bold mb-1">
                            Banner Name
                        </label>
                        <input type="text" id="brand" name="banner" value={bannerName} onChange={(e) => setBannerName(e.target.value)} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div class="mb-4">
                        <label for="basic_pay" class="block font-bold mb-1">
                            BannerImage
                        </label>
                        <input
                            type="file"
                            name='file'
                            onChange={(e) =>
                                setImage(e.target.files[0])
                            }
                            className="file-input w-full max-w-xs" required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block font-bold mb-1">
                            Description
                        </label>
                        <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <button type="submit" class="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false">
                        Update
                    </button>
                </form>
            </div>





        </>
    )
}

export default Editbanners