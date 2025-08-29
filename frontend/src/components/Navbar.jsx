import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { logogo, profile_icon, logout } from "../../public/assets";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Navbar = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [profileImage, setProfileImage] = useState(profile_icon); // Default image

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const userEmail = localStorage.getItem('loggedInUser');
        if (!userEmail) {
          console.error('No user email found');
          return; // Exit if email is not found
        }
        const response = await axiosInstance.get(`/user/profile-image?email=${userEmail}`);
        const { profileImage: userProfileImage } = response.data;

        if (userProfileImage) {
          setProfileImage(userProfileImage);
        }
      } catch (error) {
        console.error('Failed to fetch user profile image', error);
        navigate('/login');
      }
    };

    fetchUserProfileImage();
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken');
    setProfileImage(profile_icon);
    navigate('/login');
  };
  const handleProfileClick = () => {
    navigate('/myacc');
  };

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 bg-black/30 backdrop-blur-sm${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
    >

      <div className={`flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:${openNavigation ? "py-2" : "py-4"}`}>

        <a className={`block w-[9rem] max-md:w-[6rem] xl:mr-8 ${openNavigation ? "hidden" : ""}`} href="/home">
          <img src={logogo} width={190} height={40} alt="logogo" />
        </a>

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-0 left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {openNavigation ? <img src={logogo} width={190} height={40} alt="logogo" /> : null}

            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`flex items-center relative font-code  text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                  } px-4 py-6 md:top-0 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 xl:px-12`}
              >
                <img src={item.imageUrl} alt="" />
                {item.title}
              </a>
            ))}

            {openNavigation ? (
              <button className="mt-4 lg:hidden flex text-white text-xl" onClick={handleLogout}> <img src={logout} alt="" /> Logout</button>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-8">
          <a
            href="/myacc"
            className={`relative ${openNavigation ? "hidden" : ""}`}
            onClick={handleProfileClick}
          >
            <img
              src={profileImage}
              alt="Profile Icon"
              className="h-12 w-12 rounded-full object-cover border-2 border-white"
            />
          </a>
          <div className="flex items-center lg:hidden gap-8">
            <Button
              className="ml-auto"
              px="px-3"
              onClick={toggleNavigation}
            >
              <MenuSvg openNavigation={openNavigation} />
            </Button>
            <a
              href="#"
              className={`relative ${openNavigation ? "block" : "hidden"} ml-4`}
            >
              <img
                src={profileImage}
                alt="Profile Icon"
                className="h-12 w-12 rounded-full object-cover border-2 border-white"
              />
            </a>
          </div>
          <button className="hidden lg:flex" onClick={handleLogout}><img src={logout} alt="" /></button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
