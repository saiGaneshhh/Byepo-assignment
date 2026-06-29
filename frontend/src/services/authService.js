import api from './api';

export const login = async (payload) => api.post('/auth/login', payload);
export const signup = async (payload) => api.post('/auth/register', payload);
