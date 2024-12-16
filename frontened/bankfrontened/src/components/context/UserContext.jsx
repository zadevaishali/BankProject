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

    const [userDetails, setUserDetails]= useState();

    const setUser = (details => {
       
        setUserDetails(details)
    })

    // const gettingAUser = async () =>{

    //     const userid = sessionStorage.getItem("userId");
    //     const token = sessionStorage.getItem('jwtToken');

    //     const resp = await axios.get(`http://localhost:8080/api/user`,{
           
    //         headers: {
    //             "Authorization": `Bearer ${token}`,
    //             "Content-Type": "application/json"
    //           }


    //     })
        
    //     setUser(resp.data);
        

    // }

    // const gettingAUser = async () =>{

    //     const userid = sessionStorage.getItem("userId");
    //     console.log("userid:", userid);

    //     const resp = await axios.get(`${BASE_URL}/api/user`,{
    //         params:{
    //             userid
    //         }
    //     })
        
    //     setUser(resp.data);
        

    // }

    const gettingAUser = async () =>{

        const userid = localStorage.getItem("userId");
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            alert("Session expired. Please login again.");
            window.location.href = "/login";
        }
        console.log("userid:", userid);
        console.log("Token:", token);

        if (!userid || !token) {
            console.error("Missing userid or token");
            alert("Please login again.");
            return;
        }

    try {
        const resp = await axios.get(`${BASE_URL}/api/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params: { userid },
        });
        setUser(resp.data);
    } catch (error) {
        console.error("Axios error:", error);
        alert("Failed to fetch user details.");
    }
        // useEffect(()=>{
        //     gettingAUser();
        // },[])
    }


return(
    //setting the values and will use in many compponents
    <UserContext.Provider value={{userDetails, setUser, BASE_URL, gettingAUser }}>

        {children}

    </UserContext.Provider>

)
}