import styles from '../../styles/components/graphiql/mainControls.module.css';
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

export default function MainControls(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const querySectionCode = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  const variablesSectionCode = useSelector(
    (state: RootState) => state.variablesSectionReducer.variablesSectionCode
  );

  const headersSectionCode = useSelector(
    (state: RootState) => state.headersSectionReducer.headersSectionCode
  );

  const [urlApi, setUrlApi] = useState('');
  const [urlDocs, setUrlDocs] = useState('');
  const [isApply, setIsApply] = useState(false);
  const [isApplyDocs, setIsApplyDocs] = useState(false);

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

      setUrlApi(decodedUrlApiParam);
      setUrlDocs(`${decodedUrlApiParam}/?sdl`);
      dispatch(querySectionActions.setQuerySectionCode(querySectionCode));
      dispatch(
        variablesSectionActions.setVariablesSectionCode(variblesSectionCode)
      );
      dispatch(headersSectionActions.setHeadersSectionCode(paramsStr));
    }
  }, []);

  const makeRequest = async (): Promise<void> => {
    let headersJSON = {};
    /* 
    const currentUrl = new URL(window.location.href);
    router.replace(`${currentUrl}/${encodedData}`); */

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
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUrlApi(event.target.value);
  };

  const handleApplyButton = (urlApi: string): void => {
    setIsApply(!isApply);
    toggleisShowUrlApiApplyBtn();

    if (!isApply) {
      const currentUrl = new URL(window.location.href);
      const encodedData = btoa(urlApi);
      router.replace(`${currentUrl}/${encodedData}`);
    }

    if (!isApply && !isApplyDocs) {
      setUrlDocs(`${urlApi}/?sdl`);
    }

    if (isApply) {
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

  return (
    <div className={styles.mainControls}>
      <div className={styles.apiRequestControls}>
        <div className={styles.urlApiWrapper}>
          <input
            type="text"
            disabled={isApply}
            value={urlApi}
            onChange={handleInputChange}
            placeholder={'Url API'}
            className={`${styles.urlApiInput} ${isApply ? styles.activeInput : ''}`}
          />
          <button
            disabled={urlApi === ''}
            className={`${styles.mainControlsBtn} ${isApply ? '' : styles.noActiveBtn}`}
            onClick={() => handleApplyButton(urlApi)}
          >
            {isApply ? <ImCheckmark /> : <span>Apply</span>}
          </button>
        </div>

        <button
          className={`${styles.mainControlsBtn} ${isApply ? '' : styles.noActiveBtn}`}
          onClick={makeRequest}
          disabled={!isApply}
        >
          <Image
            src="/img/execute-button.svg"
            width={23}
            height={23}
            alt="logo"
          />
        </button>
        <button
          className={`${styles.mainControlsBtn} ${styles.toggleBtnVH} ${isShowVariablesAndHeaders ? styles.noActiveBtn : ''}`}
          onClick={toggleIsShowVariablesAndHeaders}
        >
          {isShowVariablesAndHeaders ? (
            <FaArrowsDownToLine />
          ) : (
            <FaArrowsUpToLine />
          )}
        </button>
      </div>
      <div className={styles.urlDocsWrapper}>
        <div className={styles.urlDocsInputWrapper}>
          <input
            type="text"
            disabled={isApplyDocs}
            value={urlDocs}
            onChange={handleInputChangeDocs}
            placeholder={'Url Docs'}
            className={`${styles.urlDocsInput} ${isApplyDocs ? styles.activeInput : ''}`}
          />
          <button
            disabled={urlDocs === ''}
            className={`${styles.mainControlsBtn} ${isApplyDocs ? '' : styles.noActiveBtn}`}
            onClick={() => handleApplyDocsButton(urlDocs)}
          >
            {isApplyDocs ? <ImCheckmark /> : <span>Apply</span>}
          </button>
        </div>
        {isShowBtnDocs && (
          <button
            className={`${styles.mainControlsBtn} ${isShowDocs ? '' : styles.noActiveBtn}`}
            onClick={toggleIsShowDocs}
          >
            Docs
          </button>
        )}
        {isShowBtnDocs === null && (
          <div className={styles.docsError}>
            <span>No docs</span>
          </div>
        )}
      </div>
    </div>
  );
}
