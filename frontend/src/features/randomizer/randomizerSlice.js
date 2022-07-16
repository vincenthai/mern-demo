import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import randomizerService from './randomizerService';

// Initial state
const initialState = {
    polish: '',
    pattern: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// get a random polish combo
export const getRandomPolishCombo = createAsyncThunk('randomizer/random', async (type, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await randomizerService.getNailPolishCombo(type, token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const randomizerSlice = createSlice({
    name: 'polishCombo',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRandomPolishCombo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRandomPolishCombo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.polish = action.payload[0];
                state.pattern = action.payload[1];
            })
            .addCase(getRandomPolishCombo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = randomizerSlice.actions;
export default randomizerSlice.reducer;