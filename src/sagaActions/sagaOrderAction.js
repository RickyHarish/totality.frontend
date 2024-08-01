import {
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_REQUEST,
    ORDER_DELIVER_REQUEST,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_REQUEST
} from '../constants/orderConstants';


// Create order
export const createOrder = (order) => ({
    type: ORDER_CREATE_REQUEST,
    payload: { order }
});

// Get order details
export const getOrderDetails = (id) => ({
    type: ORDER_DETAILS_REQUEST,
    payload: { id }
});

// Pay order
export const payOrder = (orderId, paymentResult) => ({
    type: ORDER_PAY_REQUEST,
    payload: { orderId, paymentResult }
});

// Deliver order
export const deliverOrder = (order) => ({
    type: ORDER_DELIVER_REQUEST,
    payload: { order }
});

// List my orders
export const listMyOrders = () => ({
    type: ORDER_LIST_MY_REQUEST
});

// List all orders
export const listOrders = () => ({
    type: ORDER_LIST_REQUEST
});
