import axios, { CreateAxiosDefaults } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
} as CreateAxiosDefaults);

api.defaults.headers.common['Accept'] = 'application/json';
api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
