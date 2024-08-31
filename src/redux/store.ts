import { configureStore } from '@reduxjs/toolkit';
import { querySectionReducer } from './slices/graphiqlQuerySectionSlice';
import { responseSectionReducer } from './slices/graphiqlResponseSectionSlice';

export const store = configureStore({
  reducer: { querySectionReducer, responseSectionReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
