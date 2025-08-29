import React from 'react';

import Button from './Button';
import { burgerr } from '../../public/assets';

const Welcome = () => {
  return (


    <div className="relative bg-gradient-to-br from-[#cd8521] via-black to-black text-white min-h-screen flex items-center justify-center px-2 sm:px-4 overflow-hidden max-lg:pt-[4.5rem]">

      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[90rem] mx-auto pt-16 md:pt-20 pb-10 md:pb-16 px-2 sm:px-4 gap-8 md:gap-12 max-md:pb-0">

        {/* Left Section: Text & Buttons */}
        <div className="flex flex-col items-start max-w-full lg:max-w-[45rem] max-lg:text-center text-left space-y-4 md:space-y-6 ">
          <div className="space-y-2 md:space-y-3 ">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
              Savor Every Bite:
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
              From{" "}
              <span className="bg-gradient-to-r from-[#ffee00] to-[#ff0000] bg-clip-text text-transparent">
                Our Kitchen
              </span>
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
              to Your Table
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-[#ffee00] to-[#ff0000] bg-clip-text text-transparent">
              Delivering Deliciousness to Your Doorstep
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 md:gap-6 pt-2 md:pt-4 flex-wrap">
            <Button white>Order Now</Button>
            <Button>Get App</Button>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="flex justify-center items-center w-full lg:w-auto ">
          <img
            src={burgerr}
            alt="Burger"
            className="max-md:w-[400px] max-md:h-[400px] md:w-[500px] md:h-[500px] xl:w-[670px] xl:h-[670px] "
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;