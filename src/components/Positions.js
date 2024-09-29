import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
// import { positions } from "../data/data";

const Positions = () => {
  const [positions, setPositions] = useState([]);

  const token = Cookie.get("trading_token");

  useEffect(() => {
    axios
      .get("https://trading-backend-hvvh.onrender.com/positions", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setPositions(res.data);
      });
  }, []);

  const newPositions = positions.map((item) => {
    return {
      ...item,
      pnl: ((item.price - item.avg) * item.qty).toFixed(2),
      pnlClass: item.isLoss ? "loss" : "profit",
      isDayProfit: item.day[0] === "+" ? "profit" : "loss",
    };
  });
  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {newPositions.map((position, index) => {
              return (
                <tr key={index}>
                  <td>{position.product}</td>
                  <td>{position.name}</td>
                  <td>{position.qty}</td>
                  <td>{position.avg}</td>
                  <td>{position.price}</td>
                  <td className={position.pnlClass}>{position.pnl}</td>
                  <td className={position.isDayProfit}>{position.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
