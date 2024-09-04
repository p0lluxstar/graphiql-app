import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  docsSectionCode: string;
}

const initialState: IInitialState = {
  docsSectionCode: ``,
};

const docsSectionSlice = createSlice({
  name: 'docsSection',
  initialState,
  reducers: {
    setDocsSectionCode: (state, actions) => {
      return { ...state, docsSectionCode: actions.payload };
    },
  },
});

export const docsSectionActions = docsSectionSlice.actions;

export const docsSectionReducer = docsSectionSlice.reducer;
