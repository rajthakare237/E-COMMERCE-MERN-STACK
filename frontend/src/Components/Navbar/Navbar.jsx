import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/e-com-logo.jpg";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();  //getting current location
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);  //get total cart items from context

  //const menuRef = useRef(); creates a mutable ref object that can persist a value across renders, often used to directly access a DOM element.
  const menuRef = useRef();

  const dropdown_toggle = (e) => { // Function to toggle dropdown menu
    menuRef.current.classList.toggle("nav-menu-visible"); //toggling visibility of menu
    e.target.classList.toggle("open"); //toggling open class of dropdown icon
  };

  useEffect(()=>{
    // alert(location.pathname.toString());
    if(location.pathname==="/womens") {setMenu("womens");}
    else if(location.pathname==="/") {setMenu("shop");}
    else if(location.pathname==="/kids") {setMenu("kids");}
    else if(location.pathname==="/mens") {setMenu("mens");}
    else {setMenu("")}
  },[location.pathname])

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img className="e-com-logo" src={logo} alt="" />
        <p>Snapkart</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>{" "}
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>{" "}
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>

        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
