import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  responseSectionCode: string;
}

const initialState: IInitialState = {
  responseSectionCode: ``,
};

const responseSectionSlice = createSlice({
  name: 'responseSection',
  initialState,
  reducers: {
    setResponseSectionCode: (state, actions) => {
      return { ...state, responseSectionCode: actions.payload };
    },
  },
});

export const responseSectionActions = responseSectionSlice.actions;

export const responseSectionReducer = responseSectionSlice.reducer;
