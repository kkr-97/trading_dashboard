import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";

const Holdings = ({ holdings, fetchHoldings }) => {
  const newHoldings = holdings.map((item) => {
    const curVal = (item.price * item.qty).toFixed(2);
    const isProfit = item.price - item.avg >= 0;
    const profitClass = isProfit ? "profit" : "loss";
    const pnl = ((item.price - item.avg) * item.qty).toFixed(2);
    const isDayProfitClass = item.day[0] === "+" ? "profit" : "loss";
    const isNetProfit = item.net[0] === "+" ? "profit" : "loss";
    return {
      ...item,
      curVal,
      isProfit,
      pnl,
      profitClass,
      isDayProfitClass,
      isNetProfit,
    };
  });

  const GraphicalRepresentation = () => {
    const uData = newHoldings.map((item) => item.price);
    const xLabels = newHoldings.map((item) => item.name);

    return (
      <BarChart
        height={400}
        series={[{ data: uData, id: "pvId" }]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    );
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <h3 className="title">Holdings {holdings.length}</h3>
        <button className="refresh-btn" onClick={fetchHoldings}>
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {newHoldings.map((holding, index) => {
              return (
                <tr key={index}>
                  <td>{holding.name}</td>
                  <td>{holding.qty}</td>
                  <td>{holding.avg}</td>
                  <td>{holding.price}</td>
                  <td>{holding.curVal}</td>
                  <td className={holding.profitClass}>{holding.pnl}</td>
                  <td className={holding.isNetProfit}>{holding.net}</td>
                  <td className={holding.isDayProfitClass}>{holding.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <GraphicalRepresentation className="w-100" />

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
