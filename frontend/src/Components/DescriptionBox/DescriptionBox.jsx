import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews(122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is an online platform that allows businesses and
          individuals to buy and sell products or services over the internet. It
          facilitates online transactions, providing users with the ability to
          browse products, compare prices, and make purchases from the comfort
          of their homes.
        </p>
        <p>
          The primary advantages of e-commerce websites include convenience, a
          broader reach to global customers, and reduced operational costs for
          businesses compared to traditional brick-and-mortar stores.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
