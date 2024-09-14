import { createSlice } from '@reduxjs/toolkit';

interface LoadingDocsState {
  isLoading: boolean;
}

const initialState: LoadingDocsState = {
  isLoading: false,
};

const loadingDocsSlice = createSlice({
  name: 'loadingDocs',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const loadingDocsActions = loadingDocsSlice.actions;

export const loadingDocsReducer = loadingDocsSlice.reducer;
