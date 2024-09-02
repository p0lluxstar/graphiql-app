import { configureStore } from '@reduxjs/toolkit';
import { querySectionReducer } from './slices/graphiqlQuerySectionSlice';
import { responseSectionReducer } from './slices/graphiqlResponseSectionSlice';
import { variablesSectionReducer } from './slices/graphiqlVariablesSectionSlice';
import { headersSectionReducer } from './slices/graphiqlHeadersSectionSlice';

export const store = configureStore({
  reducer: {
    querySectionReducer,
    responseSectionReducer,
    variablesSectionReducer,
    headersSectionReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
