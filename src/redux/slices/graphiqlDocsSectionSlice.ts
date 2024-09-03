import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  docsSectionCode: string;
  isDocsSectionVisible: boolean;
}

const initialState: IInitialState = {
  docsSectionCode: ``,
  isDocsSectionVisible: false,
};

const docsSectionSlice = createSlice({
  name: 'docsSection',
  initialState,
  reducers: {
    setDocsSectionCode: (state, actions) => {
      return { ...state, docsSectionCode: actions.payload };
    },
    toggleDocsSectionVisibility: (state) => {
      state.isDocsSectionVisible = !state.isDocsSectionVisible;
    },
  },
});

export const docsSectionActions = docsSectionSlice.actions;

export const docsSectionReducer = docsSectionSlice.reducer;
