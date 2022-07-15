import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import patternService from './patternService';

// Initial state
const initialState = {
    patterns: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Create new pattern
export const createPattern = createAsyncThunk('patterns/create', async (patternData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patternService.createPattern(patternData, token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Get patterns
export const getPatterns = createAsyncThunk('patterns/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patternService.getPatterns(token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Delete pattern
export const deletePattern = createAsyncThunk('patterns/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await patternService.deletePattern(id, token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Slice
export const patternSlice = createSlice({
    name: 'pattern',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPattern.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPattern.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.patterns.push(action.payload)
            })
            .addCase(createPattern.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPatterns.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPatterns.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.patterns = action.payload
            })
            .addCase(getPatterns.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePattern.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePattern.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.patterns = state.patterns.filter((pattern) => pattern._id !== action.payload.id)
            })
            .addCase(deletePattern.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = patternSlice.actions;
export default patternSlice.reducer;