import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { updateService } from '../../Services/AdminApi';
import Swal from "sweetalert2"

export const EditService = () => {
    console.log("editservice page");
    const [serviceName, setServiceName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [id, setId] = useState()
    const location = useLocation();
    const service = location.state?.service;
    const navigate = useNavigate()

    useEffect(() => {

        setServiceName?.(service.serviceName)
        setImage?.(service.image)
        setDescription?.(service.description)
        setId?.(service._id)
    }, []);
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('serviceName', serviceName)
        formData.append('description', description)
        formData.append('id', id)
        formData.append('image', image);
        let { data } = await updateService(formData)

        if (data.success) {
            Swal.fire(data.message)

            Swal.fire(data.message)
            navigate('/admin/services')

        }
        else {
         
            Swal.fire(data.message)

        }

    }


    return (
        <div>
            <div class="flex flex-col items-center border-2 border-gray-600 p-6 mt-28  mx-auto max-w-md">
                <div class="text-4xl font-bold flex-items-center">Edit Services</div>
                <form onSubmit={handleUpdate} >
                    <div class="mb-4">
                        <label for="brand" class="block font-bold mb-1">
                            Service Name
                        </label>
                        <input type="text" id="brand" name="brand" value={serviceName} onChange={(e) => setServiceName(e.target.value)} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div class="mb-4">
                        <label for="basic_pay" class="block font-bold mb-1">
                            ServiceImage
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
        </div>
    )
}
