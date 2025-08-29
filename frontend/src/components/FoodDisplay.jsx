import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import Pagination from './Pagination';
import axiosInstance from '../axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodDisplay = ({ Category }) => {
    const [foodItems, setFoodItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const priceRef = useRef();
    const [qty, setQty] = useState({});
    const [size, setSize] = useState({});
    const { dispatch } = useCart();

    const loadData = async (category, page) => {
        try {
            const response = await axiosInstance.get(`/FoodDisplay?category=${category}&page=${page}&limit=8`);
            setFoodItems(response.data.foodItems);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error loading food items:", error);
        }
    };

    useEffect(() => {
        loadData(Category, currentPage);
    }, [Category, currentPage]);

    useEffect(() => {
        if (foodItems.length > 0) {
            let initialQty = {};
            let initialSize = {};
            foodItems.forEach(item => {
                initialQty[item._id] = 1;
                let options = item.options || {};
                let priceOptions = Object.keys(options);
                if (priceOptions.length > 0) {
                    initialSize[item._id] = priceOptions[0];
                }
            });
            setQty(initialQty);
            setSize(initialSize);
        }
    }, [foodItems]);

    const handleAddToCart = async (foodItem) => {
        const finalPrice = qty[foodItem._id] * parseInt(foodItem.options[size[foodItem._id]]);
        try {
            await axiosInstance.post('/cart', {
                id: foodItem._id,
                name: foodItem.name,
                price: finalPrice,
                qty: qty[foodItem._id],
                size: size[foodItem._id],
                img: foodItem.img
            });
            dispatch({ type: 'ADD_ITEM', payload: { ...foodItem, qty: qty[foodItem._id], price: finalPrice, size: size[foodItem._id] } });
            toast.success("Added to cart", { position: "top-right" });
        } catch (error) {
            console.error("Error adding item to cart:", error);
            toast.error("Error adding item to cart", { position: "top-right" });
        }
    };

    const handleQtyChange = (id, quantity) => {
        setQty({ ...qty, [id]: quantity });
    };

    const handleSizeChange = (id, selectedSize) => {
        setSize({ ...size, [id]: selectedSize });
    };

    return (
        <div className="mt-8 mb-[60px] container mx-auto">
            <ToastContainer />
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-5xl mb-5 max-md:text-2xl text-white">
                    Top Dishes{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-600">
                        Near You
                    </span>
                </h2>
            </div>
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-1 max-md:p-4 gap-8">
                {foodItems.map(foodItem => {
                    let options = foodItem.options || {};
                    let priceOptions = Object.keys(options);
                    return (
                        <div
                            key={foodItem._id}
                            className="transition-transform transform hover:-translate-y-2 rounded-xl bg-gray-300 shadow-lg hover:shadow-2xl overflow-hidden"
                        >
                            <img
                                src={foodItem.img}
                                alt={foodItem.name}
                                className="w-full h-48 object-cover rounded-t-xl"
                            />
                            <div className="p-3">
                                <h3 className="font-bold text-xl mb-2 text-gray-800">
                                    {foodItem.name}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    {foodItem.description}
                                </p>
                                <p className="mt-2 text-lg font-semibold text-gray-900">
                                    ₹{qty[foodItem._id] * parseInt(options[size[foodItem._id]] || 0)}
                                </p>
                                <div className="mt-2">
                                    <div className="flex justify-between items-center">
                                        <select
                                            className="mb-2 bg-gray-200 w-24 text-center rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            onChange={(e) =>
                                                handleQtyChange(foodItem._id, e.target.value)
                                            }
                                            value={qty[foodItem._id]}
                                        >
                                            {Array.from(Array(6), (e, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className="bg-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            ref={priceRef}
                                            onChange={(e) =>
                                                handleSizeChange(foodItem._id, e.target.value)
                                            }
                                            value={size[foodItem._id]}
                                        >
                                            {priceOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        className="mt-4 w-full rounded-lg py-2 px-4 bg-gradient-to-r from-yellow-500 to-red-600 text-white font-semibold hover:from-yellow-600 hover:to-red-700 transition-all duration-300"
                                        onClick={() => handleAddToCart(foodItem)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setCurrentPage}
            />
        </div>
    );
};

export default FoodDisplay;
