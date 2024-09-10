import styles from '../../styles/components/graphiql/querySection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { RootState } from '@/redux/store';
import useHandleBlur from '@/hooks/useHandleBlur';
import { useVisibility } from '@/context/VisibilityContext';
import { format } from 'graphql-formatter';
import { VscCodeOss } from 'react-icons/vsc';
import { Box, Button } from '@mui/material';

export default function QuerySection(): JSX.Element {
  const dispatch = useDispatch();
  const { handleBlur } = useHandleBlur();
  const { isShowUrlApiApplyBtn } = useVisibility();

  const querySectionCode = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  const handleChange = (value: string): void => {
    dispatch(querySectionActions.setQuerySectionCode(value));
  };

  const formatCode = (): void => {
    try {
      const formattedCode = format(querySectionCode);
      dispatch(querySectionActions.setQuerySectionCode(formattedCode));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ошибка форматирования:', error);
    }
  };

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
          paddingLeft: '10px',
          paddingTop: '4px',
          color: '#FFFFFF',
        }}
      >
        <h2>Query</h2>
        <Box>
          <Button
            onClick={formatCode}
            sx={{
              fontSize: '30px',
            }}
          >
            <VscCodeOss />
          </Button>
        </Box>
      </Box>
      <CodeMirror
        extensions={[javascript()]}
        onBlur={handleBlur}
        theme={oneDark}
        height="100%"
        onChange={(value) => handleChange(value)}
        className={styles.querySectionCode}
        value={querySectionCode}
        readOnly={!isShowUrlApiApplyBtn}
      />
    </Box>
  );
}
