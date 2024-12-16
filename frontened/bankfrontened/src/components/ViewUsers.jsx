import React, { useState, useEffect } from "react";
import { useBankingSystem } from './context/UserContext';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ViewUsers = () => {
    const { BASE_URL, gettingAUser } = useBankingSystem();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
       // const response = await  axios.get('${BASE_URL}/api/users'); 
        const response = await axios.get(`${BASE_URL}/api/users`);
        gettingAUser();
       //const data = await response.json();// no need
       console.log(response.data);
       setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
});

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Customers</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="card shadow p-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Bank Name</th>
                <th scope="col">Branch</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Customers Found.
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1}</td>
                    <td>{customer.firstname}</td>
                    <td>{customer.lastname}</td>
                    <td>{customer.email}</td>
                    <td>{customer.password}</td>
                    <td>{customer.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
