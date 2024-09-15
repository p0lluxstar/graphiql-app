import styles from '../../styles/components/graphiql/querySection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { RootState } from '@/redux/store';
import useHandleBlur from '@/hooks/useHandleBlur';
import { useVisibility } from '@/context/VisibilityContext';
import { format } from 'graphql-formatter';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { grahpiqlErrorMessageActions } from '@/redux/slices/graphiqlErrorMessageSlice';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export default function QuerySection(): JSX.Element {
  const t = useTranslations();
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
      dispatch(grahpiqlErrorMessageActions.setError('Invalid query code'));
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        overflow: 'auto',
      }}
      data-testid="querySection"
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
          background: '#282c34',
          borderButtom: '1px solid #ccc',
        }}
      >
        <h2>{t('query')}</h2>
        <Box>
          <Button
            onClick={formatCode}
            sx={{
              fontSize: '30px',
            }}
          >
            <CleaningServicesIcon />
          </Button>
        </Box>
      </Box>
      <CodeMirror
        extensions={[langs.javascript()]}
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
