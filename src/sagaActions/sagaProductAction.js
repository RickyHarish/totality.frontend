import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_TOP_REQUEST
} from '../constants/productConstants';

// List products
export const listProducts = (keyword = '', pageNumber = '') => ({
    type: PRODUCT_LIST_REQUEST,
    payload: { keyword, pageNumber }
});

// Get product details
export const listProductDetails = (id) => ({
    type: PRODUCT_DETAILS_REQUEST,
    payload: { id }
});

// Delete product
export const deleteProduct = (id) => ({
    type: PRODUCT_DELETE_REQUEST,
    payload: { id }
});

// Create product
export const createProduct = () => ({
    type: PRODUCT_CREATE_REQUEST
});

// Update product
export const updateProduct = (product) => ({
    type: PRODUCT_UPDATE_REQUEST,
    payload: { product }
});

// Create product review
export const createProductReview = (productId, review) => ({
    type: PRODUCT_CREATE_REVIEW_REQUEST,
    payload: { productId, review }
});

// List top products
export const listTopProducts = () => ({
    type: PRODUCT_TOP_REQUEST
});
