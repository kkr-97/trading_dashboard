import React from "react";
import { Link } from "react-router-dom";

const Orders = ({ orders, fetchOrders }) => {
  const NoOrders = () => (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
    </div>
  );

  const OrdersList = () => {
    return (
      <>
        <div className="d-flex align-items-center">
          <h3 className="title">Orders {orders.length}</h3>
          <button className="refresh-btn" onClick={fetchOrders}>
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>

        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.date}</td>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td className={order.mode === "Sell" ? "loss" : "profit"}>
                      {order.mode}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return orders.length === 0 ? <NoOrders /> : <OrdersList />;
};

export default Orders;
