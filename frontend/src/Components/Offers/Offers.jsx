import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";
import { useNavigate } from "react-router-dom";

const Offers = () => {

  const navigate = useNavigate();

  const checkoutButton = () => {
    navigate("/womens")
  }

  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Special</h1>
        <h1>Offers for You</h1>
        <p>Best Sellers Only!</p>
        <button className="checkout-btn" onClick={()=> checkoutButton()}>Checkout</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
