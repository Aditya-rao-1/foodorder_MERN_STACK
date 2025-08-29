import React, { useState } from 'react';
import { foodbg } from "../../public/assets";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axiosInstance.post("/login", {
        email,
        password
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('loggedInUser', email);
        if (onLogin) {
          onLogin(); // update state and navigate in App
          toast.success("Loged in successfully!");
        }
      }
    } catch (error) {
     console.error('Login failed:', error);
     toast.error("Error in login").position("top-right");
    }
  };

  
  return (
    <section>
      <img src={foodbg}  alt="" className="xl:block h-screen w-full object-cover bg-no-repeat" />
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-[10px]">
        <form onSubmit={handleSubmit} className="bg-[#11111c8b] text-orange-400 w-[90vw] max-w-[400px] rounded-lg p-8 flex flex-col h-[500px] gap-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl mx-auto font-semibold">SIGN IN</h2>
          </div>
          <input
            type="text"
            placeholder='Enter Email'
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border text-black border-gray-300 rounded-md"
          />
         <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border text-black border-gray-300 rounded-md w-full pr-10"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button type="submit" className="bg-orange-500 text-black p-2 rounded-md mt-2">
            Login
          </button>
          <div className="flex items-start mt-4">
            <input type="checkbox" required className="mr-2" />
            <p className="text-sm">By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <Link to={'/signup'}>
            <p className="text-sm mt-2">
              Create a new account? <span className="text-white cursor-pointer">Click Here</span>
            </p>
          </Link>
        </form>
      </div>
    </section>
  );
}

export default SignInForm;