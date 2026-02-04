import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
    user: { name: null, email: null },
    token: null,
    refreshToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                // If API returns token on signup
                if (action.payload.token) {
                    state.user = action.payload.user || action.payload; // Adjust based on actual API response structure
                    state.token = action.payload.token;
                    state.refreshToken = action.payload.refreshToken;
                    state.isLoggedIn = true;
                }
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.user = {
                    name: action.payload.name,
                    email: action.payload.email
                }; // Adjust based on API
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.refreshToken = null;
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                // /users/current usually returns just user info
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
                state.error = null;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
                state.isLoggedIn = false; // Token invalid
            });
    },
});

export const authReducer = authSlice.reducer;
