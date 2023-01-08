import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import "./Cart.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CartItemCard from "./CartItemCard.js";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// const item = {
//   product: "arfat",
//   price: 200,
//   name: "arfat",
//   image: `https://i.ibb.co/PZZDNf3/tesla-mode-x.jpg`,
//   quantity: 10,
// };

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems);
  const increaseQuantity = ({ product: id, quantity, stock }) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = ({ product: id, quantity, stock }) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const deleteCartItems = (id) => dispatch(removeItemsFromCart(id));
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  // console.log(cartItems);
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No product in your cart</Typography>
          <Link to={"/products"}> View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput">
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    autoComplete="off"
                  />
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>
                <p className="cartSubtotal">{`$ ${
                  item.price * item.quantity
                }`}</p>
              </div>
            ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </p>
              </div>
              <div>
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
