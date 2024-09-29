import React, { useContext, useState } from "react";
import StockContext from "../Contexts/StockContext";
import Cookie from "js-cookie";

import axios from "axios";

const BuyWindow = ({ stockDetails }) => {
  const [qty, setQty] = useState(1);

  const { closeBuyWindow } = useContext(StockContext);

  const { details } = stockDetails;
  const { name, price, percent } = details;

  const onClickBuyStock = async () => {
    await axios
      .post(
        "https://trading-backend-hvvh.onrender.com/buyStock",
        {
          name: name,
          price: price,
          qty: qty,
          net: percent,
        },
        {
          headers: {
            "x-auth-token": Cookie.get("trading_token"),
          },
        }
      )
      .then((res) => alert(res.data.message))
      .catch((e) => alert(e.response.data.target));

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
      onSubmit={(e) => e.preventDefault()}
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
