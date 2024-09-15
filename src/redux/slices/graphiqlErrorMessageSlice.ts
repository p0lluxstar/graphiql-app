import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  errorMessage: string;
}

const initialState: IInitialState = {
  errorMessage: '',
};

const grahpiqlErrorMessage = createSlice({
  name: 'grahpiqlErrorMessage',
  initialState,
  reducers: {
    setError: (state, actions) => {
      state.errorMessage = actions.payload;
    },
  },
});

export const grahpiqlErrorMessageActions = grahpiqlErrorMessage.actions;

export const grahpiqlErrorMessageReducer = grahpiqlErrorMessage.reducer;
