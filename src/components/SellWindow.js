import React, { useContext, useState } from "react";
import StockContext from "../Contexts/StockContext";

import axios from "axios";

const SellWindow = ({ stockDetails }) => {
  const [qty, setQty] = useState(1);

  const { details } = stockDetails;
  const { name, price } = details;

  const { closeSellWindow } = useContext(StockContext);

  const onClickSellStock = async () => {
    await axios.post("http://localhost:3002/sellStock", { name, qty, price });
    closeSellWindow();
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
      <header className="buyWindow bg-danger px-3 py-1">
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
      <div className="btns-container">
        <button
          className="btn btn-blue"
          onClick={onClickSellStock}
          type="button"
        >
          Sell
        </button>
        <button className="btn border-none" onClick={closeSellWindow}>
          close
        </button>
      </div>
    </form>
  );
};

export default SellWindow;