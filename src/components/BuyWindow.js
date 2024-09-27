import React, { useContext, useState } from "react";
import StockContext from "../Contexts/StockContext";

import axios from "axios";

const BuyWindow = ({ stockDetails }) => {
  const [qty, setQty] = useState(1);
  const [userPrice, setUserPrice] = useState(0.0);

  const { closeBuyWindow } = useContext(StockContext);

  const { details } = stockDetails;
  const { name, price } = details;

  const onClickBuyStock = () => {
    axios.post("http://localhost:3002/buyStock", {
      name: name,
      price: userPrice,
      qty: qty,
      mode: "Buy",
    });

    alert("Stock Purchased");

    closeBuyWindow();
  };

  return (
    <form
      className="rounded-top bg-light"
      style={{
        position: "absolute",
        bottom: "20px",
        left: "480px",
        width: "320px",
        zIndex: "10",
      }}
    >
      <header className="buyWindow bg-primary px-3 py-1">
        <h4 className="stockName text-white">{name}</h4>
        <p className="text-white">INR {price}/-</p>
      </header>
      <div className="qty-container form-control d-flex flex-column">
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          type="number"
        />
      </div>
      <div className="price-container form-control d-flex flex-column">
        <label htmlFor="price">price</label>
        <input
          id="price"
          value={userPrice}
          onChange={(e) => setUserPrice(e.target.value)}
          type="number"
        />
      </div>
      <div className="btns-container">
        <button className="btn btn-blue" onClick={onClickBuyStock}>
          Buy
        </button>
        <button className="btn border-none" onClick={closeBuyWindow}>
          close
        </button>
      </div>
    </form>
  );
};

export default BuyWindow;
