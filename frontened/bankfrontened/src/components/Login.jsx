import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useBankingSystem } from './context/UserContext';

const Login = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { BASE_URL, gettingAUser } = useBankingSystem();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const data = { email, password }; // Declare once

    try {
      console.log(data);
      const resp = await axios.post(`${BASE_URL}/api/login`, data);
      //const token = resp.data.token; // Ensure the backend sends a token in `response.data.token`
     
      console.log(resp.data);
      console.log(resp.data.jwtToken);
      console.log("login successful");

      // const token = response.data.token; // Assume backend sends JWT in 'token'
      // localStorage.setItem("token", token); // Save token in localStorage

      // Save token in session storage
      localStorage.setItem("jwtToken", resp.data.jwtToken);
      localStorage.setItem("userId", resp.data.user.userId);
      
      gettingAUser();

      toast.success('Login Successful!');
      if (resp.data.user.role === 'ADMIN') {
        navigateTo('/admin/dashboard');
      } else {
        navigateTo('/dashboard');
      }
    } catch (error) {
      toast.error('Invalid Credentials!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Log in</h3>
        <form onSubmit={submitLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <NavLink to="/signup" className="text-decoration-none">
              Don't have an account? Sign Up
            </NavLink>
            <NavLink to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </NavLink>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
