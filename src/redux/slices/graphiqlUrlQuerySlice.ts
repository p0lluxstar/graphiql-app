import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  graphiqlUrlQuery: string;
}

const initialState: IInitialState = {
  graphiqlUrlQuery: '',
};

const graphiqlUrlQuerySlice = createSlice({
  name: 'graphiqlUrlQuery',
  initialState,
  reducers: {
    setGraphiqlUrlQuery: (state, { payload }) => {
      state.graphiqlUrlQuery = payload;
    },
  },
});

export const graphiqlUrlQueryActions = graphiqlUrlQuerySlice.actions;

export const graphiqlUrlQueryReducer = graphiqlUrlQuerySlice.reducer;
