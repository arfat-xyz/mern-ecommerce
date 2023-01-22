import React, { useEffect, useState } from "react";
import Loading from "../extraComponent/Loading";
import Carousel from "react-material-ui-carousel";
import toast from "react-hot-toast";
import "./ProductDetails.css";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import ReactStars from "react-rating-stars-component";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productContants";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  useEffect(() => {
    if (error) {
      dispatch(clearError());
      toast.error(error);
    }
    if (reviewError) {
      dispatch(clearError());
      toast.error(reviewError);
    }
    if (success) {
      toast.success("Review submitted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);
  // const x = useSelector((state) => state.productDetails);
  // console.log("x", x);

  const options = {
    size: "large",
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

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const reviewDetails = {
      rating,
      comment,
      productId: id,
    };
    dispatch(newReview(reviewDetails));
    setOpen(false);
  };

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
            {!loading && <Rating {...options} />}
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
            onClick={submitReviewToggle}
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className="reviewsHeading">REVIEWS</div>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
