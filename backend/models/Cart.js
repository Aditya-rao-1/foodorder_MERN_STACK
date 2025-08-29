// models/Cart.js

import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    qty: Number,
    size: String,
    img: String,
    email: String,  
});
const CartModel =  mongoose.model('Cart', cartSchema);
export default CartModel;
