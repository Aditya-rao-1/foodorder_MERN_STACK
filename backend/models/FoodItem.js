import mongoose from 'mongoose';
const FoodItem= new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    options: { type: Map, of: Number, required: true }
});

const FoodItemModel = mongoose.model('FoodItem', FoodItem);

export default FoodItemModel;