import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import {
    ADD_NO_DOWNLOADS,
    ADD_PASSWORD,
    CLEAN_ALERT,
    CLEAR_STATE,
    CREATE_LINK_SUCCESS,
    SHOW_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_ERROR,
    UPLOAD_FILE_SUCCESS,
} from '../../redux/types';
import appContext from './appContext';
import appReducer from './appReducer';

const AppState = ({ children }) => {
    const initialState = {
        file_message: '',
        name: '',
        original_name: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: '',
    };

    // Define reducer
    const [state, dispatch] = useReducer(appReducer, initialState);

    /**
     * Show an alert
     * @param {*} msg Message
     */
    const showAlert = (msg) => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg,
        });

        // Clear alert after 3 sec
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT,
            });
        }, 3000);
    };

    /**
     * Upload a file
     * @param {*} formData File
     */
    const uploadFile = async (formData, fileName) => {
        dispatch({
            type: UPLOAD_FILE,
        });

        try {
            const response = await axiosClient.post('/api/files', formData);
            console.log(response.data);
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    name: response.data.file,
                    original_name: fileName,
                },
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.response.data.msg,
            });
        }
    };

    /**
     * Create link
     */
    const createLink = async () => {
        const data = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            author: state.author,
            password: state.password,
        };

        try {
            const response = await axiosClient.post('/api/enlaces', data);
            console.log(response.data.msg);
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: response.data.msg,
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Clear state
     */
    const clearState = () => {
        dispatch({
            type: CLEAR_STATE,
        });
    };

    /**
     * Add password to encrypt file
     * @param {*} password
     */
    const addPassword = (password) => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password,
        });
    };

    /**
     * Add no downloads
     * @param {*} downloads
     */
    const addNoDownloads = (downloads) => {
        dispatch({
            type: ADD_NO_DOWNLOADS,
            payload: downloads,
        });
    };

    return (
        <appContext.Provider
            value={{
                file_message: state.file_message,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createLink,
                clearState,
                addPassword,
                addNoDownloads,
            }}
        >
            {children}
        </appContext.Provider>
    );
};

export default AppState;
