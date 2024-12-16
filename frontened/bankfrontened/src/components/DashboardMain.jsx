import React, { useEffect } from "react";
//import dashimg from "../../assets/images/Welcome_dashboard.png";

import axios from "axios";
import { useBankingSystem } from "./context/UserContext";
import { toast } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";

const DashboardMain = () => {
  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, setUser: setUserDetails, gettingAUser } = useBankingSystem();

     
    return (
      <section className="container mt-5 bg-light py-4 rounded">
        {/* <h2 className="text-center text-primary">Dashboard</h2> */}

        <div className="row align-items-center mt-4">
          {/* Left Side: Operations */}
          <div className="col-md-3">
            {/* <h3 className="text-center">Operations</h3> */}
            <div className="d-flex flex-column align-items-center gap-3 mt-3">
            <NavLink to="/dashboard/viewCustomers">
                <button className="btn btn-outline-info w-100">View Customers</button>
              </NavLink>
              <NavLink to="/dashboard/balance">
                <button className="btn btn-outline-info w-100">Check Balance</button>
              </NavLink>
              <NavLink to="/dashboard/trx">
                <button className="btn btn-outline-info  w-100">Transfer Amount</button>
              </NavLink>
              <NavLink to="/dashboard/Stmt">
                <button className="btn btn-outline-info w-100">Statements</button>
              </NavLink>
            </div>
          </div>

         
        </div>
      </section>
    );
  }


export default DashboardMain;
