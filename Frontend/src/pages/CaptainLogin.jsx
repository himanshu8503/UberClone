import {useContext, useState} from "react";
import { Link , useNavigate} from "react-router";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainDataContext); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const captain = {
            email: email,
            password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
        
        if(response.status === 200)
        {
          const data = response.data;
          setCaptain(data.captain);
          localStorage.setItem('captain-token', data.token);
          navigate('/captain-home')
        }

        setEmail("");
        setPassword("");
    }


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />

        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] w-full mb-7 py-2 px-4 rounded text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] w-full mb-7 py-2 px-4 rounded text-lg placeholder:text-base"
            required
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#10b461] text-white font-semibold w-full mb-2 py-2 px-4 rounded text-lg">
            Login
          </button>
        </form>
        <p className="text-center">Join a fleet? <Link to="/captain-register" className="text-blue-600">Register as Captain</Link></p>
      </div>
      <div>
        <Link
          to="/user-login"
          className="bg-[#111] flex items-center justify-center text-white font-semibold w-full mb-7 py-2 px-4 rounded text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
