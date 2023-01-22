import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
const Product = ({ product }) => {
  // console.log(product);
  const options = {
    size: "large",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      {/* <MetaData title={product.name} /> */}
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />

        <p>{product.name}</p>
        <div>
          <Rating {...options} /> <span>({product.numOfReviews} reviews)</span>
        </div>
        <span>{product.price}</span>
      </Link>
    </>
  );
};

export default Product;
