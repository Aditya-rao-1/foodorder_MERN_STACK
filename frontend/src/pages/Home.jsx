import React from 'react';
import Lorem from "../components/Lorem";

import Welcome from "../components/Welcome";

import Getappp  from '../components/Getapp';
import TestimonialCarousel from "../components/TestimonialCarousel"
import Steps from "../components/Steps";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className='bg-black'>
        <Navbar/>
      <Welcome/>
      <Lorem/>
      <Steps/>
      <TestimonialCarousel/>
      <Getappp/>
      <Footer/>
      
    </div>
  );
};

export default Home;
