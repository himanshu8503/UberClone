import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
    headers: {
        Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
    if(response.status === 200){
        localStorage.removeItem('token');
        navigate('/user-login');
    }
  })
  .catch((err) => console.log(err.message))

  return <div>UserLogout</div>;
};

export default UserLogout;
