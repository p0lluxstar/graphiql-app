import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  responseSectionCode: string;
  responseCodeAndStatus: string;
}

const initialState: IInitialState = {
  responseSectionCode: '',
  responseCodeAndStatus: '',
};

const responseSectionSlice = createSlice({
  name: 'responseSection',
  initialState,
  reducers: {
    setResponseSectionCode: (state, actions) => {
      return { ...state, responseSectionCode: actions.payload };
    },
    setResponseCodeAndStatus: (state, actions) => {
      state.responseCodeAndStatus = actions.payload;
    },
  },
});

export const responseSectionActions = responseSectionSlice.actions;

export const responseSectionReducer = responseSectionSlice.reducer;
