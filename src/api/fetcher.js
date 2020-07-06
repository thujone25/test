import axios from "axios";

const api = axios.create({
  baseURL: 'http://interview.agileengine.com',
  withCredentials: false
});

api.interceptors.request.use(
  async config => {
    if (config.url.indexOf('/auth') != -1) return config;
    const token = localStorage.getItem('authToken');
    if (!token) {
      const tokenData = await api.post('/auth', { "apiKey": "23567b218376f79d9415" });
      localStorage.setItem('authToken', tokenData.data.token);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status == 401) {
      const tokenData = await api.post('/auth', { "apiKey": "23567b218376f79d9415" });
      localStorage.setItem('authToken', tokenData.data.token);
      const config = error.config;
      return axios.request(config).then(response => {
        Promise.resolve(response);
      }).catch((err) => {
        Promise.reject(err);
      });
    }
    Promise.reject(error);
  }
);

export default api;
