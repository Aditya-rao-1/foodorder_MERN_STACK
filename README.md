
# 🍔 MERN Food Ordering App

![App Screenshot](https://drive.google.com/uc?export=view&id=1VkvfTpE-ywqyqB8DjGKEardgqdR4iSp5)

A full-featured food ordering application built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**, offering a smooth and modern user experience for browsing food items, managing cart, placing orders, and tracking them in real-time.


---

## 🚀 Features

- 🛒 **Cart Management** – Add, remove, and update food items in a dynamic shopping cart.
- 🔐 **User Authentication** – Secure signup and login functionality with JWT tokens.
- 📦 **Order Placement** – Seamlessly place orders and view past order history.
- ⏱️ **Real-Time Order Tracking** – Stay updated with live order status (e.g., Preparing, Out for Delivery, Delivered).
- 📱 **Responsive UI** – Fully responsive and mobile-friendly design using modern React practices.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Axios
- React Router
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Firebase

---

## 📁 Project Structure

```
foodorder_MERN_STACK/
├── client/                    # React frontend
│   ├── public/
│   │   └── assets/
│   │       └── cate/
│   ├── src/
│   │   ├── assets/
│   │   │   └── svg/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── axiosConfig.js
│   │   ├── firebase.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.cjs
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
├── server/                    # Express backend
│   ├── controllers/           # (new folder for route logic)
│   ├── middleware/
│   │   └── Token.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── FoodItem.js
│   │   ├── Orders.js
│   │   └── User.js
│   ├── scripts/
│   │   ├── populateCategories.js
│   │   └── uploadFoodItems.js
│   ├── .env
│   ├── index.js
│   └── package.json
└── README.md

```

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Aditya-rao-1/foodorder_MERN_STACK.git
cd foodorder_MERN_STACK
```

### 2. Start the Backend
```bash
cd backend
npm install
npm run start-dev
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

The app should now be running on:
- Frontend: `http://localhost:5713`
- Backend: `http://localhost:8080`

---

## 🧪 Usage

- Sign up or log in as a user
- Browse the menu and add items to your cart
- Place an order and track its status

---



## 🔒 Security Notes

- Store environment variables (e.g., MongoDB URI, JWT secrets) in a `.env` file (never push it to GitHub).
- Sanitize all user inputs and follow backend security best practices.

---

## 📌 Future Improvements

- Payment Gateway Integration (e.g., Stripe)
- SMS/Email Notifications

---

## 🧑‍💻 Author

**Adithya rao**  
[GitHub](https://github.com/Aditya-rao-1) • [LinkedIn](https://www.linkedin.com/in/aditya-rao-7044a3317/)

---

Let me know if you’d like a version with a dark theme preview, deploy instructions (like on Vercel + Render), or if you're using any extra libraries.
