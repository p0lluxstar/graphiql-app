import styles from '../../styles/components/graphiql/responseSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { Box } from '@mui/material';

export default function ResponseSection(): JSX.Element {
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
        <h2>Response</h2>
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
          <Box sx={{ color: '#FFFFFF', textAlign: 'center' }}>Loading...</Box>
        ) : (
          responseSectionCode.length > 0 && (
            <CodeMirror
              value={responseSectionCode}
              extensions={[
                json(),
                EditorView.theme({
                  '&.cm-editor .cm-gutters': { display: 'none' },
                }),
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
