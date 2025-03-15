import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/girl_img.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();

  const shopButtonClick = () => {
    navigate("/womens");
  }


  return (
    <div className="hero">
      <div className="hero-left">
        <h2>GET LATEST ARRIVALS</h2>
        <div>
          <p>Get, Set,</p>
          <p>Refresh Your Style!</p>
        </div>
        <div className="hero-latest-btn">
          <button className="shop-now-btn" onClick={()=> shopButtonClick()}>Shop Now</button>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img className="girl-image" src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
