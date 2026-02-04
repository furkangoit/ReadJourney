import api from './api';

export const authApi = {
    signup: async (data) => {
        const response = await api.post('/users/signup', data);
        return response.data;
    },
    signin: async (data) => {
        const response = await api.post('/users/signin', data);
        return response.data;
    },
    signout: async () => {
        const response = await api.post('/users/signout');
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await api.get('/users/current');
        return response.data;
    },
    refresh: async () => {
        // Usually handled by interceptor, but exposed just in case
        const response = await api.get('/users/current/refresh');
        return response.data;
    }
};
