import { createAsyncThunk } from "@reduxjs/toolkit";
import UserApi from "../apis/userApi";
import { errorHandler } from "../utils/errorHandler";

const initialState = {
    users: [],
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false
};

export const createCustomer = createAsyncThunk("users/create",
    async (data, thunkAPI) => {
        try {
            const res = await UserApi.create(data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });