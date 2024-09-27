import React, { useContext } from "react";
import StockContext from "../Contexts/StockContext";

const BuyWindow = () => {
  const { closeBuyWindow } = useContext(StockContext);
  return (
    <div
      className=""
      style={{ position: "absolute", bottom: 0, left: "480px" }}
    >
      BuyWindow
      <button onClick={closeBuyWindow}>close</button>
    </div>
  );
};

export default BuyWindow;
