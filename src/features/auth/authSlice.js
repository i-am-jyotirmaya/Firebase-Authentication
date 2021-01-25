import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authStatus: -1,
        user: undefined
    },
    reducers: {
        login: (state, action) => {
            state.authStatus = action.payload.authStatus;
            state.user = action.payload.user;
        },
        signup: (state, action) => {

        },
        logout: (state, action) => {
            state.authStatus = 0;
        }
    }
});

export const {login, logout, signup} = authSlice.actions;

// export const selectAuthStatus = state => {
//     return {isAuthenticated: state.auth.isAuthenticated, user: state.auth.user}
// };

export const selectAuthStatus = state => state.auth;

export default authSlice.reducer;