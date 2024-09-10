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

export default function MainControls(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const [urlApi, setUrlApi] = useState('');
  const [urlDocs, setUrlDocs] = useState('');
  const [isApply, setIsApply] = useState(false);
  const [isApplyDocs, setIsApplyDocs] = useState(false);

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

    if (segments[3]) {
      setIsApply(true);

      const urlApiParam = segments[3];
      const queryParam = segments[4];
      const searchParams = new URLSearchParams(window.location.search);

      let paramsStr = '';

      if ([...searchParams.keys()].length > 0) {
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
    let headersJSON = {};

    try {
      if (headersSectionCode.length > 0) {
        const correctedString = headersSectionCode.replace(/'/g, '"');
        headersJSON = JSON.parse(correctedString);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ошибка при парсинге JSON:', error);
    }

    headersJSON['Content-Type'] = 'application/json';

    let variablesSectionCodeParse;
    if (variablesSectionCode === '') {
      variablesSectionCodeParse = JSON.parse('{}');
    } else {
      try {
        variablesSectionCodeParse = JSON.parse(variablesSectionCode);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Ошибка при парсинге JSON:', error);
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
      dispatch(responseSectionActions.setResponseSectionCode('error'));
      dispatch(responseSectionActions.setResponseCodeAndStatus(``));
    } finally {
      dispatch(loadingResponseActions.setLoading(false));
    }
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
      const currentUrl = new URL(window.location.href);
      const encodedData = btoa(urlApi);
      router.replace(`${currentUrl}/${encodedData}`);
    }

    if (!isApply && !isApplyDocs) {
      setUrlDocs(`${urlApi}/?sdl`);
    }

    if (isApply) {
      toggleisShowUrlApiApplyBtn(false);
      dispatch(querySectionActions.setQuerySectionCode(''));
      dispatch(responseSectionActions.setResponseSectionCode(''));
      dispatch(variablesSectionActions.setVariablesSectionCode(''));
      dispatch(headersSectionActions.setHeadersSectionCode(''));
      const currentUrl = window.location.pathname;
      const segments = currentUrl.split('/');
      router.push(`/${segments[1]}/graphiql/`);
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
      height: '42px',
      color: '#FFFFFF',
      borderRadius: '5px 0px 0px 5px',
      '& fieldset': {
        borderColor: '#646464',
      },
      '&:hover fieldset': {
        borderColor: '#646464',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#646464',
      },
      '&.Mui-disabled fieldset': {
        borderColor: '#0078d4',
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#0078d4',
    },
    '& .MuiInputLabel-root': {
      color: '#646464',
      '&.Mui-focused': {
        color: '#646464',
      },
      '&.Mui-disabled': {
        color: '#0078d4',
      },
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
        height: '80px',
        borderBottom: '1px solid #646464',
        backgroundColor: '#282c34',
        padding: '0 10px',
        borderRadius: '5px 5px 0 0',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
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
            label="Url API"
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
            {isApply ? <ImCheckmark /> : <span>Apply</span>}
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
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <TextField
            variant="outlined"
            disabled={isApplyDocs}
            value={urlDocs}
            onChange={handleInputChangeDocs}
            label="Url Docs"
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
            {isApplyDocs ? <ImCheckmark /> : <span>Apply</span>}
          </Button>
        </Box>
        <Box>
          {isLoadingDocs ? (
            <Box sx={{ color: '#FFFFFF' }}>Loading...</Box>
          ) : (
            isShowBtnDocs && (
              <Button
                onClick={toggleIsShowDocs}
                sx={{
                  ...buttonStyles,
                  background: isShowDocs ? '#0078d4' : '#646464',
                }}
              >
                Docs
              </Button>
            )
          )}
          {isShowBtnDocs === null && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'red',
              }}
            >
              <span>No docs</span>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
