import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="bg-dark vh-100">
      <div className="d-flex align-items-center justify-content-center py-5">
        <div className="bg-white border rounded-md d-flex flex-column align-items-center justify-content-center mx-3 p-4 w-75 w-md-50">
          <div className="d-flex flex-column align-items-center py-4">
            <img
              className="d-none d-md-block px-4"
              src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png"
              alt="Page Not Found"
            />
            <img
              className="d-md-none"
              src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png"
              alt="Page Not Found"
            />
            <h1 className="px-4 pt-4 pb-3 text-center display-4 text-dark">OOPS!</h1>
            <p className="px-4 pb-4 text-center text-muted">No signal here! We cannot find the page you are looking for.</p>
            <NavLink to="/">
              <button className="btn btn-indigo mx-4 w-100 w-sm-auto">Go Back</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default ErrorPage;
