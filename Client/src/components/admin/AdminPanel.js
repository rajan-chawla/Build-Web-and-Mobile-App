import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="container">
      <div className="col-sm-8 mt-4 offset-2">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0 col">
            <li className="nav-item">
              <Link className="nav-link" to="/adminUsers">
                Approve users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminProducts">
                Approve products
              </Link>
            </li>
          </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
