import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Rating } from "@material-tailwind/react";
import { FaCheck } from 'react-icons/fa';
const AddReview = ({ onSubmitReview }) => {
    const user = useSelector((state) => state.user)
  const [name, setName] = useState(user.name); // Using user's name as the default value
  const [rating, setRating] = useState(0); // Default rating set to 5
  const [comment, setComment] = useState('');


  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any validation here before submitting the review

    const newReview = {
      name,
      rating,
      comment,
      date: new Date().toISOString(), // You can use a library like moment.js for more advanced date formatting
    };

    // Call the parent component's onSubmitReview function to submit the review
    onSubmitReview(newReview);

    // Clear the form fields after submitting
    setName(user.name); // Reset the name field to user's name
    setRating('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='ml-4'> 
        <label className='font-extrabold' htmlFor="name">
          {user.name}
        </label>
      </div>
      <div className='ml-4'> 
        <label>Rating:</label>
        <Rating
          count={5}
          value={rating}
          onChange={handleRatingChange}
          size={22}
          color="#ffd700" // Set the color of the active stars (in this case, gold)
        />
      </div>
      <div className='ml-4'> 
        <label htmlFor="comment">Comment:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            className='border border-gray-500'
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            required
          />
          <button className="px-2 py-1 ml-2 text-xs font-medium  text-black justify-center bg-white rounded">submit</button>
        </div>
      </div>
    </form>
  );
};

export default AddReview;
