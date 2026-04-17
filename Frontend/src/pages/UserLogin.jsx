import { useContext, useState } from "react";
import { Link , useNavigate} from "react-router";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = {
      email: email,
      password: password,
    };
    
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, User);

    

    if(response.status === 200)
    {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
    }

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
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] w-full mb-7 py-2 px-4 rounded text-lg placeholder:text-base"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] w-full mb-7 py-2 px-4 rounded text-lg placeholder:text-base"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
          />
          <button className="bg-[#111] text-white font-semibold w-full mb-2 py-2 px-4 rounded text-lg">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/user-register" className="text-blue-600">
            Create new account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold w-full mb-7 py-2 px-4 rounded text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
