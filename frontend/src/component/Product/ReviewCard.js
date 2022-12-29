import React from "react";
import profilePng from "../../images/Profile.png";
import ReactStars from "react-rating-stars-component";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth > 1025 ? 25 : 18,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
