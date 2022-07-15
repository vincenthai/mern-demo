import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import nailPolishService from './nailPolishService';

// Initial state
const initialState = {
    nailPolishes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Create a new nail polish
export const createNailPolish = createAsyncThunk('nailPolishes/create', async (nailPolishData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await nailPolishService.createNailPolish(nailPolishData, token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Get nail polishes
export const getNailPolishes = createAsyncThunk('nailPolishes/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await nailPolishService.getNailPolishes(token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Delete nail polish
export const deleteNailPolish = createAsyncThunk('nailPolishes/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await nailPolishService.deleteNailPolish(id, token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Slice
export const nailPolishSlice = createSlice({
    name: 'nailPolish',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNailPolish.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNailPolish.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.nailPolishes.push(action.payload)
            })
            .addCase(createNailPolish.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getNailPolishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNailPolishes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.nailPolishes = action.payload
            })
            .addCase(getNailPolishes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteNailPolish.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteNailPolish.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.nailPolishes = state.nailPolishes.filter((nailPolish) => nailPolish._id !== action.payload.id)
            })
            .addCase(deleteNailPolish.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = nailPolishSlice.actions;
export default nailPolishSlice.reducer;