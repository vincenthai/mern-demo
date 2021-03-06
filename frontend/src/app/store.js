import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import patternReducer from '../features/patterns/patternSlice';
import nailPolishReducer from '../features/nailPolishes/nailPolishSlice';
import randomizerReducer from '../features/randomizer/randomizerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patterns: patternReducer,
    nailPolishes: nailPolishReducer,
    polishCombo: randomizerReducer
  },
});
