import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../axiosConfig";


const MyAcc = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState(""); // 🔹 email is editable
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  const loggedInEmail = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!loggedInEmail) return;
      try {
        
        const res = await axiosInstance.get(`/myacc?email=${loggedInEmail}`);
        setUser(res.data);
        setName(res.data.name);
        setProfileImage(res.data.profileImage || "");
        setEmail(res.data.email); // 🔹 editable field
      } catch (err) {
        setUser(null);
      }
    };
    fetchUserDetails();
  }, [loggedInEmail]);

  // Handle image upload to Firebase
  async function handleImageUpload(img) {
    try {
      setUploading(true);
      const storageref = ref(storage, "images/" + img.name);
      await uploadBytes(storageref, img);
      const downloadURL = await getDownloadURL(storageref);
      setProfileImage(downloadURL);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    if (img) handleImageUpload(img);
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axiosInstance.put("/user/update", {
        oldEmail: loggedInEmail, // 🔹 send old email to identify user
        email,
        name,
        profileImage,
      });
      setUser(res.data);
      setName(res.data.name);
      setProfileImage(res.data.profileImage);
      setEmail(res.data.email);
      localStorage.setItem("loggedInUser", res.data.email); // update local storage if email changed
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error updating profile");
    }
  };

  const handleChangePassword = async () => {
    try {
      await axiosInstance.put("/user/change-password", {
        email,
        oldPassword,
        newPassword,
      });
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.log(err);
      toast.error("Error changing password");
    }
  };

  if (!user) return <div className="p-8 text-center text-white">Loading...</div>;

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-yellow-700 to-black p-6">

        {/* 🔹 Update Profile Section */}
        <div className="max-w-4xl w-full bg-black/70 backdrop-blur-md rounded-2xl p-10 shadow-lg border border-yellow-600 mt-28">
          <h2 className="text-3xl font-bold text-left text-white mb-6">
            Update <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">Profile</span>
          </h2>

          {/* Profile Image */}
          <div className="mb-6 text-center">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 border-4 border-yellow-500 object-cover"
              />
            </label>
            <input
              type="file"
              id="profile-upload"
              accept=".png,.jpg,.jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
            {uploading && <p className="text-yellow-400 text-sm">Uploading...</p>}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-yellow-600 bg-black text-white p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Email (now editable) */}
          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-yellow-600 bg-black text-white p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <Button onClick={handleUpdateProfile} className="w-full">
            Update Profile
          </Button>
        </div>

        {/* 🔹 Change Password Section */}
        <div className="max-w-4xl w-full bg-black/70 backdrop-blur-md rounded-2xl p-10 shadow-lg border border-yellow-600">
          <h3 className="text-2xl font-bold text-white mb-4 text-left">
            Change <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">Password</span>
          </h3>
          {/* Old Password */}
          <div className="relative mb-3">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border border-yellow-600 bg-black text-white p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative mb-4">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-yellow-600 bg-black text-white p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button onClick={handleChangePassword} className="w-full">
            Change Password
          </Button>
        </div>

      </div>
    </>
  );
};

export default MyAcc;
