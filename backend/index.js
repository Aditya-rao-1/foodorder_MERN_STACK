import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import CategoryModel from './models/Category.js';
import UserModel from './models/User.js';
import fs from 'fs';
import path from 'path';
import FoodItemModel from "./models/FoodItem.js"; // Adjust the path to your model
import CartModel from './models/Cart.js';
import authenticateToken from './middleware/Token.js'; // Import the middleware
import OrderModel from "./models/Orders.js"


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(process.env.PORT || 8080, () => console.log(`Server running on port ${process.env.PORT || 8080}`));
  })
  .catch((err) => {
    console.log('MongoDB Connection Error: ', err);
  });

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json('Invalid email or password');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password, profileImage } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.findOne({ email });
    if (user) {
      res.json("Already registered");
    } else {
      const newUser = new UserModel({ name, email, password: hashedPassword, profileImage });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



// User routes
app.get("/user/profile-image", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.json({ profileImage: user.profileImage });
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



app.get("/categories",authenticateToken, async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/FoodDisplay",authenticateToken, async (req, res) => {
  const { category, page = 1, limit = 8 } = req.query;
  const query = category && category !== "all" ? { category } : {};
  const skip = (page - 1) * limit;
  
  try {
    const totalItems = await FoodItemModel.countDocuments(query);
    const foodItems = await FoodItemModel.find(query).skip(skip).limit(Number(limit));
    
    res.json({
      foodItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


app.use('/cart', authenticateToken); // Apply the middleware to the cart routes

app.get('/cart', async (req, res) => {
  const { email } = req.user;
  try {
    const cartItems = await CartModel.find({ email });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  }
});

app.post('/cart', async (req, res) => {
  const { id, name, price, qty, size, img } = req.body;
  const email = req.user.email;

  try {
    let existingCartItem = await CartModel.findOne({ id, size, email });
    if (existingCartItem) {
      existingCartItem.qty += qty;
      existingCartItem.price = price; // Update price if necessary
      await existingCartItem.save();
    } else {
      const newCartItem = new CartModel({ id, name, price, qty, size, img, email });
      await newCartItem.save();
    }
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
});

app.put('/cart/:id', async (req, res) => {
  const { id } = req.params;
  const { qty, price, size } = req.body;
  const email = req.user.email;

  try {
    const updatedCartItem = await CartModel.findOneAndUpdate(
      { id, size, email },
      { qty, price },
      { new: true }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Cart item updated', updatedCartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
});

app.delete('/cart/:id', async (req, res) => {
  const { id } = req.params;
  const { size } = req.body;
  const email = req.user.email;

  try {
    const result = await CartModel.findOneAndDelete({ id, size, email });
    if (!result) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart item', error: error.message });
  }
});



app.post('/order', authenticateToken, async (req, res) => {
    const { cartItems } = req.body;
    const email = req.user.email;

    try {
        const newOrder = new OrderModel({ email, order_data: cartItems });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
});

app.get('/orderData', authenticateToken, async (req, res) => {
  const email = req.user.email;

  try {
      const orders = await OrderModel.find({ email });
      if (!orders.length) {
          return res.status(404).json({ message: 'No orders found' });
      }
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
});
app.get('/myorderData', authenticateToken, async (req, res) => {
  const email = req.user.email;

  try {
      const orders = await OrderModel.find({ email });
      if (!orders.length) {
          return res.status(404).json({ message: 'No orders found' });
      }
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
});
app.post('/clearCart', authenticateToken, async (req, res) => {
  const email = req.user.email;

  try {
      await CartModel.deleteMany({ email });
      res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
});

app.post('/upload', async (req, res) => {
  const { name, img, description, category, options } = req.body;

  try {
 

    // Save the data to MongoDB
    const newFoodItem = new FoodItemModel({
      name,
      img: `assets/${name}.png`,  // Save the relative path
      description,
      category,
      options
    });

    await newFoodItem.save();

    res.status(201).json({ message: 'Food item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create food item' });
  }
});

// Get user details by email
app.get('/myacc', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    const user = await UserModel.findOne({ email }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// Update profile info (name, profileImage, email)
app.put('/user/update', async (req, res) => {
  const { oldEmail, email, name, profileImage } = req.body;
  try {
    const user = await UserModel.findOneAndUpdate(
      { email: oldEmail }, // identify by old email
      { name, email, profileImage }, // update to new email
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});


// Change password
app.put('/user/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Old password incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating password' });
  }
});

// Get all orders (for admin)
app.get('/adminorder', async (req, res) => {
  try {
      const orders = await OrderModel.find({});
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
});

// Update order status (for admin)
app.put('/adminorder/:id', async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, { orderStatus }, { new: true });
      if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order status updated', updatedOrder });
  } catch (error) {
      res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
});

