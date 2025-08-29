import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axiosInstance from '../axiosConfig.js'; // Import the configured Axios instance

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART_ITEMS':
            return { ...state, cartItems: action.payload };
        case 'ADD_ITEM':
            return { ...state, cartItems: [...state.cartItems, action.payload] };
        case 'REMOVE_ITEM':
            return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload.id || item.size !== action.payload.size) };
        case 'UPDATE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id && item.size === action.payload.size
                        ? { ...item, qty: action.payload.qty, price: action.payload.price }
                        : item
                )
            };
        case 'CLEAR_CART':  // New action to clear the cart
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axiosInstance.get('/cart');
                dispatch({ type: 'SET_CART_ITEMS', payload: response.data });
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        fetchCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
