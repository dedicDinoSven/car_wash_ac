import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorHandler } from "../utils/errorHandler";
import WashingProgramApi from "../apis/washingProgramApi";

const initialState = {
    steps: [],
    programs: [],
    program: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const createStep = createAsyncThunk("programs/steps/create",
    async (data, thunkAPI) => {
        try {
            const res = await WashingProgramApi.createStep(data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getSteps = createAsyncThunk("/programs/steps/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await WashingProgramApi.getAllSteps();

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const deleteStep = createAsyncThunk("/programs/steps/delete",
    async (id, thunkAPI) => {
        try {
            const res = await WashingProgramApi.removeStep(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const createProgram = createAsyncThunk("/programs/create",
    async (data, thunkAPI) => {
        try {
            const res = await WashingProgramApi.createProgram(data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getPrograms = createAsyncThunk("/programs/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await WashingProgramApi.getAllPrograms();

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const getProgramById = createAsyncThunk("/programs/getById",
    async (id, thunkAPI) => {
        try {
            const res = await WashingProgramApi.getProgramById(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const updateProgram = createAsyncThunk("/programs/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await WashingProgramApi.updateProgram(id, data);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const deleteProgram = createAsyncThunk("/programs/delete",
    async (id, thunkAPI) => {
        try {
            const res = await WashingProgramApi.removeProgram(id);

            return res.data;
        } catch (err) {
            const message = errorHandler(err);

            return thunkAPI.rejectWithValue(message);
        }
    });

export const programSlice = createSlice({
    name: "program",
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
            .addCase(createStep.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createStep.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state?.steps.push(action.payload);
            })
            .addCase(createStep.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSteps.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSteps.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.steps = action.payload;
            })
            .addCase(getSteps.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteStep.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteStep.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.steps = state.steps.filter(
                    (step) => step._id !== action.payload._id);
                state.message = action.payload.message;
            })
            .addCase(deleteStep.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createProgram.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProgram.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state?.programs.push(action.payload);
            })
            .addCase(createProgram.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPrograms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPrograms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.programs = action.payload;
            })
            .addCase(getPrograms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProgramById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProgramById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.program = action.payload;
            })
            .addCase(getProgramById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProgram.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProgram.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.program = { ...state.program, ...action.payload };
                state.programs = state.programs.map((program) => {
                    if (program._id === action.payload._id)
                        return { ...program, ...action.payload };

                    return program;
                });
            })
            .addCase(updateProgram.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteProgram.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProgram.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.programs = state.programs.filter(
                    (program) => program._id !== action.payload._id);
                state.message = action.payload.message;
            })
            .addCase(deleteProgram.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = programSlice.actions;
export default programSlice.reducer;