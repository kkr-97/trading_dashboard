import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cookie from "js-cookie";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import BuyWindow from "./BuyWindow";
import StockContext from "../Contexts/StockContext";
import SellWindow from "./SellWindow";

import ProtectedRoute from "./ProtectedRoute";

import axios from "axios";

const Dashboard = () => {
  const [isBuyWindowOpen, setBuyWindowState] = useState(false);
  const [isSellWindowOpen, setSellWindowOpen] = useState(false);
  const [stockDetails, setStockDetails] = useState({});

  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);

  const api = "https://trading-backend-hvvh.onrender.com";
  const token = Cookie.get("trading_token");

  const fetchHoldings = async () => {
    await axios
      .get(api + "/holdings", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setHoldings(res.data);
      });
  };

  const fetchOrders = async () => {
    await axios
      .get(api + "/orders", {
        headers: {
          "x-auth-token": Cookie.get("trading_token"),
        },
      })
      .then((res) => {
        setOrders(res.data);
      });
  };

  const fetchHoldingsAndOrders = () => {
    fetchHoldings();
    fetchOrders();
  };

  useEffect(() => {
    fetchHoldingsAndOrders();
  }, []);

  const openBuyWindowOpen = (stock) => {
    setSellWindowOpen(false);
    setBuyWindowState(true);
    setStockDetails(stock);
  };

  const closeBuyWindow = () => {
    fetchHoldingsAndOrders();
    setBuyWindowState(false);
    setStockDetails({});
  };

  const openSellWindow = (stock) => {
    setSellWindowOpen(true);
    setBuyWindowState(false);
    setStockDetails(stock);
  };

  const closeSellWindow = () => {
    fetchHoldingsAndOrders();
    setSellWindowOpen(false);

    setStockDetails({});
  };

  return (
    <div className="dashboard-container">
      <StockContext.Provider
        value={{
          openBuyWindowOpen: openBuyWindowOpen,
          closeBuyWindow: closeBuyWindow,
          openSellWindow: openSellWindow,
          closeSellWindow: closeSellWindow,
        }}
      >
        <WatchList />
        {isBuyWindowOpen && <BuyWindow stockDetails={stockDetails} />}
        {isSellWindowOpen && <SellWindow stockDetails={stockDetails} />}

        <div className="content">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <Summary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders orders={orders} fetchOrders={fetchOrders} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/holdings"
              element={
                <ProtectedRoute>
                  <Holdings holdings={holdings} fetchHoldings={fetchHoldings} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/positions"
              element={
                <ProtectedRoute>
                  <Positions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/funds"
              element={
                <ProtectedRoute>
                  <Funds />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apps"
              element={
                <ProtectedRoute>
                  <Apps />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </StockContext.Provider>
    </div>
  );
};

export default Dashboard;
