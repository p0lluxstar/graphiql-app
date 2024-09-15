import styles from '../../styles/components/graphiql/responseSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { langs } from '@uiw/codemirror-extensions-langs';

export default function ResponseSection(): JSX.Element {
  const t = useTranslations();

  const isLoading = useSelector(
    (state: RootState) => state.loadingResponseReducer.isLoading
  );

  const responseSectionCode = useSelector(
    (state: RootState) => state.responseSectionReducer.responseSectionCode
  );

  const responseCodeAndStatus = useSelector(
    (state: RootState) => state.responseSectionReducer.responseCodeAndStatus
  );

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        overflow: 'auto',
      }}
      data-testid="responseSection"
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '44px',
          padding: '2px 10px 0px 10px',
          color: '#FFFFFF',
        }}
      >
        <h2>{t('response')}</h2>
        {responseSectionCode.length > 0 && (
          <Box
            sx={{
              fontSize: '14px',
              color: '#c38d0a',
            }}
          >
            {responseCodeAndStatus}
          </Box>
        )}
      </Box>
      <Box className={styles.responseSectionCode}>
        {isLoading ? (
          <Box sx={{ color: '#FFFFFF', textAlign: 'center' }}>
            {t('loading')}
          </Box>
        ) : (
          responseSectionCode.length > 0 && (
            <CodeMirror
              value={responseSectionCode}
              extensions={[
                langs.json(),
                /* EditorView.theme({
                  '&.cm-editor .cm-gutters': { display: 'none' },
                }),
                darkTheme, */
              ]}
              theme={oneDark}
              height="100%"
              readOnly={true}
            />
          )
        )}
      </Box>
    </Box>
  );
}
