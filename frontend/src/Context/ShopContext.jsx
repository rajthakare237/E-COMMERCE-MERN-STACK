import React, { createContext, useEffect, useState } from "react";

//create a context object names ShopContext, this object will be used to share data across components
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {}; // Initializes an empty cart object.
  for (let index = 0; index < 300 + 1; index++) { // Loops from 0 to 300 (inclusive).
    cart[index] = 0; // Initializes each item in the cart with a quantity of 0.
  }
  return cart; // Returns the initialized cart object.
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);  // State to store all product data fetched from the server.

  const [cartItems, setCartItems] = useState(getDefaultCart());  // State to store the cart items, initialized with default values.

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((resp) => resp.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
      console.log("total amount is : " + totalAmount);
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {  // Creates an object containing the values to be provided by the context.
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    
    <ShopContext.Provider value={contextValue}> {/*ShopContext.Provider makes the contextValue object (data and functions) available to all child components.*/}
      {props.children} {/*props.children renders the rest of the application, ensuring those components can access the shared context. */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
