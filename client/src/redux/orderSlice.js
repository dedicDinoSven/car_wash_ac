import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorHandler } from "../utils/errorHandler";
import OrderApi from "../apis/orderApi";

const initialState = {
    orders: [],
    order: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const createOrder = createAsyncThunk("/orders/create",
    async (data, thunkAPI) => {
        try {
            const res = await OrderApi.createOrder(data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getOrders = createAsyncThunk("/orders/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await OrderApi.getAllOrders();

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getOrderById = createAsyncThunk("/orders/getById",
    async (id, thunkAPI) => {
        try {
            const res = await OrderApi.getOrderById(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const updateOrder = createAsyncThunk("/orders/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await OrderApi.updateOrder(id, data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const deleteOrder = createAsyncThunk("/orders/delete",
    async (id, thunkAPI) => {
        try {
            const res = await OrderApi.removeOrder(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const orderSlice = createSlice({
    name: "order",
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
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state?.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getOrderById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.order = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.order = { ...state.order, ...action.payload };
                state.orders = state.orders.map((order) => {
                    if (order._id === action.payload._id)
                        return { ...order, ...action.payload };

                    return order;
                });
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = state.orders.filter(
                    (order) => order._id !== action.payload._id);
                state.message = action.payload.message;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;