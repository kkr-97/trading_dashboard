import React from "react";

const StockContext = React.createContext({
  closeBuyWindow: () => {},
  openBuyWindowOpen: (stockDetails) => {},
});

export default StockContext;
