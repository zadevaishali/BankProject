

import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const NavbarDashboardAdmin = () => {
  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const navigateTo = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigateTo("/login");
    toast.success("SignOut Successfull!");
  };

  
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <a className="navbar-brand" href="">
              <img src={logo} alt="primebank" className="logo rounded" style={{ width: "3rem" }} />
            </a>
            <div>
              <h1 className="text-white fs-2 fw-semibold">Admin</h1>
            </div>
            <button
              className="btn btn-danger btn-lg fw-semibold"
              onClick={handleSignOut}
            >
              SignOut
            </button>
          </div>
        </nav>
  );
};

export default NavbarDashboardAdmin;