import { useContext, useState } from "react";
import { Link , useNavigate} from "react-router";
import axios from "axios";
import {UserDataContext} from "../context/UserContext"

const UserSignUp = () => {
  const [fistname, setFistname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const {user,setUser} = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: fistname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status === 201){

        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
    }

    

    setFistname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />

        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-2 mb-5">
            <input
              className="bg-[#eeeeee] w-1/2  py-2 px-4 rounded text-lg placeholder:text-base"
              required
              type="text"
              placeholder="First name"
              value={fistname}
              onChange={(e) => setFistname(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] w-1/2  py-2 px-4 rounded text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] w-full mb-5 py-2 px-4 rounded text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] w-full mb-5 py-2 px-4 rounded text-lg placeholder:text-base"
            required
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold w-full mb-2 py-2 px-4 rounded text-lg">
            Create Account
          </button>
        </form>
        <p className="text-center">
          already have an account?{" "}
          <Link to="/user-login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
