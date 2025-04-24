import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/', // Change if your backend runs on another port
});

export default instance;
