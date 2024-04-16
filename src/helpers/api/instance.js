import axios from 'axios';
const VERSION = "http://localhost:5000/api/auth"

const instance = axios.create({
  baseURL: VERSION,
});

export default instance;