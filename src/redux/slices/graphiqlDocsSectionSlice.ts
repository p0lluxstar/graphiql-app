import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  docsSectionData: string;
}

const initialState: IInitialState = {
  docsSectionData: '',
};

const docsSectionSlice = createSlice({
  name: 'docsSection',
  initialState,
  reducers: {
    setDocsSectionCode: (state, actions) => {
      return { ...state, docsSectionData: actions.payload };
    },
  },
});

export const docsSectionActions = docsSectionSlice.actions;

export const docsSectionReducer = docsSectionSlice.reducer;
