import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  querySectionCode: string;
}

const initialState: IInitialState = {
  querySectionCode: '',
};

const querySectionSlice = createSlice({
  name: 'querySection',
  initialState,
  reducers: {
    setQuerySectionCode: (state, actions) => {
      return { ...state, querySectionCode: actions.payload };
    },
  },
});

export const querySectionActions = querySectionSlice.actions;

export const querySectionReducer = querySectionSlice.reducer;
