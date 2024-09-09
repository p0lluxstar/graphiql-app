import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  variablesSectionCode: string;
}

const initialState: IInitialState = {
  variablesSectionCode: '',
};

const variablesSectionSlice = createSlice({
  name: 'variablesSection',
  initialState,
  reducers: {
    setVariablesSectionCode: (state, actions) => {
      return { ...state, variablesSectionCode: actions.payload };
    },
  },
});

export const variablesSectionActions = variablesSectionSlice.actions;

export const variablesSectionReducer = variablesSectionSlice.reducer;
