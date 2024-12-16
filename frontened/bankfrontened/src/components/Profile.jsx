import axios from "axios";
import { useState, useEffect } from "react";
import { useBankingSystem } from "./context/UserContext";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  //contextAPI
  const { BASE_URL, setUser: setUserDetails, userDetails, gettingAUser } = useBankingSystem();
  // const [image, setImage] = useState(null);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState('');
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

  useEffect(()=>{
    if(!sessionStorage.getItem("jwtToken")){
      navigate("/")
    }
  },[])

  useEffect(() => {
  setExistedUser(userDetails)
  }, [userDetails])



  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {
  //     setImage(file)
  //     setImagePreviewUrl(reader.result);
  //   }

  //   reader.readAsDataURL(file)
  // }


  let user, uservalue;
  const handleAlreadyExistedDetails = (ele) => {
    const fieldsLevel1 = ['userId',
      'firstname',
      'lastname',
      'email'];
    user = ele.target.name;
    uservalue = ele.target.value;
    console.log("+++++ ", user);
    if (fieldsLevel1.indexOf(user?.trim()) < 0) {
      let modifiedUser = {
        ...existedUser,
        userdetails: {
          ...existedUser?.userdetails,
          [user]: uservalue,
        }
      };
      console.log("Modified User: ", modifiedUser);
      setExistedUser(modifiedUser);
    } else {
      let modifiedUser = { ...existedUser, [user]: uservalue };
      console.log("Modified User 2: ", modifiedUser);
      setExistedUser(modifiedUser);
    }


  };


    useEffect(()=>{
      
      },[existedUser])

  const handleCreateProfile = async (event) => {
    event.preventDefault();
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

    const profileResp = await axios.put(`${BASE_URL}/api/updateprofile/${existedUser.userId}`, data);

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
    console.log("update profile initiated", existedUser);

    const { userdetails } = existedUser;

    console.log("adhaar length ",typeof(userdetails?.adhaar));
    
    console.log("pan length ",userdetails?.pan?.length);
    console.log("pan length ",typeof(userdetails?.pan));
    console.log("mobile length ",userdetails?.mobile?.length);

    const data = {
      userdetailsid: userdetails?.userdetailsid,
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
          <form onSubmit={handleCreateProfile} className="bg-white p-4 rounded shadow">
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

            {/* <div>
            {Object.entries(existedUser.userdetails).map(([key, value]) => (
              <div className="mb-3" key={key}>
                <label htmlFor={key} className="form-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </label>
                <input
                  type={key === "dateOfBirth" ? "date" : "text"}
                  className="form-control"
                  id={key}
                  name={key}
                  value={value || ""}
                  onChange={handleAlreadyExistedDetails}
                />
              </div>
            ))} */}

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Create
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  return null;
};

export default Profile;
