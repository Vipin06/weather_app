import CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';

import { setAuthorization } from './api/index';
export function getToken() {
  return localStorage.getItem('accessToken');
}

export function isAuth() {
  try {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return jwtDecode(token);
    }
    return false;
  } catch (err) {
    return false;
  }
}


export function login(token, appId = '') {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('appId', appId);
  setAuthorization();
  return true;
}


export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('appId');
  setAuthorization();
  setTimeout(() => {
    window.location.replace('/sign-in')
  }, 500);
  return true;
}
