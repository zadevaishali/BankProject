import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const MainPage=()=>{
   
 return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Primebank" className="logo" style={{ width: "3rem" }} />
        </a>
        
            <div className="d-flex align-items-center">
          
            <NavLink className="btn btn-outline-danger fw-bold  " to="/Login">
               SignIn
              </NavLink>
         
          
        </div>
      </div>
    </nav>
  );
};

export default MainPage;

