import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FoodItemModel from '../models/FoodItem.js';

dotenv.config();

const mongo_url = process.env.MONGODB;

// Define your food list with options and img (image URL)
const food_list = [
  {name: "Greek salad", img: "assets/food_1.png", description: "Food provides essential nutrients for overall health and well-being", category: "Salad", options: { small: "45", medium: "55", large: "65" } },
  {name: "Veg salad", img: "assets/food_2.png", description: "Food provides essential nutrients for overall health and well-being", category: "Salad", options: { small: "50", medium: "60", large: "70" } },
  {name: "Clover Salad", img: "assets/food_3.png", description: "Food provides essential nutrients for overall health and well-being", category: "Salad", options: { small: "48", medium: "58", large: "68" } },
  {name: "Chicken Salad", img: "assets/food_4.png", description: "Food provides essential nutrients for overall health and well-being", category: "Salad", options: { small: "60", medium: "70", large: "80" } },
  
  {name: "Lasagna Rolls", img: "assets/food_5.png", description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", options: { small: "55", medium: "65", large: "75" } },
  {name: "Peri Peri Rolls", img: "assets/food_6.png", description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", options: { small: "50", medium: "60", large: "70" } },
  {name: "Chicken Rolls", img: "assets/food_7.png", description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", options: { small: "65", medium: "75", large: "85" } },
  {name: "Veg Rolls", img: "assets/food_8.png", description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", options: { small: "52", medium: "62", large: "72" } },

  {name: "Ripple Ice Cream", img: "assets/food_9.png", description: "Food provides essential nutrients for overall health and well-being", category: "Desserts", options: { small: "50", medium: "60", large: "70" } },
  { name: "Fruit Ice Cream", img: "assets/food_10.png", description: "Food provides essential nutrients for overall health and well-being", category: "Desserts", options: { small: "60", medium: "70", large: "80" } },
  { name: "Jar Ice Cream", img: "assets/food_11.png", description: "Food provides essential nutrients for overall health and well-being", category: "Desserts", options: { small: "45", medium: "55", large: "65" } },
  { name: "Vanilla Ice Cream", img: "assets/food_12.png", description: "Food provides essential nutrients for overall health and well-being", category: "Desserts", options: { small: "50", medium: "60", large: "70" } },

  { name: "Chicken Sandwich", img: "assets/food_13.png", description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", options: { small: "55", medium: "65", large: "75" } },
  { name: "Vegan Sandwich", img: "assets/food_14.png", description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", options: { small: "60", medium: "70", large: "80" } },
  { name: "Grilled Sandwich", img: "assets/food_15.png", description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", options: { small: "58", medium: "68", large: "78" } },
  { name: "Bread Sandwich", img: "assets/food_16.png", description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", options: { small: "65", medium: "75", large: "85" } },

  { name: "Cup Cake", img: "assets/food_17.png", description: "Food provides essential nutrients for overall health and well-being", category: "Cake", options: { small: "50", medium: "60", large: "70" } },
  { name: "Vegan Cake", img: "assets/food_18.png", description: "Food provides essential nutrients for overall health and well-being", category: "Cake", options: { small: "52", medium: "62", large: "72" } },
  { name: "Butterscotch Cake", img: "assets/food_19.png", description: "Food provides essential nutrients for overall health and well-being", category: "Cake", options: { small: "65", medium: "75", large: "85" } },
  { name: "Sliced Cake", img: "assets/food_20.png", description: "Food provides essential nutrients for overall health and well-being", category: "Cake", options: { small: "55", medium: "65", large: "75" } },

  { name: "Garlic Mushroom", img: "assets/food_21.png", description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", options: { small: "50", medium: "60", large: "70" } },
  { name: "Fried Cauliflower", img: "assets/food_22.png", description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", options: { small: "62", medium: "72", large: "82" } },
  { name: "Mix Veg Pulao", img: "assets/food_23.png", description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", options: { small: "45", medium: "55", large: "65" } },
  { name: "Rice Zucchini", img: "assets/food_24.png", description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", options: { small: "48", medium: "58", large: "68" } },

  { name: "Cheese Pasta", img: "assets/food_25.png", description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", options: { small: "55", medium: "65", large: "75" } },
  { name: "Tomato Pasta", img: "assets/food_26.png", description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", options: { small: "60", medium: "70", large: "80" } },
  { name: "Creamy Pasta", img: "assets/food_27.png", description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", options: { small: "58", medium: "68", large: "78" } },
  { name: "Chicken Pasta", img: "assets/food_28.png", description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", options: { small: "70", medium: "80", large: "90" } },

  { name: "Buttter Noodles", img: "assets/food_29.png", description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", options: { small: "50", medium: "60", large: "70" } },
  { name: "Veg Noodles", img: "assets/food_30.png", description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", options: { small: "48", medium: "58", large: "68" } },
  { name: "Somen Noodles", img: "assets/food_31.png", description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", options: { small: "65", medium: "75", large: "85" } },
  { name: "Lo Mein Noodles", img: "assets/food_32.png", description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", options: { small: "55", medium: "65", large: "75" } }
];

mongoose.connect(mongo_url)
  .then(async () => {
    console.log('MongoDB Connected...');
    await FoodItemModel.insertMany(food_list);
  })
  .then(() => {
    console.log('Food items added successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.log('Error: ', err);
    mongoose.disconnect();
  });
