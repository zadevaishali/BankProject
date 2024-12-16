import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useBankingSystem } from './context/UserContext';
// Import Bootstrap's CSS
//import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap's JS (optional)
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Registration = () => {
 
  const {BASE_URL} = useBankingSystem();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
});

const [message, setMessage] = useState('');


const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstname, lastname, email, password } = formData;
    const registrationData = { firstname, lastname, email, password };

    try {
        console.log(registrationData);
       // const response= await axios.post(`${BASE_URL}/signup`, registrationData);
       const response = await axios.post(`${BASE_URL}/api/signup`, registrationData);
       console.log(response.data);
        
        if (response.status === 200) {
            alert(response.data);
            navigate('/login');
        }
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401 || status === 400 || status === 500) {
                setMessage(data);
            } else {
                setMessage('An error occurred');
            }
        } else if (error.request) {
            setMessage('No response from server');
        } else {
            setMessage('Error: ' + error.message);
        }
    }
};
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          {/* <SyncLoader size={20} color="#5145CD" loading={isLoading} /> */}
        </div>
      ) : (
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
          <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <NavLink to="/login" className="text-decoration-none">
                Already have an account?
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
