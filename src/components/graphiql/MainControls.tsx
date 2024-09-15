import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { responseSectionActions } from '@/redux/slices/graphiqlResponseSectionSlice';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import { useEffect, useState } from 'react';
import { useVisibility } from '@/context/VisibilityContext';
import { fetchGraphiqlSchema } from '@/utils/fetchGraphiqlSchema';
import { useRouter } from 'next/navigation';
import { variablesSectionActions } from '@/redux/slices/graphiqlVariablesSectionSlice';
import { headersSectionActions } from '@/redux/slices/graphiqlHeadersSectionSlice';
import { ImCheckmark } from 'react-icons/im';
import { FaArrowsDownToLine } from 'react-icons/fa6';
import { FaArrowsUpToLine } from 'react-icons/fa6';
import { Box, Button, TextField } from '@mui/material';
import { loadingResponseActions } from '@/redux/slices/LoadingResponseSlice';
import { useTranslations } from 'next-intl';
import { grahpiqlErrorMessageActions } from '@/redux/slices/graphiqlErrorMessageSlice';
import { graphiqlUrlQueryActions } from '@/redux/slices/graphiqlUrlQuerySlice';
import { setLocalStorage } from '@/utils/localStorageService';

export default function MainControls(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const [urlApi, setUrlApi] = useState('');
  const [urlDocs, setUrlDocs] = useState('');
  const [isApply, setIsApply] = useState(false);
  const [isApplyDocs, setIsApplyDocs] = useState(false);
  const t = useTranslations();

  const querySectionCode = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  const variablesSectionCode = useSelector(
    (state: RootState) => state.variablesSectionReducer.variablesSectionCode
  );

  const headersSectionCode = useSelector(
    (state: RootState) => state.headersSectionReducer.headersSectionCode
  );

  const isLoadingDocs = useSelector(
    (state: RootState) => state.loadingDocsReducer.isLoading
  );

  const graphiqlUrlQuery = useSelector(
    (state: RootState) => state.graphiqlUrlQueryReducer.graphiqlUrlQuery
  );

  const {
    toggleIsShowVariablesAndHeaders,
    toggleIsShowDocs,
    toggleIsShowBtnDocs,
    isShowVariablesAndHeaders,
    isShowDocs,
    isShowBtnDocs,
    toggleisShowUrlApiApplyBtn,
  } = useVisibility();

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const segments = currentUrl.split('/');

    if (urlApi === '') {
      toggleisShowUrlApiApplyBtn(false);
      dispatch(querySectionActions.setQuerySectionCode(''));
      dispatch(responseSectionActions.setResponseSectionCode(''));
      dispatch(variablesSectionActions.setVariablesSectionCode(''));
      dispatch(headersSectionActions.setHeadersSectionCode(''));
    }

    if (segments[3]) {
      setIsApply(true);

      const urlApiParam = segments[3];
      const queryParam = segments[4];
      const searchParams = new URLSearchParams(window.location.search);

      let paramsStr = '';

      if (Array.from(searchParams.keys()).length > 0) {
        paramsStr = '{\n';
        searchParams.forEach((value, key) => {
          paramsStr += `  "${key}":"${value}",\n`;
        });
        paramsStr = paramsStr.slice(0, -2) + '\n}';
      }

      const decodedUrlApiParam = atob(urlApiParam || '');
      const decodedQueryParam = atob(queryParam || '');

      if (decodedUrlApiParam != '') {
        toggleisShowUrlApiApplyBtn(true);
      }

      if (decodedQueryParam != '') {
        const parsedData = JSON.parse(decodedQueryParam);
        const queryParse = parsedData.query;
        const variablesParse = parsedData.variables;

        let querySectionCode = '';
        let variblesSectionCode = '';

        if (queryParse) {
          querySectionCode = queryParse;
        }

        if (variablesParse) {
          variblesSectionCode = variablesParse;
        }

        dispatch(querySectionActions.setQuerySectionCode(querySectionCode));
        dispatch(
          variablesSectionActions.setVariablesSectionCode(variblesSectionCode)
        );
      }

      setUrlApi(decodedUrlApiParam);
      setUrlDocs(`${decodedUrlApiParam}/?sdl`);

      dispatch(headersSectionActions.setHeadersSectionCode(paramsStr));
    }
  }, []);

  const makeRequest = async (): Promise<void> => {
    let headersJSON: { [key: string]: string } = {};

    try {
      if (headersSectionCode.length > 0) {
        const correctedString = headersSectionCode.replace(/'/g, '"');
        headersJSON = JSON.parse(correctedString);
      }
    } catch (error) {
      dispatch(grahpiqlErrorMessageActions.setError('Error when parsing JSON'));
    }

    headersJSON['Content-Type'] = 'application/json';

    let variablesSectionCodeParse;
    if (variablesSectionCode === '') {
      variablesSectionCodeParse = JSON.parse('{}');
    } else {
      try {
        variablesSectionCodeParse = JSON.parse(variablesSectionCode);
      } catch (error) {
        dispatch(
          grahpiqlErrorMessageActions.setError('Error when parsing JSON')
        );
      }
    }

    dispatch(loadingResponseActions.setLoading(true));

    try {
      const response = await fetch(`${urlApi}`, {
        method: 'POST',
        headers: headersJSON,
        body: JSON.stringify({
          query: querySectionCode,
          variables: variablesSectionCodeParse,
        }),
      });

      const responseCode = response.status;
      const responseStatusText = response.statusText;

      dispatch(
        responseSectionActions.setResponseCodeAndStatus(
          `Status code: ${responseCode} ${responseStatusText}`
        )
      );

      const result = await response.json();
      dispatch(
        responseSectionActions.setResponseSectionCode(
          JSON.stringify(result, null, 2)
        )
      );
    } catch (error) {
      dispatch(
        responseSectionActions.setResponseSectionCode(
          'There is no connection to the request server. Check the url API'
        )
      );
      dispatch(responseSectionActions.setResponseCodeAndStatus(``));
    } finally {
      dispatch(loadingResponseActions.setLoading(false));
    }

    const dataArray = { client: 'GraphiQL', url: graphiqlUrlQuery };

    setLocalStorage('LS_HISTORY', dataArray);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUrlApi(event.target.value);
  };

  const handleApplyButton = (urlApi: string): void => {
    setIsApply(!isApply);
    toggleisShowUrlApiApplyBtn(true);

    if (!isApply) {
      try {
        const currentUrl = new URL(window.location.href);
        const encodedData = btoa(urlApi);
        router.replace(`${currentUrl}/${encodedData}`);
        dispatch(
          graphiqlUrlQueryActions.setGraphiqlUrlQuery(
            `${currentUrl}/${encodedData}`
          )
        );
      } catch (error) {
        dispatch(
          grahpiqlErrorMessageActions.setError('Invalid characters in url')
        );
      }
    }

    if (!isApply && !isApplyDocs) {
      setUrlDocs(`${urlApi}/?sdl`);
    }

    if (isApply) {
      const currentUrl = window.location.pathname;
      const segments = currentUrl.split('/');
      router.push(`/${segments[1]}/graphiql/`);
      setTimeout(() => {
        toggleisShowUrlApiApplyBtn(false);
        dispatch(querySectionActions.setQuerySectionCode(''));
        dispatch(responseSectionActions.setResponseSectionCode(''));
        dispatch(variablesSectionActions.setVariablesSectionCode(''));
        dispatch(headersSectionActions.setHeadersSectionCode(''));
      }, 100);
    }
  };

  const handleInputChangeDocs = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUrlDocs(event.target.value);
  };

  const handleApplyDocsButton = async (urlDocs: string): Promise<void> => {
    setIsApplyDocs(!isApplyDocs);

    if (!isApplyDocs) {
      fetchGraphiqlSchema(urlDocs, dispatch, toggleIsShowBtnDocs);
    }

    if (isApplyDocs) {
      toggleIsShowBtnDocs(false);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      width: '380px',
      height: '35px',
      color: '#FFFFFF',
      borderRadius: '5px 0px 0px 5px',
      '& .MuiInputLabel-root': {
        top: '-5px',
      },
      '& fieldset': {
        borderColor: '#646464',
      },
      '&:hover fieldset': {
        borderColor: '#646464',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#646464',
        border: '1px solid #646464',
      },
      '&.Mui-disabled fieldset': {
        borderColor: '#0078d4',
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#0078d4',
    },
    '& .MuiInputLabel-root': {
      top: '-4px',
      color: '#646464',
      '&.Mui-focused': {
        color: '#646464',
      },
      '&.Mui-disabled': {
        color: '#0078d4',
      },
      '&.Mui-shrink': {
        color: '#0078d4',
      },
    },
    '& .MuiInputLabel-shrink': {
      top: '-0px',
      color: '#646464',
    },
  };

  const buttonStyles = {
    color: '#FFFFFF',
    '&.Mui-disabled': {
      background: '#646464',
      color: '#FFFFFF',
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        borderBottom: '1px solid #646464',
        padding: '0 10px',
        borderRadius: '7px 7px 0 0',
        justifyContent: 'space-between',
        background: '#282c34',
      }}
      data-testid="mainControls"
    >
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          height: '35px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <TextField
            variant="outlined"
            disabled={isApply}
            value={urlApi}
            onChange={handleInputChange}
            label={t('urlApi')}
            size="small"
            sx={textFieldStyles}
          />
          <Button
            disabled={urlApi === ''}
            onClick={() => handleApplyButton(urlApi)}
            sx={{
              ...buttonStyles,
              background: isApply ? '#0078d4' : '#646464',
              borderRadius: '0px 5px 5px 0px',
            }}
          >
            {isApply ? <ImCheckmark /> : <span>{t('apply')}</span>}
          </Button>
        </Box>
        <Button
          disabled={!isApply}
          onClick={makeRequest}
          sx={{
            ...buttonStyles,
            background: isApply ? '#0078d4' : '#646464',
          }}
        >
          <Image
            src="/img/execute-button.svg"
            width={23}
            height={23}
            alt="logo"
          />
        </Button>
        <Button
          onClick={toggleIsShowVariablesAndHeaders}
          sx={{
            ...buttonStyles,
            background: isShowVariablesAndHeaders ? '#0078d4' : '#646464',
            fontSize: '20px',
          }}
        >
          {isShowVariablesAndHeaders ? (
            <FaArrowsDownToLine />
          ) : (
            <FaArrowsUpToLine />
          )}
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          height: '40px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '35px',
          }}
        >
          <TextField
            variant="outlined"
            disabled={isApplyDocs}
            value={urlDocs}
            onChange={handleInputChangeDocs}
            label={t('urlDocs')}
            sx={textFieldStyles}
            size="small"
          />
          <Button
            disabled={urlDocs === ''}
            onClick={() => handleApplyDocsButton(urlDocs)}
            sx={{
              ...buttonStyles,
              borderRadius: '0px 5px 5px 0px',
              background: isApplyDocs ? '#0078d4' : '#646464',
            }}
          >
            {isApplyDocs ? <ImCheckmark /> : <span>{t('apply')}</span>}
          </Button>
        </Box>
        {isLoadingDocs ? (
          <Box sx={{ color: '#FFFFFF' }}>{t('loading')}</Box>
        ) : (
          isShowBtnDocs && (
            <Box>
              <Button
                onClick={toggleIsShowDocs}
                sx={{
                  ...buttonStyles,
                  background: isShowDocs ? '#0078d4' : '#646464',
                }}
              >
                {t('docs')}
              </Button>
            </Box>
          )
        )}
        {isShowBtnDocs === null && (
          <Box sx={{ color: 'red' }}>
            <span>{t('noDocs')}</span>
          </Box>
        )}
      </Box>
    </Box>
  );
}
