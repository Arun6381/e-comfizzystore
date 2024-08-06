/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Import the CSS file

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  const onCheckout = () => {
    navigate("/payment");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>{" "}
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty</p>
        </>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} - ${item.price}
              </span>
              <img src={item.imageUrl} alt={item.name} />
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <>
          <button className="checkout-button" onClick={onCheckout}>
            Checkout
          </button>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <button
            className="checkout-button"
            onClick={() => removeFromCart(cartItems.id)}
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
