import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const config = {
//     headers: {
//         'Content-Type': 'application/json',
//     },
// }

export const authentication = createAsyncThunk('auth/authenticate', async (loginData) => {
    let data;
    try {
        const res = await fetch('https://ujkp2xeahs.us-east-1.awsapprunner.com/api/v1/authenticate/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
        localStorage.setItem('accessToken',user.payload)
        return user
    } catch (error) {
        console.log(error.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isSuccess: false,
        isFailed: false,
        loading: false,
        message: '',
        payload: '',
    },
    reducers: {
        logout: (state, action) => {
            state.isSuccess = false
            state.isFailed = false
            state.loading = false
            state.message = ''
            state.payload = ''
        }
    },
    extraReducers: {
        [authentication.pending]: (state, { payload }) => {
            state.loading = true
            state.isFailed = false
        },
        [authentication.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.isSuccess = payload.message == 'success' ? true : false
            state.isFailed = payload.message == 'success' ? false : true
            state.message = payload.message
            state.payload = state.isSuccess ? payload.payload : ""
        },
        [authentication.rejected]: (state, { payload }) => {
            state.loading = false
            state.isSuccess = false
            state.isFailed = true
            state.message = 'failed'
            state.payload = ''
        },
    }
})

export const { logout } = authSlice.actions
export default authSlice