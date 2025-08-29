import React, { useState } from 'react';
import { menu } from '../../public/assets'; // Ensure this path is correct
import Section from "./Section";
import Categories from './Categories';
import FoodDisplay from './FoodDisplay';

const Lorem = () => {
  const [Category, setCategory] = useState("all");

  return (
    <Section id="menu" className="max-sm:mt-64" crosses>
      <div className='bg-black pb-10 max-sm:mt-64 max-md:py-10 flex justify-between items-center'>
        <img src={menu} className='w-full' alt="Menu" />
      </div>
      <Categories Category={Category} setCategory={setCategory} />
      <FoodDisplay Category={Category} />
    </Section>
  );
};

export default Lorem;
