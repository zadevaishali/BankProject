import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const UserContext  = React.createContext()
   

//creating useContext here 
export function useBankingSystem(){
 
    return useContext(UserContext)

};

//Exporting the provider in index.js
export const UserContextProvider=({children}) =>{
   
    const navigateTo =useNavigate();
     const BASE_URL = "http://localhost:8080";

    const [userDetails, setUserDetails]= useState(null);

    const setUser = (details => {
       console.log(details);
        setUserDetails(details)
    })

        
    const gettingAUser = async () => {
        const userid = localStorage.getItem("userId");
        const token = localStorage.getItem("jwtToken");
    
        if (!token) {
            alert("Session expired. Please login again.");
            window.location.href = "/login";
            return; // Prevent further execution
        }
    
        if (!userid) {
            alert("Please login again.");
            console.error("Missing userid");
            return;
        }
    
        console.log("Fetching user details for userid:", userid);
    
        try {
            const resp = await axios.get(`${BASE_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: { userid },
            });
    
            console.log("API response data:", resp.data);
            setUser(resp.data); // Update userDetails with the fetched data
        } catch (error) {
            console.error("Failed to fetch user details:", error);
            alert("Failed to fetch user details. Please try again later.");
        }
    };
    

    

return(
    //setting the values and will use in many compponents
    <UserContext.Provider value={{userDetails, setUser, BASE_URL, gettingAUser }}>

        {children}

    </UserContext.Provider>

)
}
