import { call, put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';

import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGOUT_SUCCESS,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from '../constants/userConstants';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// User API call functions
function* loginSaga(action) {
    try {
        const { email, password } = action.payload;
        const { data } = yield call(axios.post, `${BACKEND_URL}/api/users/login`, { email, password });
        yield put({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: USER_LOGIN_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* logoutSaga() {
    try {
        yield call(axios.post, `${BACKEND_URL}/api/users/logout`);
        yield put({ type: USER_LOGOUT_SUCCESS });
    } catch (error) {
        // handle error (optional)
    }
}

function* registerSaga(action) {
    try {
        const { name, email, password } = action.payload;
        const { data } = yield call(axios.post, `${BACKEND_URL}/api/users`, { name, email, password });
        yield put({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: USER_REGISTER_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* getUserDetailsSaga(action) {
    try {
        const { id } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.get, `${BACKEND_URL}/api/users/${id}`, config);
        yield put({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: USER_DETAILS_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* updateUserProfileSaga(action) {
    try {
        const { user } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.put, `${BACKEND_URL}/api/users/profile`, user, config);
        yield put({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: USER_UPDATE_PROFILE_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* listUsersSaga() {
    try {
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.get, `${BACKEND_URL}/api/users`, config);
        yield put({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: USER_LIST_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* deleteUserSaga(action) {
    try {
        const { id } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        yield call(axios.delete, `${BACKEND_URL}/api/users/${id}`, config);
        yield put({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        yield put({ type: USER_DELETE_FAIL, payload: error.response?.data.message || error.message });
    }
}

function* updateUserSaga(action) {
    try {
        const { user } = action.payload;
        const { userLogin: { userInfo } } = yield select(state => state);
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
        const { data } = yield call(axios.put, `${BACKEND_URL}/api/users/${user._id}`, user, config);
        yield put({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: USER_UPDATE_FAIL, payload: error.response?.data.message || error.message });
    }
}

// Watchers
export function* watchUserActions() {
    yield takeEvery(USER_LOGIN_REQUEST, loginSaga);
    yield takeEvery(USER_LOGOUT, logoutSaga);
    yield takeEvery(USER_REGISTER_REQUEST, registerSaga);
    yield takeEvery(USER_DETAILS_REQUEST, getUserDetailsSaga);
    yield takeEvery(USER_UPDATE_PROFILE_REQUEST, updateUserProfileSaga);
    yield takeEvery(USER_LIST_REQUEST, listUsersSaga);
    yield takeEvery(USER_DELETE_REQUEST, deleteUserSaga);
    yield takeEvery(USER_UPDATE_REQUEST, updateUserSaga);
}
