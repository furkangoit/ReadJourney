import axios from 'axios';

export const BASE_URL = 'https://readjourney.b.goit.study/api';

const api = axios.create({
    baseURL: BASE_URL,
});

// Request interceptor: Attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: Handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                // Call refresh endpoint
                // NOTE: We use a separate axios call to avoid interceptor loop
                const { data } = await axios.get(`${BASE_URL}/users/current/refresh`, {
                    headers: { Authorization: `Bearer ${refreshToken}` }
                });

                // Store new tokens (assuming the API returns them in this format, typically { token, refreshToken })
                const { token, refreshToken: newRefreshToken } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Update authorization header and retry
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                originalRequest.headers['Authorization'] = `Bearer ${token}`;

                return api(originalRequest);

            } catch (refreshError) {
                // Refresh failed (expired or invalid), clear storage and redirect
                // We avoid window.location.assign if possible to use React Router, but in axios interceptor it's hard.
                // A common pattern is to dispatch a logout action if using Redux, but we don't have store access here easily yet.
                console.error("Session expired", refreshError);
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
