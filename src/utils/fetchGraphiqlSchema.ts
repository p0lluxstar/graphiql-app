import { docsSectionActions } from '@/redux/slices/graphiqlDocsSectionSlice';
import { INTROSPECTION_QUERY } from '@/constants/components';
import { Dispatch } from '@reduxjs/toolkit';
import { buildClientSchema, printSchema } from 'graphql';

export const fetchGraphiqlSchema = async (
  url: string,
  dispatch: Dispatch,
  toggleIsShowBtnDocs: (valud: boolean) => void
): Promise<void> => {
  try {
    const response = await fetch(`${url}`, {
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
    toggleIsShowBtnDocs(false);
    dispatch(docsSectionActions.setDocsSectionCode(''));
  }
};
