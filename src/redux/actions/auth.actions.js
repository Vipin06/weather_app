import { get } from 'lodash';
import API from '../../helpers/api';
import * as auth from '../../helpers/auth';
import {
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  AUTH_COMMON_ERROR,

} from "./types";


const config = {
  headers: {
    'Content-Type': "application/json; charset=utf-8"
  }
}

function errorRequest(err, dispatch) {
  let data = get(err, 'response.data', null);
  data = data || get(err, 'response');
  data = data || err;
  if (data.error) {
    dispatch({
      type: AUTH_COMMON_ERROR,
      payload: data.error,
    });
  } else if (data.status === 402) { 
    auth.logout()
  } else {
    dispatch({
      type: AUTH_COMMON_ERROR,
      payload: data,
    });
  }
}

export const Login = (payload) => {
  return async (dispatch) => {
    try {
      const response = await API.apiPost('login', payload);
      if (response.data && response.data.message) {
        if (response.data.token) {
          auth.login(response.data.token);
          window.location.replace('/')
          await dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        } else {
          await dispatch({ type: LOGIN_FAILED, payload: response.data.message });
        }
      } else {
        await dispatch({ type: LOGIN_FAILED, payload: response.data.message });
      }
    } catch (err) {
      errorRequest(err, dispatch);
    }
  };
}

export const createAccount = (payload) => {
  return async (dispatch) => {
    try {
      const response = await API.apiPost('signup', payload);
      if (response.data && response.data.message) {
        await dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: response.data });
      } else {
        await dispatch({ type: CREATE_ACCOUNT_FAILED, payload: response.data.message });
      }
    } catch (error) {
      errorRequest(error, dispatch);
    }
  }
}


export function logout() {
  return (dispatch) => {
    try {
      auth.logout();
    } catch (err) {
      errorRequest(err, dispatch);
    }
  };
}