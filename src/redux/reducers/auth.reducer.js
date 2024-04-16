import {
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    AUTH_COMMON_ERROR,
} from "../../redux/actions/types";
import * as auth from '../../helpers/auth';
const token = auth.getToken();

const initialState = {
    token: null,
    created_Account:null,
    loggedIn: token ? true : false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_COMMON_ERROR:
            return {
                error: action.payload,
                loggedIn: token ? true : false
            }
        case LOGIN_SUCCESS:
            return {
                token: action.payload.accessToken,
                loggedIn: token ? true : false
            };
        case LOGIN_FAILED:
            return {
                error: action.payload,
                loggedIn: token ? true : false
            }
        case CREATE_ACCOUNT_SUCCESS:
            return {
                created_Account: action.payload.message,
                loggedIn: false,
            }
        case CREATE_ACCOUNT_FAILED:
            return {
                error: action.payload,
                loggedIn: false,
            }
        case LOGOUT: return null;
        default: return state;
    }
};
