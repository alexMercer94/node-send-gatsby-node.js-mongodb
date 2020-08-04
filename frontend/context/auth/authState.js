import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import { CLEAN_ALERT, REGISTER_ERROR, REGISTER_SUCCESS, USER_AUTHENTICATED } from '../../redux/types';
import authContext from './authContext';
import authReducer from './authReducer';

const AuthState = ({ children }) => {
    // Define initial state
    const initialState = {
        token: '',
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

    // User authenticated
    const userAuthenticated = (name) => {
        dispatch({
            type: USER_AUTHENTICATED,
            payload: name,
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
                userAuthenticated,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthState;
