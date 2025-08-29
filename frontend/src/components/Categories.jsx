import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; 
import "./Categories.css";

const Categories = ({ Category, setCategory }) => {
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    try {
        const response = await axiosInstance.get("/categories");
        console.log('Categories response:', response.data); // Debug log
        setCategories(response.data);
    } catch (error) {
        console.error("Error loading categories:", error);
    }
};


  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='pl-5 pr-5 text-white'>
      <div className='activeholdi'>
        <ul className='grid xl:grid-cols-8 gap-4 max-lg:grid-cols-5 lg:grid-cols-6'>
          {categories.map(category => (
            <li 
              key={category._id}
              className='cursor-pointer' 
              onClick={() => setCategory(prev => prev === category.menu_name ? "all" : category.menu_name)}
            >
              <img 
                className={Category === category.menu_name ? "active" : ""} 
                src={`/${category.menu_image}`} 
                alt={category.menu_name} 
              />
              <p className='text-center mt-2'>{category.menu_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;


  