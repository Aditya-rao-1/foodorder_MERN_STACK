import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig.js'; // Adjust the path as needed
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderedFood = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get('/myorderData');
            console.log('Fetched Orders:', response.data);
            setOrders(response.data);
        } catch (error) {
            setError('Failed to fetch orders. Please try again later.');
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    return (
        <>
            <Navbar />
            <div className="mx-auto py-10 px-4 min-h-screen bg-gradient-to-r from-yellow-700  to-black">
                <h2 className="font-extrabold text-5xl mb-10 pt-[100px] text-center text-white">
                    Your{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">
                        Orders
                    </span>
                </h2>
                {orders.length === 0 ? (
                    <p className="text-center text-white text-lg">
                        You have no orders yet.
                    </p>
                ) : (
                    <div className="space-y-10">
                        {orders.map((order, orderIndex) => (
                            <div
                                key={order._id}
                                className="bg-black/70 backdrop-blur-md border border-yellow-600 shadow-lg p-6 rounded-2xl"
                            >
                                <h3 className="font-bold text-2xl text-yellow-400 mb-6 text-left">
                                    Order #{orderIndex + 1}
                                </h3>

                                <div className="flex space-x-6 overflow-x-auto pb-2">
                                    {order.order_data[0].map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex-shrink-0 bg-black border border-yellow-600 p-4 rounded-xl shadow-md w-48"
                                        >
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-full h-32 rounded-lg object-cover mb-3 border border-red-600"
                                            />
                                            <p className="text-white font-bold">{item.name}</p>
                                            <p className="text-gray-300 text-sm">Size: {item.size}</p>
                                            <p className="text-gray-300 text-sm">Qty: {item.qty}</p>
                                            <p className="text-yellow-400 font-semibold">₹ {item.price}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-left">
                                    <p className="text-white">
                                        Order Status:{" "}
                                        <span className="font-bold text-red-400">
                                            {order.orderStatus}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderedFood;
