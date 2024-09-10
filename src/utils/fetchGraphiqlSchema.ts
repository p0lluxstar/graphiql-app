import { docsSectionActions } from '@/redux/slices/graphiqlDocsSectionSlice';
import { loadingDocsActions } from '@/redux/slices/LoadingDocsSlice';
import { INTROSPECTION_QUERY } from '@/constants/components';
import { Dispatch } from '@reduxjs/toolkit';
import { buildClientSchema, printSchema } from 'graphql';

export const fetchGraphiqlSchema = async (
  url: string,
  dispatch: Dispatch,
  toggleIsShowBtnDocs: (valud: boolean | null) => void
): Promise<void> => {
  dispatch(loadingDocsActions.setLoading(true));

  try {
    const response = await fetch(`${url}/?sdl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: INTROSPECTION_QUERY }),
    });

    const result = await response.json();
    const schema = buildClientSchema(result.data);
    const schemaData = printSchema(schema);

    toggleIsShowBtnDocs(true);
    dispatch(docsSectionActions.setDocsSectionCode(schemaData));
  } catch (error) {
    toggleIsShowBtnDocs(null);
    dispatch(docsSectionActions.setDocsSectionCode(''));
  } finally {
    dispatch(loadingDocsActions.setLoading(false));
  }
};
