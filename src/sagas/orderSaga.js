import { call, put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';

import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL,
    ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
} from '../constants/orderConstants';

// Order API call functions
function* createOrderSaga(action) {
    try {
        const { order } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.post, '/api/orders', order, config);
        yield put({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: ORDER_CREATE_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* getOrderDetailsSaga(action) {
    try {
        const { id } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.get, `/api/orders/${id}`, config);
        yield put({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: ORDER_DETAILS_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* payOrderSaga(action) {
    try {
        const { orderId, paymentResult } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.put, `/api/orders/${orderId}/pay`, paymentResult, config);
        yield put({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: ORDER_PAY_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* deliverOrderSaga(action) {
    try {
        const { order } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.put, `/api/orders/${order._id}/deliver`, {}, config);
        yield put({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: ORDER_DELIVER_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* listMyOrdersSaga() {
    try {
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.get, '/api/orders/myorders', config);
        yield put({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: ORDER_LIST_MY_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* listOrdersSaga() {
    try {
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.get, '/api/orders', config);
        yield put({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: ORDER_LIST_FAIL, payload: error.response?.data.message || error.message });
    }
}

// Watchers
export function* watchOrderActions() {
    yield takeEvery(ORDER_CREATE_REQUEST, createOrderSaga);
    yield takeEvery(ORDER_DETAILS_REQUEST, getOrderDetailsSaga);
    yield takeEvery(ORDER_PAY_REQUEST, payOrderSaga);
    yield takeEvery(ORDER_DELIVER_REQUEST, deliverOrderSaga);
    yield takeEvery(ORDER_LIST_MY_REQUEST, listMyOrdersSaga);
    yield takeEvery(ORDER_LIST_REQUEST, listOrdersSaga);
}
