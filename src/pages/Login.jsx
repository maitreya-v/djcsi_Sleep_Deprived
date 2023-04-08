
import React, { useState } from 'react'
import login from '../assets/videos/login2.mp4'
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/family.png";
import { tokens } from "../theme";
import { DownloadOutlinedIcon } from "@mui/icons-material";
import { useTheme, Button } from "@mui/material";
// import { CometChat } from '@cometchat-pro/chat';
// import { COMETCHAT_CONSTANTS } from '../constants';

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [show, setShow] = useState(false)
  const loginUser = () => {
    console.log(user.email,user.password)

    var data = new FormData();
    data.append("email", user.email);
    data.append("password", user.password);
    const uuid = user.email.split("@")[0];
    var config = {
      method: "post",
      url: "https://efd8-136-232-1-174.ngrok-free.app/api/login/",
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('email',user.email)
        localStorage.setItem('password',user.password)
        navigate('/otp')
      })
      .catch(function (error) {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUser({
          email: '',
          password: ''
        })
      });
  }
  return (
    <div className="h-screen relative overflow-hidden">
      <video autoPlay loop muted className="absolute -z-10 w-screen">
        <source src={login} type="video/mp4" />
      </video>
      <ToastContainer />
      <div className="w-1/2 h-screen bg-gray-100/80 p-24">
        <Link className='flex items-center gap-2' to="/">
          <img className="w-8" src={logo} alt="" />
          <h1 className="text-2xl font-bold underline decoration-[#a4a9fc]">
          SmartParent
          </h1>
        </Link>
        <h1 className="text-5xl font-semibold mt-12 uppercase">Login</h1>
        <div className="mt-6">
          <h1 className="text-gray-800 font-semibold mb-3">Enter Email</h1>
          <input
            type="text"
            className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
            placeholder="abc@gmail.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mt-6">
          <h1 className="text-gray-800 font-semibold mb-3">Enter Password</h1>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="absolute top-3 right-3">
              <button onClick={() => setShow(!show)}>
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          {/* <button
            onClick={() => loginUser()}
            className="w-full focus:outline-none px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
          >
            Login
          </button> */}
          <Button
                 onClick={() => loginUser()}
                  sx={{
                    width: '100%',
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    marginRight: "20px",
                    '&:hover': {
                      backgroundColor: colors.blueAccent[600],
                    },
                  }}
                  className='hover:bg-[#6870fa]'
                >
                  {/* <KeyboardBackspaceOutlinedIcon sx={{ mr: "10px" }} /> */}
                  Login
                </Button>
        </div>
        <h1 className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700">
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Login