import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    CLEAN_ALERT,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    USER_AUTHENTICATED,
} from '../../redux/types';
import authContext from './authContext';
import authReducer from './authReducer';

const AuthState = ({ children }) => {
    // Define initial state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        authenticated: null,
        user: null,
        message: null,
    };

    // Define reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    /**
     * Register user
     * @param {*} data
     */
    const registerUser = async (data) => {
        try {
            const response = await axiosClient.post('/users', data);
            console.log(response.data.msg);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.msg,
            });
        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.msg,
            });
        }

        // Clear alert after 3 sec
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT,
            });
        }, 3000);
    };

    /**
     * Login user
     * @param {*} data
     */
    const login = async (data) => {
        try {
            const response = await axiosClient.post('/auth', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.token,
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg,
            });
        }

        // Clear alert after 3 sec
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT,
            });
        }, 3000);
    };

    /**
     * Get user authenticted using JWT
     */
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        tokenAuth(token);

        try {
            const response = await axiosClient.get('/auth');
            dispatch({
                type: USER_AUTHENTICATED,
                payload: response.data.user,
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg,
            });
        }
    };

    const logout = () => {
        dispatch({
            type: LOGOUT,
        });
    };

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registerUser,
                login,
                userAuthenticated,
                userAuthenticated,
                logout,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthState;
