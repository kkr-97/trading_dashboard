import React, { useState, useContext } from "react";

import { watchlist } from "../data/data";
import { Tooltip, Grow } from "@mui/material";

import StockContext from "../Contexts/StockContext";

import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  TrendingUp,
  MoreHorizOutlined,
} from "@mui/icons-material";

const Actions = (details) => {
  const { openBuyWindowOpen, openSellWindow } = useContext(StockContext);

  const handleBuy = () => {
    openBuyWindowOpen(details);
  };

  const handleSell = () => {
    openSellWindow(details);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuy}>
            Buy
          </button>
        </Tooltip>
        <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={handleSell}>
            Sell
          </button>
        </Tooltip>
        <Tooltip
          title="Analytics"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <TrendingUp className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHorizOutlined className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

const WatchItem = ({ details, index }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="item"
    >
      <p className={details.isDown ? "down" : "up"}>{details.name}</p>
      <div className="itemInfo">
        <span className={"percent " + (details.isDown ? "down" : "up")}>
          {details.percent}{" "}
          {details.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
        </span>
        <span
          style={{ marginLeft: "16px" }}
          className={"price " + (details.isDown ? "down" : "up")}
        >
          {details.price}
        </span>
      </div>
      {showActions && <Actions details={details} />}
    </li>
  );
};

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((item, index) => (
          <WatchItem key={index} details={item} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
