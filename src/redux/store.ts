import { configureStore } from '@reduxjs/toolkit';
import { querySectionReducer } from './slices/graphiqlQuerySectionSlice';
import { responseSectionReducer } from './slices/graphiqlResponseSectionSlice';
import { variablesSectionReducer } from './slices/graphiqlVariablesSectionSlice';
import { headersSectionReducer } from './slices/graphiqlHeadersSectionSlice';
import { docsSectionReducer } from './slices/graphiqlDocsSectionSlice';
import { grahpiqlErrorMessageReducer } from './slices/graphiqlErrorMessageSlice';

export const store = configureStore({
  reducer: {
    querySectionReducer,
    responseSectionReducer,
    variablesSectionReducer,
    headersSectionReducer,
    docsSectionReducer,
    grahpiqlErrorMessageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
