import React, { useEffect, useState } from "react";
import Loading from "../extraComponent/Loading";
import Carousel from "react-material-ui-carousel";
import toast from "react-hot-toast";
import "./ProductDetails.css";
import { clearError, getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import ReactStars from "react-rating-stars-component";
import { addItemsToCart } from "../../actions/cartAction";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  // const [open, setOpen] = useState(false);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);
  // const x = useSelector((state) => state.productDetails);
  // console.log("x", x);

  const options = {
    isHalf: true,
    color: "rgba(20,20,20,.1)",
    size: window.innerWidth > 1025 ? 25 : 18,
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const increaseQuantity = () => {
    if (product?.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    console.log(id, quantity);
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item added to Cart");
  };

  error && toast(error);
  if (error) return;

  return loading & product ? (
    <Loading />
  ) : (
    <>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product?.images &&
              product?.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product?.name}</h2>
            <p>Product ID: # {product?._id}</p>
          </div>
          <div className="detailsBlock-2">
            {!loading && <ReactStars {...options} />}
            <span className="detailsBlock-2-span">
              {" "}
              ({product?.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product?.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                disabled={product?.Stock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                {product?.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product?.description}</p>
          </div>

          <button
            // onClick={submitReviewToggle}
            className="submitReview"
          >
            Submit Review
          </button>
        </div>
      </div>

      {product?.reviews && product?.reviews[0] ? (
        <div className="reviews">
          {product?.reviews &&
            product?.reviews.map((review) => (
              <ReviewCard review={review} key={review?._id} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No reviews yet</p>
      )}
    </>
  );
};

export default ProductDetails;
