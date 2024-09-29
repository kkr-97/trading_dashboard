import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Menu = () => {
  const [selectedItem, setMenuItem] = useState(1);
  const [isDropDownOpen, setDropDown] = useState(false);

  const navigate = useNavigate();

  const handleDropDown = () => {
    setDropDown(!isDropDownOpen);
  };

  const onLogout = () => {
    Cookie.remove("trading_token");
    navigate("/sign-in");
  };

  const menuItems = [
    { id: 1, name: "Dashboard", link: "/" },
    { id: 2, name: "Orders", link: "/orders" },
    { id: 3, name: "Holdings", link: "/holdings" },
    { id: 4, name: "Positions", link: "/positions" },
    { id: 5, name: "Funds", link: "/funds" },
    { id: 6, name: "Apps", link: "/apps" },
  ];
  return (
    <div className="menu-container">
      <Link to="/">
        <img src="logo.png" style={{ width: "50px" }} alt="Kite logo" />{" "}
      </Link>
      <div className="menus">
        <ul>
          {menuItems.map((menuItem) => {
            return (
              <li key={menuItem.id}>
                <Link
                  to={menuItem.link}
                  onClick={() => setMenuItem(menuItem.id)}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    className={
                      "menu " + (selectedItem === menuItem.id ? "selected" : "")
                    }
                  >
                    {menuItem.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
        <hr />
        <div className="profile">
          <div className="d-flex align-items-center" onClick={handleDropDown}>
            <div className="avatar">KKR</div>
            <p className="username mb-0">
              Hello{" "}
              <i
                className={
                  "fa-solid " +
                  (isDropDownOpen ? "fa-chevron-up" : "fa-chevron-down")
                }
              ></i>
            </p>
          </div>
          <ul className={"dropdown " + (isDropDownOpen ? "" : "d-none")}>
            <li className="m-0" onClick={onLogout}>
              Logout
            </li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
