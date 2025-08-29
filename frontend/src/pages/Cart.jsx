import React from 'react';
import { useCart } from '../context/CartContext';
import axiosInstance from '../axiosConfig.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { state, dispatch } = useCart();
    const { cartItems } = state;

    const handleRemoveFromCart = async (id, size) => {
        try {
            await axiosInstance.delete(`/cart/${id}`, { data: { size } });
            dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
            toast.success('Item removed successfully!', { position: "top-right" });
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const handleUpdateCartItem = async (id, size, qty, price) => {
        try {
            await axiosInstance.put(`/cart/${id}`, { qty, price, size });
            dispatch({ type: 'UPDATE_ITEM', payload: { id, size, qty, price } });
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };

    const handleCheckOut = async () => {
        try {
            const response = await axiosInstance.post('/order', { cartItems: state.cartItems });
            if (response.status === 201) {
                await axiosInstance.post('/clearCart');
                dispatch({ type: 'CLEAR_CART' });
                toast.success('Order placed and cart cleared successfully!', { position: "top-right" });
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.', { position: "top-right" });
        }
    };

    const clearCart = async () => {
        try {
            await axiosInstance.post('/clearCart');
            dispatch({ type: 'CLEAR_CART' });
            toast.success('Cart cleared successfully!', { position: "top-right" });
        } catch (error) {
            console.error('Error clearing cart:', error);
            toast.error('Failed to clear cart. Please try again.', { position: "top-right" });
        }
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="mx-auto py-10 px-4 min-h-screen bg-gradient-to-r from-yellow-700 to-black">
                <h2 className="font-extrabold text-5xl mb-10 pt-[100px] text-center text-white">
                    Your{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">
                        Cart
                    </span>
                </h2>

                {cartItems.length === 0 ? (
                    <p className="text-center text-white text-lg">
                        Your cart is empty
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-black/70 backdrop-blur-md border border-yellow-600 shadow-lg p-6 rounded-2xl flex flex-col items-center"
                            >
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-32 h-32 rounded-lg object-cover mb-4 border border-red-600"
                                />
                                <h3 className="font-bold text-xl text-yellow-400 mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-gray-300 mb-1">Size: {item.size}</p>
                                <p className="text-gray-300 mb-1">Quantity: {item.qty}</p>
                                <p className="text-lg font-semibold text-yellow-400 mb-4">
                                    ₹{item.price}
                                </p>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                                    onClick={() => handleRemoveFromCart(item.id, item.size)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="mt-10 flex max-sm:flex-col max-sm:text-center max-sm:gap-5 justify-between pl-15 pr-15">
                        <p className="text-2xl font-bold text-white">
                            Total Amount:{" "}
                            <span className="text-yellow-400">₹{totalAmount}</span>
                        </p>
                        <div className="flex justify-end gap-10">
                            <Button onClick={clearCart}>CLEAR CART</Button>
                            <Button onClick={handleCheckOut}>PROCEED TO PAY</Button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
