import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const NavbarDashboard = () => {
  const navigateTo = useNavigate();

  const handleSignOut = () => {
    
    navigateTo('/login');
    toast.success('SignOut Successful!');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-bg bg-secondary-subtle px-5">
      
      <div className="container-fluid">
      
        <h1 className="navbar-brand fs-1 text-info mb-0 ">Welcome To PrimeBank</h1>

       
        <div className="d-flex align-items-center">
          
          <button
            className="btn btn-outline-danger fw-bold me-2"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

          {/* <NavLink
  to="/profile"
  className="btn btn-outline-secondary text-xl font-weight-bold py-3 px-5 rounded"
  style={{
    transition: "all 0.5s",
  }}
  onMouseEnter={(e) => {
    e.target.classList.add("bg-secondary", "text-light");
    e.target.classList.remove("btn-outline-secondary");
  }}
  onMouseLeave={(e) => {
    e.target.classList.remove("bg-secondary", "text-light");
    e.target.classList.add("btn-outline-secondary");
  }}
>
  Profile Update
</NavLink> */}

          
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
