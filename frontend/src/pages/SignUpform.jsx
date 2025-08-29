import React, { useState } from 'react';
import { foodbg } from "../../public/assets";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; 
import { Eye, EyeOff } from "lucide-react";


const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

  // Handle image upload
  async function handleImageUpload(img) {
    try {
      setUploading(true);
      const storageref = ref(storage, "images/" + img.name);

      // Upload image
      await uploadBytes(storageref, img);

      // Get download URL
      const downloadURL = await getDownloadURL(storageref);
      console.log("Uploaded image URL:", downloadURL);
      setProfileImage(downloadURL); // Set the profile image URL after upload
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      handleImageUpload(img); // Call the upload function with the selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      
      await axiosInstance.post("/signup", { name, email, password, profileImage });
      alert("Registered successfully! Please Login to proceed.");
      navigate('/login'); // Redirect to the login page after successful signup
    } catch (err) {
      console.log(err);
      // Provide feedback to the user in case of an error
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <section className="relative h-screen">
      <img src={foodbg} alt="" className="absolute inset-0 h-full w-full object-cover bg-no-repeat" />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-9 pb-9 overflow-auto">
        <form onSubmit={handleSubmit} className="bg-[#11111c8b] text-orange-400 w-[90vw] max-w-[400px] rounded-lg p-6 flex flex-col gap-4 mx-auto my-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">SIGN UP</h2>
          </div>
          <div className='flex flex-col items-center'>
            <label htmlFor='file-upload' className='mb-2 cursor-pointer'>
              <img src={profileImage || 'https://via.placeholder.com/150'} alt="Profile Icon" className='h-20 w-20 bg-contain rounded-full' />
            </label>
            <label className='block mb-4 text-center text-white cursor-pointer'>Add profile picture</label>
            <input
              type="file"
              id="file-upload"
              className='hidden'
              accept='.png,.jpg,.jpeg'
              onChange={handleFileChange} // Updated to pass the file correctly
            />
          </div>
          <input
            type="text"
            placeholder='Enter Name'
            autoComplete='off'
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-black"
            required
          />
          <input
            type="text"
            placeholder='Enter Email'
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-black"
            required
          />
         <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-black w-full pr-10"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button type="submit" className="bg-orange-500 text-black p-2 rounded-md mt-2">
            Create Account
          </button>
          <div className="flex items-start mt-4">
            <input type="checkbox" required className="mr-2" />
            <p className="text-sm">By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <Link to={'/login'}>
            <p className="text-sm mt-4 text-center">
              Already have an account? <span className="text-white cursor-pointer">Login</span>
            </p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
