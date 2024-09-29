import React from "react";

const StockContext = React.createContext({
  closeBuyWindow: () => {},
  openBuyWindowOpen: (stockDetails) => {},
  openSellWindow: (name) => {},
  closeSellWindow: () => {},
});

export default StockContext;
