import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../apis/userApi";
import { errorHandler } from "../utils/errorHandler";

const initialState = {
    users: [],
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const createUser = createAsyncThunk("users/create",
    async (data, thunkAPI) => {
        try {
            const res = await UserApi.create(data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getUsers = createAsyncThunk("users/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await UserApi.getAll();

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getUserById = createAsyncThunk("users/getById",
    async (id, thunkAPI) => {
        try {
            const res = await UserApi.getById(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const updateUser = createAsyncThunk("users/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await UserApi.update(id, data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const deleteUser = createAsyncThunk("users/delete",
    async (id, thunkAPI) => {
        try {
            const res = await UserApi.remove(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const userSlice = createSlice({
    name: "user",
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
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state?.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = { ...state.user, ...action.payload };
                state.users = state.users.map((user) => {
                    if (user._id === action.payload._id)
                        return { ...user, ...action.payload };

                    return user;
                });
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = state.users.filter(
                    (user) => user._id !== action.payload._id);
                state.message = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;