import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import { BsFillChatDotsFill } from 'react-icons/bs';
import { addReview, createChatWihMechanic, getExpertMechanic } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddReview from '../../Components/AddReview';
 import { AiOutlineCheck } from 'react-icons/ai'


export const Staff = () => {
  const user = useSelector((state) => state.user)
  const [staff, setStaff] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getStaff()

  }, [])

  const handleAddReview = (newReview, mechanicId) => {
    console.log(newReview,"newreview")
    console.log(mechanicId,"mechanicId")
    //Assuming a function called "addReview" to handle backend communication
    addReview({ newReview, mechanicId})
      .then((response) => {
        // Update the reviews for the specific mechanic
        const updatedStaff = staff.map((mechanic) =>
          mechanic._id === mechanicId
            ? { ...mechanic, reviews: [...mechanic.reviews, response.data] }
            : mechanic
        );
        setStaff(updatedStaff);
      })
      .catch((error) => {
        // Handle error if the review submission fails
        console.error('Error adding review:', error);
      });
  };


  const handleClick = (mechanic) => {
    navigate('/bookslot', { state: { mechanic } })
  }

  const getStaff = () => {
    getExpertMechanic().then((res) => {
      if (res.data.success) {
        setStaff(res.data.result)
      }
    })
  }
  const handleChat = (id) => {
    const { data } = createChatWihMechanic({ senderId: user.id, recieverId: id })
    navigate('/chat');
  };

  return (
    <div>

      <div className="flex flex-wrap">
        {staff.map((mechanic, index) => {
          return (
            <Card className="mt-20 ml-14 w-auto flex">
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={mechanic.image} className="h-72 w-80 sm:w-auto md:w-auto lg:w-auto" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Name:{mechanic.name}
                </Typography>
                <Typography>
                  Qualification:{mechanic.qualification}
                </Typography>
                <Typography>
                  Experience: {mechanic.experience}
                </Typography>
                <Typography>
                  Review:
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 ">
                <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded"onClick={() => handleClick(mechanic)}><AiOutlineCheck /></button>
                <button className='ml-5 px-4 py-2 text-sm font-medium text-white bg-black rounded' onClick={() => handleChat(mechanic._id)}><BsFillChatDotsFill /></button>
              
              </CardFooter>
              <container>
                <h2>Add Reviews</h2>
                <hr/>
                <AddReview onSubmitReview={(newReview) => handleAddReview(newReview, mechanic._id)} />
              </container>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
