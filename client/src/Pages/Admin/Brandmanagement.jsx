
import {

    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,

    CardFooter,
    Avatar,
    IconButton,

    Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AddNewBrands, brandDelete, getAllBrands } from "../../Services/AdminApi";
import Modal from "react-modal";

import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["", "BrandName", "BasicPay", "Description", " ", "Actions", " "];
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "90%", // Adjust the maximum width as needed
        width: "400px", // Set a fixed width or use percentage
    },
};

export const Brandmanagement = () => {
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [basicPay, setBasicPay] = useState("")
    const [getBrands, setGetBrands] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [deleted, setDeleted] = useState("")
    const [image, setImage] = useState()
    const [searchInput, setSearchInput] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [brandsPerPage] = useState(5);
    const navigate = useNavigate()



    useEffect(() => {
        getAdminBrands();
    }, [deleted, modalIsOpen]);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const getAdminBrands = () => {
        getAllBrands().then((res) => {
            if (res.data.success) {
                // Filter brands based on searchInput
                const filteredBrands = res.data.result.filter((brand) =>
                    brand.brandName.toLowerCase().includes(searchInput.toLowerCase())
                );
                setGetBrands(filteredBrands);
            }
        });
    };

    const handleAddBrands = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('brand', brand)
        formData.append('description', description)
        formData.append('basicPay', basicPay)
        let { data } = await AddNewBrands(formData)

        if (data.success) {
            setBrand("")
            setDescription("")
            setBasicPay("")
            setImage('')
            Swal.fire(data.message);


        } else {
            console.log(data.errors, "error");
            Swal.fire(data.message);
        }

    };
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willdelete) => {
            if (willdelete) {
                let { data } = await brandDelete(id)
                if (data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    setDeleted(id)

                }
            }


        })
    }
    const handleEdit = (brand) => {

        navigate('/admin/editbrand', { state: { brand } })


    }
    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    const currentBrands = getBrands
        .filter((brand) =>
            brand.brandName.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(indexOfFirstBrand, indexOfLastBrand);
    const totalPages = Math.ceil(
        getBrands.filter((brand) =>
            brand.brandName.toLowerCase().includes(searchInput.toLowerCase())
        ).length / brandsPerPage
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <>
            <Card className="h-screen max-w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Brands
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                These are details
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="flex justify-end mb-4">
                                <Input
                                    type="text"
                                    placeholder="Search by brand name"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    icon={<MagnifyingGlassIcon />}
                                    color="lightBlue"
                                    size="regular"
                                    outline={true}
                                />
                            </div>

                            <Button size="sm" onClick={openModal}>
                                Add Brands
                            </Button>

                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-x-auto px-0">
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentBrands?.map((brand, index) => {

                                const isLast = index === getBrands.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={brand.brandName}>

                                        <td className={`${classes} p-4 md:p-2`}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {brand.brandName}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} p-4 md:p-2`}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {brand.basicPay}
                                            </Typography>
                                        </td>

                                        <td className={`${classes} p-4 md:p-2`}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {brand.description}
                                            </Typography>
                                        </td>

                                        <td className={`${classes} p-4 md:p-2`}>
                                            <img
                                                className="h-14 w-24 rounded-lg shadow-xl shadow-blue-gray-900/50"
                                                src={brand.image}
                                                alt="nature image"
                                            />
                                        </td>







                                        <td className={`${classes} p-4 md:p-2`}>
                                            <Button size="sm" onClick={() => handleEdit(brand)} > Edit</Button>
                                        </td>
                                        <td className={`${classes} p-4 md:p-2`}>
                                            <Button size="sm" onClick={() => handleDelete(brand._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </CardBody>


                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <IconButton
                                key={index}
                                variant={currentPage === index + 1 ? "outlined" : "text"}
                                color="blue-gray"
                                size="sm"
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </IconButton>
                        ))}
                    </div>
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </Button>
                </CardFooter>

            </Card>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="text-4xl font-bold flex-items-center">Add Brands</div>
                    <form onSubmit={handleAddBrands}>
                        <div className="mb-4">
                            <label
                                htmlFor="brand"
                                className="block font-bold mb-1"
                            >
                                Brand Name
                            </label>
                            <input
                                type="text"
                                id="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter brand name"
                                required
                            />
                        </div  >
                        <div className="mb-4">
                            <label
                                htmlFor="brand"
                                className="block font-bold mb-1"
                            >
                                Basic pay
                            </label>
                            <input
                                type="text"
                                id="brand"
                                value={basicPay}
                                onChange={(e) => setBasicPay(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter brand name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="brand"
                                className="block font-bold mb-1"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter the Description"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="brand" className="block font-bold mb-1">
                                Brand Logo
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
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                        >
                            submit
                        </button>
                        <button
                            onClick={closeModal}
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                        >
                            close
                        </button>
                    </form>

                </Modal>
            </div>

        </>
    );
}
