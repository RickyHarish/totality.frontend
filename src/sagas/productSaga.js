import { call, put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';

import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL
} from '../constants/productConstants';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// Product API call functions
function* listProductsSaga(action) {
    try {
        const { keyword = '', pageNumber = '' } = action.payload;
        const { data } = yield call(axios.get, `${BACKEND_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        yield put({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: PRODUCT_LIST_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* listProductDetailsSaga(action) {
    try {
        const { id } = action.payload;
        const { data } = yield call(axios.get, `${BACKEND_URL}/api/products/${id}`);
        yield put({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: PRODUCT_DETAILS_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* deleteProductSaga(action) {
    try {
        const { id } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        yield call(axios.delete, `${BACKEND_URL}/api/products/${id}`, config);
        yield put({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        yield put({ type: PRODUCT_DELETE_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* createProductSaga() {
    try {
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.post, `${BACKEND_URL}/api/products/`, {}, config);
        yield put({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: PRODUCT_CREATE_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* updateProductSaga(action) {
    try {
        const { product } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.put, `${BACKEND_URL}/api/products/${product._id}`, product, config);
        yield put({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: PRODUCT_UPDATE_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* createProductReviewSaga(action) {
    try {
        const { productId, review } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
        yield call(axios.post, `${BACKEND_URL}/api/products/${productId}/reviews`, review, config);
        yield put({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
        yield put({ type: PRODUCT_CREATE_REVIEW_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* listTopProductsSaga() {
    try {
        const { data } = yield call(axios.get, `${BACKEND_URL}/api/products/top`);
        console.log(data)
        yield put({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: PRODUCT_TOP_FAIL, payload: error.response?.data.message || error.message });
    }
}

// Watchers
export function* watchProductActions() {
    yield takeEvery(PRODUCT_LIST_REQUEST, listProductsSaga);
    yield takeEvery(PRODUCT_DETAILS_REQUEST, listProductDetailsSaga);
    yield takeEvery(PRODUCT_DELETE_REQUEST, deleteProductSaga);
    yield takeEvery(PRODUCT_CREATE_REQUEST, createProductSaga);
    yield takeEvery(PRODUCT_UPDATE_REQUEST, updateProductSaga);
    yield takeEvery(PRODUCT_CREATE_REVIEW_REQUEST, createProductReviewSaga);
    yield takeEvery(PRODUCT_TOP_REQUEST, listTopProductsSaga);
}
