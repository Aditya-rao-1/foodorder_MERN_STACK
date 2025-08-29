import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CategoryModel from '../models/Category.js'; // Ensure this is a named import if using ES modules

dotenv.config();

const mongo_url = process.env.MONGODB;

// Define image URLs or paths
const categories = [
  { menu_name: "Salad", menu_image: "assets/cate/menu_1.png" },
  { menu_name: "Rolls", menu_image: "assets/cate/menu_2.png" },
  { menu_name: "Desserts", menu_image: "assets/cate/menu_3.png" },
  { menu_name: "Sandwich", menu_image: "assets/cate/menu_4.png" },
  { menu_name: "Cake", menu_image: "assets/cate/menu_5.png" },
  { menu_name: "Pure Veg", menu_image: "assets/cate/menu_6.png" },
  { menu_name: "Pasta", menu_image: "assets/cate/menu_7.png" },
  { menu_name: "Noodles", menu_image: "assets/cate/menu_8.png" }
];

mongoose.connect(mongo_url)
  .then(async () => {
    console.log('MongoDB Connected...');
    await CategoryModel.insertMany(categories);
  })
  .then(() => {
    console.log('Categories added successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.log('Error: ', err);
    mongoose.disconnect();
  });
