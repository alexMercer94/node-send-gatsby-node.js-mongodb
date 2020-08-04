import { CLEAN_ALERT, REGISTER_ERROR, REGISTER_SUCCESS } from '../../redux/types';

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case REGISTER_ERROR:
            return { ...state, message: action.payload };
        case CLEAN_ALERT:
            return { ...state, message: null };

        default:
            return state;
    }
};

export default authReducer;
