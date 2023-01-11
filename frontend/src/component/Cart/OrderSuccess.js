import { Typography } from "@mui/material";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";
const OrderSuccess = () => {
  localStorage.setItem("cartItems", JSON.stringify([]));
  return (
    <>
      <div className="orderSuccess">
        <BsCheckCircle />
        <Typography>Your Order has been placed successfully</Typography>
        <Link to={`/orders`}>View Order</Link>
      </div>
    </>
  );
};

export default OrderSuccess;
