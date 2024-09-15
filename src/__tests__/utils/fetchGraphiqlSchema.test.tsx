import { fetchGraphiqlSchema } from '@/utils/fetchGraphiqlSchema';
import { docsSectionActions } from '@/redux/slices/graphiqlDocsSectionSlice';
import { loadingDocsActions } from '@/redux/slices/LoadingDocsSlice';
import { INTROSPECTION_QUERY } from '@/constants/components';
import { buildClientSchema, printSchema } from 'graphql';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('graphql', () => ({
  buildClientSchema: vi.fn(),
  printSchema: vi.fn(),
}));

describe('fetchGraphiqlSchema', () => {
  const mockDispatch = vi.fn();
  const mockToggleIsShowBtnDocs = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully fetch the schema and update the docs section', async () => {
    // Мокаем успешный fetch запрос
    const mockSchema = { data: 'mocked data' };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockSchema }),
      })
    ) as jest.Mock;

    const mockPrintedSchema = 'mocked printed schema';
    (buildClientSchema as vi.Mock).mockReturnValue(mockSchema);
    (printSchema as vi.Mock).mockReturnValue(mockPrintedSchema);

    await fetchGraphiqlSchema(
      '/graphql',
      mockDispatch,
      mockToggleIsShowBtnDocs
    );

    // Проверяем вызовы
    expect(mockDispatch).toHaveBeenCalledWith(
      loadingDocsActions.setLoading(true)
    );
    expect(global.fetch).toHaveBeenCalledWith('/graphql/?sdl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: INTROSPECTION_QUERY }),
    });
    expect(buildClientSchema).toHaveBeenCalledWith(mockSchema);
    expect(printSchema).toHaveBeenCalledWith(mockSchema);

    expect(mockToggleIsShowBtnDocs).toHaveBeenCalledWith(true);
    expect(mockDispatch).toHaveBeenCalledWith(
      docsSectionActions.setDocsSectionCode(mockPrintedSchema)
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      loadingDocsActions.setLoading(false)
    );
  });

  it('should handle fetch error and clear the docs section', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Failed to fetch')));

    await fetchGraphiqlSchema(
      '/graphql',
      mockDispatch,
      mockToggleIsShowBtnDocs
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      loadingDocsActions.setLoading(true)
    );
    expect(global.fetch).toHaveBeenCalledWith('/graphql/?sdl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: INTROSPECTION_QUERY }),
    });

    expect(mockToggleIsShowBtnDocs).toHaveBeenCalledWith(null);
    expect(mockDispatch).toHaveBeenCalledWith(
      docsSectionActions.setDocsSectionCode('')
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      loadingDocsActions.setLoading(false)
    );
  });
});
