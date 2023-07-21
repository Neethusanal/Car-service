import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { BsFillChatDotsFill } from 'react-icons/bs';
import { addReview, createChatWihMechanic, getAllReview, getExpertMechanic } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddReview from '../../Components/AddReview';
 import { AiOutlineCheck } from 'react-icons/ai'


export const Staff = () => {
  const user = useSelector((state) => state.user)
  const [staff, setStaff] = useState([])
  const [allReviews, setAllReviews] = useState({});
 
  const [mechanic,setMechanic]=useState()
  const navigate = useNavigate([])
  useEffect(() => {
    getStaff()

  }, [])
 
 
  


  const handleAddReview = (newReview, mechanicId) => {
    console.log(newReview,"newreview")
  
 
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
  const handleShowReview=(mechanicid)=>{
    console.log(mechanicid)
    
    getAllReview(mechanicid).then((res)=>{
      console.log(res.data)
      setAllReviews(res.data.result)
      
    })
  }
  
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
                  Rating:{mechanic.averageRating}
                
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
                <button
        className="ml-5 px-4 py-2 text-sm font-medium text-white bg-black rounded"
        onClick={() => handleShowReview(mechanic._id)}
      >
       
      </button>
      { allReviews.length && (
        <div>
          {/* Loop through the mechanic.reviews array and display each review */}
          {allReviews?.map((review, reviewIndex) => (
            <div key={reviewIndex}>
        {/* Display the review content, e.g., review.message, review.rating, etc. */}
         <p className='font-bold'>{review.user.name}</p> 
        <p>{review.message}</p>
      
      </div>
    ))}
        </div>
      )}

              </container>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
