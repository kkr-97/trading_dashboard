import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedItem, setMenuItem] = useState(1);
  const [isDropDownOpen, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(!isDropDownOpen);
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
        <div className="profile" onClick={handleDropDown}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
          <ul className={isDropDownOpen ? "" : "hide"}>
            <li>Logout</li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
