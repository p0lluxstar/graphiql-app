import { createSlice } from '@reduxjs/toolkit';

interface LoadingResponseState {
  isLoading: boolean;
}

const initialState: LoadingResponseState = {
  isLoading: false,
};

const loadingResponseSlice = createSlice({
  name: 'loadingResponse',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const loadingResponseActions = loadingResponseSlice.actions;

export const loadingResponseReducer = loadingResponseSlice.reducer;
