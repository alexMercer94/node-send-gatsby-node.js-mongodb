import {
    CLEAN_ALERT,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    USER_AUTHENTICATED,
} from '../../redux/types';

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case REGISTER_ERROR:
        case LOGIN_ERROR:
            return { ...state, message: action.payload };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);
            return { ...state, token: action.payload, authenticated: true };
        case USER_AUTHENTICATED:
            return { ...state, user: action.payload };
        case LOGOUT:
            localStorage.removeItem('token');
            return { ...state, token: null, user: null, authenticated: null };
        case CLEAN_ALERT:
            return { ...state, message: null };

        default:
            return state;
    }
};

export default authReducer;
