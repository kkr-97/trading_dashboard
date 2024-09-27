import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import BuyWindow from "./BuyWindow";
import StockContext from "../Contexts/StockContext";

const Dashboard = () => {
  const [isBuyWindowOpen, setBuyWindowState] = useState(false);
  const [stockDetails, setStockDetails] = useState({});

  const openBuyWindowOpen = (stock) => {
    setBuyWindowState(true);
    setStockDetails(stock);
  };

  const closeBuyWindow = () => {
    setBuyWindowState(false);
    setStockDetails({});
  };

  return (
    <div className="dashboard-container">
      <StockContext.Provider
        value={{
          openBuyWindowOpen: openBuyWindowOpen,
          closeBuyWindow: closeBuyWindow,
        }}
      >
        <WatchList />
        {isBuyWindowOpen && <BuyWindow stockDetails={stockDetails} />}
      </StockContext.Provider>

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
