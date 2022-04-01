import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../apis/userApi";
import { errorHandler } from "../utils/errorHandler";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    userData: user ?? null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const res = await UserApi.login(data);

        if (res.data) localStorage.setItem("user", JSON.stringify(res.data));

        return res.data;
    } catch (err) {
        const message = errorHandler(err);

        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    await localStorage.removeItem("user");
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userData = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.userData = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userData = null;
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;