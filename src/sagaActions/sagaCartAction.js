// cartActions.js
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';

// Add item to cart
export const addToCart = (id, qty) => ({
    type: CART_ADD_ITEM,
    payload: { id, qty }
});

// Remove item from cart
export const removeFromCart = (id) => ({
    type: CART_REMOVE_ITEM,
    payload: id
});

// Save shipping address
export const saveShippingAddress = (data) => ({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
});

// Save payment method
export const savePaymentMethod = (data) => ({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
});
