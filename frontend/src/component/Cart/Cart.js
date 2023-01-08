import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
// const item = {
//   product: "arfat",
//   price: 200,
//   name: "arfat",
//   image: `https://i.ibb.co/PZZDNf3/tesla-mode-x.jpg`,
//   quantity: 10,
// };

const Cart = () => {
  const dispatch = useDispatch();
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
  return (
    <>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        {cartItems.map((item) => (
          <div className="cartContainer" key={item.product}>
            <CartItemCard item={item} />
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
            <p className="cartSubtotal">{`$ ${item.price * item.quantity}`}</p>
          </div>
        ))}
        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`10000`}</p>
          </div>
          <div>
            <div className="checkOutBtn">
              <button>Check Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
