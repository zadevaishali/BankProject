import axios from "axios";
import { useState, useEffect } from "react";
import { useBankingSystem } from "./context/UserContext";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const { BASE_URL, setUser: setUserDetails, userDetails, gettingAUser } = useBankingSystem();
  const token = localStorage.getItem("jwtToken");
  console.log("JWT Token:", token);
  
 // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  //axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : "";
 
  const [existedUser, setExistedUser] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    userdetails: {
      userdetailsid: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      adhaar: "",
      pan: "",
      gender: "",
      mobile: "",
      dateOfBirth: ""

    }
  });



  const navigate = useNavigate();

  // useEffect(()=>{
  //   if(!sessionStorage.getItem("jwtToken")){
  //     navigate("/")
  //   }
  // },[])

  useEffect(() => {
    
  setExistedUser(userDetails)
  }, [userDetails])

  const handleAlreadyExistedDetails = (event) => {
    const { name, value } = event.target;
  
    setExistedUser((prevUser) => {
      if (['userId', 'firstname', 'lastname', 'email'].includes(name)) {
        // Update top-level field
        return { ...prevUser, [name]: value };
      } else {
        // Update nested field inside userdetails
        return {
          ...prevUser,
          userdetails: {
            ...prevUser.userdetails,
            [name]: value,
          },
        };
      }
    });
  };
  

      useEffect(()=>{
      
      },[existedUser])

  const handleCreateProfile = async (event) => {
    event.preventDefault();
    if (!existedUser.userId) {
      toast.error("User ID is missing!");
      return;
    }
    
    console.log("create profile initiated", existedUser);
    
      

    const { userdetails } = existedUser;

    console.log("adhaar length ",userdetails?.adhaar?.length);
    console.log("pan length ",userdetails?.pan?.length);
    console.log("mobile length ",userdetails?.mobile?.length);
    
    const data = {
      address: userdetails?.address,
      city: userdetails?.city,
      state: userdetails?.state,
      pin: userdetails?.pin,
      adhaar: userdetails?.adhaar,
      pan: userdetails?.pan,
      gender: userdetails?.gender,
      mobile: userdetails?.mobile,
      dateOfBirth: userdetails?.dateOfBirth
    }


    if (!userdetails?.adhaar || !userdetails?.pan || !userdetails?.mobile || !userdetails?.gender ) {
      //alert("Please fill all fields");
      toast.error("Please fill all mandatory fields");
      return;
    };

    


    if (userdetails?.adhaar?.length !== 12) {
      toast.error("Aadhar must be of 12 numbers!");
      return;
    }

    if (userdetails?.pan?.length !== 10) {
      toast.error("PAN must be of 10 numbers!");
      return;
    }

    if (userdetails?.mobile?.length !== 10) {
      toast.error("Mobile number must be of 10 numbers!");
      return;
    }

    //const profileResp = await axios.put(`${BASE_URL}/api/createprofile/${existedUser.userId}`, data);
    const profileResp = await axios.put(
      `${BASE_URL}/api/createprofile/${existedUser.userId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    
    setUserDetails(profileResp.data.user);

    console.log(profileResp);

    if (profileResp.status === 200) {
      toast.success("Profile Successfully Created,Please Relogin and Request for Account opening!");
      sessionStorage.clear();
      navigate("/login")

    } else {
      toast.error("Error in creating Profile!");
    }
  }

  useEffect(()=>{
      
  },[existedUser])


  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (!existedUser.userId) {
      toast.error("User ID is missing!");
      return;
    }
    
    console.log("update profile initiated", existedUser);

    const { userdetails } = existedUser;

    console.log("adhaar length ",typeof(userdetails?.adhaar));
    
    console.log("pan length ",userdetails?.pan?.length);
    console.log("pan length ",typeof(userdetails?.pan));
    console.log("mobile length ",userdetails?.mobile?.length);

    const data = {
     
      address: userdetails?.address,
      city: userdetails?.city,
      state: userdetails?.state,
      pin: userdetails?.pin,
      adhaar: userdetails?.adhaar,
      pan: userdetails?.pan,
      gender: userdetails?.gender,
      mobile: userdetails?.mobile,
      dateOfBirth: userdetails?.dateOfBirth
    }


    if (!userdetails?.adhaar || !userdetails?.pan || !userdetails?.mobile) {
      //alert("Please fill all fields");
      toast.error("Please fill all mandatory fields");
      return;
    };

    if (userdetails?.adhaar?.length !== 12) {
      toast.error("Aadhar must be of 12 numbers!");
      return;
    }

    if (userdetails?.pan?.length !== 10) {
      toast.error("PAN must be of 10 numbers!");
      return;
    }

    if (userdetails?.mobile?.length !== 10) {
      toast.error("Mobile number must be of 10 numbers!");
      return;
    }



    const profileResp = await axios.put(`${BASE_URL}/api/updateprofile/${existedUser.userId}`, data);
    

    setUserDetails(profileResp.data.user);

    console.log(profileResp);

    if (profileResp.status === 200) {
      toast.success("Profile Successfully Updated,Please Relogin and Request for Account opening!");
      sessionStorage.clear();
      navigate("/login")

    } else {
      toast.error("Error in creating Profile!");
    }



  }

  const handleSignOut = ()=>{
    sessionStorage.clear();
    navigate("/login");
    toast.success("SignOut Successfull!");
}

if (!existedUser?.userdetails?.userdetailsid) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 py-3">
        <h1 className="navbar-brand">This Is Profile Section</h1>
        <div className="d-flex">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
            }}
          >
            Sign Out
          </button>
          <NavLink to="/change-password" className="btn btn-outline-primary">
            Change Password
          </NavLink>
        </div>
      </nav>

      <div className="container mt-5">
        <form
          onSubmit={handleCreateProfile}
          className="bg-white p-4 rounded shadow"
        >
          <h3 className="text-center mb-4">Create Profile</h3>

          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={existedUser?.firstname?.toUpperCase() || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={existedUser?.lastname?.toUpperCase() || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={existedUser?.email || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <h4 className="text-center mt-4">Additional Details</h4>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={existedUser?.userdetails?.address || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City:</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={existedUser?.userdetails?.city || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="state" className="form-label">State:</label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={existedUser?.userdetails?.state || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="pin" className="form-label">PIN Code:</label>
            <input
              type="text"
              className="form-control"
              id="pin"
              name="pin"
              value={existedUser?.userdetails?.pin || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="adhaar" className="form-label">Aadhar Card Number:</label>
            <input
              type="text"
              className="form-control"
              id="adhaar"
              name="adhaar"
              value={existedUser?.userdetails?.adhaar || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="pan" className="form-label">PAN Card Number:</label>
            <input
              type="text"
              className="form-control"
              id="pan"
              name="pan"
              value={existedUser?.userdetails?.pan?.toUpperCase() || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender:</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  id="genderMale"
                  name="gender"
                  value="M"
                  checked={existedUser?.userdetails?.gender === "M"}
                  onChange={handleAlreadyExistedDetails}
                />
                <label htmlFor="genderMale" className="form-check-label">Male</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  id="genderFemale"
                  name="gender"
                  value="F"
                  checked={existedUser?.userdetails?.gender === "F"}
                  onChange={handleAlreadyExistedDetails}
                />
                <label htmlFor="genderFemale" className="form-check-label">Female</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  id="genderOther"
                  name="gender"
                  value="O"
                  checked={existedUser?.userdetails?.gender === "O"}
                  onChange={handleAlreadyExistedDetails}
                />
                <label htmlFor="genderOther" className="form-check-label">Other</label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile Number:</label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              name="mobile"
              value={existedUser?.userdetails?.mobile || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={existedUser?.userdetails?.dateOfBirth || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">Create Profile</button>
          </div>
        </form>
      </div>
    </>
  );
}

return (
  <div className="alert alert-danger text-center mt-4" role="alert">
    <h4 className="alert-heading">Profile Already Exists</h4>
    <p>Please check your details </p>
  </div>
);
};

export default Profile;
