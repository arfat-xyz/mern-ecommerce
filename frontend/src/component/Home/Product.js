import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const Product = ({ product }) => {
  console.log(product);
  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    value: product.ratings / 2,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <>
      <Link className="productCard" to={product._id}>
        <img src={product.images[0].url} alt={product.name} />

        <p>{product.name}</p>
        <div>
          <ReactStars {...options} /> <span>(222 reviews)</span>
        </div>
        <span>{product.price}</span>
      </Link>
    </>
  );
};

export default Product;
