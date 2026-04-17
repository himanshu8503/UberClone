import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

function UserProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/user-login");
      });
  }, [token]);

  return <>{children}</>;
}

export default UserProtectedWrapper;
