import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  menu_name: { type: String, required: true },
  menu_image: { type: String, required: true }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
