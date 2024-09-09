import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  headersSectionCode: string;
}

const initialState: IInitialState = {
  headersSectionCode: '',
};

const headersSectionSlice = createSlice({
  name: 'headersSection',
  initialState,
  reducers: {
    setHeadersSectionCode: (state, actions) => {
      return { ...state, headersSectionCode: actions.payload };
    },
  },
});

export const headersSectionActions = headersSectionSlice.actions;

export const headersSectionReducer = headersSectionSlice.reducer;
