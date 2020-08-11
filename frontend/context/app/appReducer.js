import {
    CLEAN_ALERT,
    CREATE_LINK_SUCCESS,
    SHOW_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_ERROR,
    UPLOAD_FILE_SUCCESS,
} from '../../redux/types';

const appReducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, file_message: action.payload };
        case CLEAN_ALERT:
            return { ...state, file_message: null };
        case UPLOAD_FILE_SUCCESS:
            return { ...state, name: action.payload.name, original_name: action.payload.original_name, loading: null };
        case UPLOAD_FILE_ERROR:
            return { ...state, file_message: action.payload, loading: null };
        case UPLOAD_FILE:
            return { ...state, loading: true };
        case CREATE_LINK_SUCCESS:
            return { ...state, url: action.payload };
        default:
            return state;
    }
};

export default appReducer;
