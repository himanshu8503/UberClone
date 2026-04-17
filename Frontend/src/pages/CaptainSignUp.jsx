import {useContext, useState} from "react";
import { Link, useNavigate} from "react-router";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignUp = () => {


  const [fistname, setFistname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const [color, setcolor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const {captain , setCaptain} = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Captain ={
      fullname: {
        firstname: fistname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: Number(capacity),
        vehicletype: vehicleType
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, Captain);

    if(response.status === 201)
    {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('captain-token',data.token)
        navigate('/captain-home')
        
    }

    setFistname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setcolor("");
    setPlate("");
    setCapacity(0);
    setVehicleType("");
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
          <h3 className="text-lg font-medium mb-2">Enter Vehicle Details</h3>
          <div className="grid grid-cols-2 gap-2 mb-5">
            <input
              className="bg-[#eeeeee]   py-2 px-4 rounded text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setcolor(e.target.value)}
            />
            <input
              className="bg-[#eeeeee]   py-2 px-4 rounded text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Plate number"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
            <input
              className="bg-[#eeeeee]   py-2 px-4 rounded text-lg placeholder:text-base"
              required
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            <select 
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)} 
            className="bg-[#eeeeee]   py-2 px-4 rounded text-lg" 
            required 
            >
              <option value="" className="text-base" disabled hidden>Vehicle Type</option>
              <option  value="car">Car</option>
              <option  value="motorcycle">Motorcycle</option>
              <option  value="auto">auto</option>
            </select>
          </div>
          <button className="bg-[#10b461] text-white font-semibold w-full mb-2 py-2 px-4 rounded text-lg">
            Create Account
          </button>
        </form>
        <p className="text-center">
          already have an Captain account? <Link to="/captain-login" className="text-blue-600"> Login</Link></p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
