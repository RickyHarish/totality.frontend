// Action Creators for Saga

import {
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_DETAILS_REQUEST,
    USER_UPDATE_PROFILE_REQUEST,
    USER_LIST_REQUEST,
    USER_DELETE_REQUEST,
    USER_UPDATE_REQUEST
} from "../constants/userConstants";

// Login action
export const login = (email, password) => ({
    type: USER_LOGIN_REQUEST,
    payload: { email, password }
});

// Logout action
export const logout = () => ({
    type: USER_LOGOUT
});

// Register action
export const register = (name, email, password) => ({
    type: USER_REGISTER_REQUEST,
    payload: { name, email, password }
});

// Get user details
export const getUserDetails = (id) => ({
    type: USER_DETAILS_REQUEST,
    payload: { id }
});

// Update user profile
export const updateUserProfile = (user) => ({
    type: USER_UPDATE_PROFILE_REQUEST,
    payload: { user }
});

// List users
export const listUsers = () => ({
    type: USER_LIST_REQUEST
});

// Delete user
export const deleteUser = (id) => ({
    type: USER_DELETE_REQUEST,
    payload: { id }
});

// Update user
export const updateUser = (user) => ({
    type: USER_UPDATE_REQUEST,
    payload: { user }
});
