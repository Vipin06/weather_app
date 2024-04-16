import axios from './instance';
import * as auth from '../auth';
import apiKeys from './apiKeys';

const getUrlByKey = (key) => {
  return apiKeys[key];
};

class API {  /**
   * auth2 login api
   * @param {string} url String
   * @param {object} payload Object
   * @param {object} action Object e.g {type: 'AUTH', dispatch: function(){} }
   * @returns {Promise<void>} void
   */

  static apiPost = async (key, args, headers) => {
    return await axios.post(getUrlByKey(key), args, headers);
  };

  static apiPostUrl = async (key, dynamicUrl, args) => {
    return axios.post(getUrlByKey(key) + dynamicUrl, args);
  };
  
}

export default API;

axios.interceptors.request.use(
  (configs) => {
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && window.location.pathname !== '/sign-in') {
    }
    return Promise.reject(error);
  }
);

export const setAuthorization = () => {
  axios.defaults.withCredentials = false;
  axios.defaults.headers.common.authorization = localStorage.getItem('accessToken') ? 'Bearer ' + localStorage.getItem('accessToken') : '';
};
setAuthorization();