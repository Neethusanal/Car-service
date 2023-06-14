import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  CardHeader,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

export const Editprofile = () => {
  const mechanic = useSelector((state) => state.mechanic)
  console.log(mechanic)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const[brand ,setBrand]=useState()
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [certificate, setCertificate] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(()=>{
    setFullName(mechanic.name)
     setEmail(mechanic.email)
     setPhone(mechanic.phone)
  },[])
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleEditProfileImage = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setProfileImage(null);
  };
  return (
    <>
      <div className=" justify-item items-center w-auto h-24 ">
        <Card className="mt-14 bg-gray-300">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid place-items-center w-m-full "
          >
            <Typography variant="h3" color="white">
              Profile
            </Typography>
          </CardHeader>
          <CardBody>
            <form>
            <div className="container w-auto ml-10 ">
              <div className="h-32">
                <div className="flex items-center mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src="/default-profile-image.jpg" // Replace with your default profile image
                      alt="Profile"
                      className="w-32 h-20 object-cover"
                    />
                    {isEditMode && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <label
                          htmlFor="profileImage"
                          className="text-white cursor-pointer"
                        >
                          Change Photo
                          <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {!isEditMode && (
                    <button
                      type="button"
                      className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      onClick={handleEditProfileImage}
                    >
                      Edit Photo
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                <label
                  htmlFor="phone"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Brand work for
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
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
            </div>
            <Button  >save</Button>
          </form>

          </CardBody>
         
        </Card>
      </div>
    </>
  );
};
