import React from "react";

import { useNavigate } from "react-router-dom";
import { useBankingSystem } from "./context/UserContext";
import axios from "axios";
import DashboardMain from "./DashboardMain";
import NavbarDashboardAdmin from "./NavbarDashboardAdmin";

const DashboardAdmin=()=>{
   
    return (
      <div>
        <NavbarDashboardAdmin />
        <DashboardMain />
      </div>
    )
  
  }
  
  export default DashboardAdmin