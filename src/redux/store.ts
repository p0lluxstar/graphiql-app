import { configureStore } from '@reduxjs/toolkit';
import { querySectionReducer } from './slices/graphiqlQuerySectionSlice';
import { responseSectionReducer } from './slices/graphiqlResponseSectionSlice';
import { variablesSectionReducer } from './slices/graphiqlVariablesSectionSlice';
import { headersSectionReducer } from './slices/graphiqlHeadersSectionSlice';
import { docsSectionReducer } from './slices/graphiqlDocsSection.Slice';

export const store = configureStore({
  reducer: {
    querySectionReducer,
    responseSectionReducer,
    variablesSectionReducer,
    headersSectionReducer,
    docsSectionReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
