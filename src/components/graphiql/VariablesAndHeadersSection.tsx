import styles from '../../styles/components/graphiql/variablesAndHeadersSection.module.css';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { variablesSectionActions } from '@/redux/slices/graphiqlVariablesSectionSlice';
import { headersSectionActions } from '@/redux/slices/graphiqlHeadersSectionSlice';
import { useRouter } from 'next/navigation';
import useHandleBlur from '@/hooks/useHandleBlur';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { grahpiqlErrorMessageActions } from '@/redux/slices/graphiqlErrorMessageSlice';
import { useTranslations } from 'next-intl';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { graphiqlUrlQueryActions } from '@/redux/slices/graphiqlUrlQuerySlice';

export default function VariablesAndHeadersSection(): JSX.Element {
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleBlur } = useHandleBlur();
  const [showVariables, setShowVariables] = useState(true);
  const [showHeaders, setShowHeaders] = useState(false);
  const [currentValueHeaders, setCurrentValueHeaders] = useState('');
  const [tabsValue, setTabsValue] = useState('variables');

  const variablesSectionCode = useSelector(
    (state: RootState) => state.variablesSectionReducer.variablesSectionCode
  );

  const headersSectionCode = useSelector(
    (state: RootState) => state.headersSectionReducer.headersSectionCode
  );

  const querySectionCode = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  const handlerVariablesButton = (): void => {
    setShowVariables(true);
    setShowHeaders(false);
  };

  const handlerHeadersButton = (): void => {
    setShowHeaders(true);
    setShowVariables(false);
  };

  const handleVariablesChange = (value: string): void => {
    dispatch(variablesSectionActions.setVariablesSectionCode(value));
  };

  const handleHeadersChange = (value: string): void => {
    dispatch(headersSectionActions.setHeadersSectionCode(value));
    setCurrentValueHeaders(value);
  };

  const handleBlurHeaders = (): void => {
    if (currentValueHeaders != '') {
      const jsonObject = JSON.parse(currentValueHeaders);
      const currentUrl = window.location.pathname;
      const searchParams = new URLSearchParams(jsonObject);
      const newUrl = `${currentUrl}?${searchParams.toString()}`;
      router.push(newUrl);
      dispatch(graphiqlUrlQueryActions.setGraphiqlUrlQuery(newUrl));
    }
  };

  const handleFormatJson = (): void => {
    try {
      if (variablesSectionCode.length > 0) {
        const formattedVariablesSectionCode = JSON.stringify(
          JSON.parse(variablesSectionCode),
          null,
          2
        );
        dispatch(
          variablesSectionActions.setVariablesSectionCode(
            formattedVariablesSectionCode
          )
        );
      }

      if (headersSectionCode.length > 0) {
        const formattedHeadersSectionCode = JSON.stringify(
          JSON.parse(headersSectionCode),
          null,
          2
        );
        dispatch(
          headersSectionActions.setHeadersSectionCode(
            formattedHeadersSectionCode
          )
        );
      }
    } catch (error) {
      dispatch(grahpiqlErrorMessageActions.setError('Error when parsing JSON'));
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        overflow: 'auto',
      }}
      data-testid="variablesAndHeadersSection"
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '44px',
          width: '100%',
          paddingLeft: '10px',
          paddingTop: '2px',
          background: '#282c34',
        }}
      >
        <Tabs
          value={tabsValue}
          onChange={(_, newValue) => setTabsValue(newValue)}
          aria-label="basic tabs example"
          sx={{
            minHeight: '32px',
            '& .MuiTab-root': {
              color: '#D4D4D4',
            },
            '& .Mui-selected': {
              color: '#D4D4D4',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#007ACC',
            },
          }}
        >
          <Tab
            label={t('variables')}
            value="variables"
            sx={{ minHeight: '32px', fontSize: '14px' }}
            onClick={handlerVariablesButton}
          />
          <Tab
            label={t('headers')}
            value="headers"
            sx={{ minHeight: '32px', fontSize: '14px' }}
            onClick={handlerHeadersButton}
          />
        </Tabs>
        <Box>
          <Button
            onClick={handleFormatJson}
            sx={{
              fontSize: '30px',
            }}
          >
            <CleaningServicesIcon />
          </Button>
        </Box>
      </Box>
      {showVariables && (
        <CodeMirror
          value={variablesSectionCode}
          extensions={[langs.json()]}
          theme={oneDark}
          onBlur={handleBlur}
          height="100%"
          onChange={(value) => handleVariablesChange(value)}
          className={styles.variablesAndHeadersCode}
          readOnly={querySectionCode === ''}
          data-testid="variables"
        />
      )}
      {showHeaders && (
        <CodeMirror
          value={headersSectionCode}
          extensions={[langs.json()]}
          theme={oneDark}
          onBlur={handleBlurHeaders}
          height="100%"
          onChange={(value) => handleHeadersChange(value)}
          className={styles.variablesAndHeadersCode}
          readOnly={querySectionCode === ''}
          data-testid="headers"
        />
      )}
    </Box>
  );
}
