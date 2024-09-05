import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/components/graphiql/mainControls.module.css';
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
  const [isApply, setIsApply] = useState(false);

  const {
    toggleIsShowVariablesAndHeaders,
    toggleIsShowDocs,
    toggleIsShowBtnDocs,
    isShowVariablesAndHeaders,
    isShowDocs,
    isShowBtnDocs,
  } = useVisibility();

  useEffect(() => {
    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);
    const queryParam = parsedUrl.searchParams.get('query');
    const variablesParam = parsedUrl.searchParams.get('variables');
    const headersParam = parsedUrl.searchParams.get('headers');

    const decodedQueryParam = atob(queryParam || '');
    const decodedVariablesParam = atob(variablesParam || '');
    const decodedHeadersParam = atob(headersParam || '');
    dispatch(querySectionActions.setQuerySectionCode(decodedQueryParam));
    dispatch(
      variablesSectionActions.setVariablesSectionCode(decodedVariablesParam)
    );
    dispatch(headersSectionActions.setHeadersSectionCode(decodedHeadersParam));
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

    try {
      const response = await fetch(`${urlApi}`, {
        method: 'POST',
        headers: headersJSON,
        body: JSON.stringify({
          query: querySectionCode,
          variables: variablesSectionCodeParse,
        }),
      });

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

  const handleApplyButton = async (): Promise<void> => {
    setIsApply(!isApply);

    if (!isApply) {
      fetchGraphiqlSchema(urlApi, dispatch, toggleIsShowBtnDocs);
    }

    if (isApply) {
      setUrlApi('');
      router.replace(`?query=`);
      toggleIsShowBtnDocs(false);
      dispatch(querySectionActions.setQuerySectionCode(''));
      dispatch(responseSectionActions.setResponseSectionCode(''));
      dispatch(variablesSectionActions.setVariablesSectionCode(''));
      dispatch(headersSectionActions.setHeadersSectionCode(''));
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
            className={`${styles.mainControlsBtn} ${isApply ? '' : styles.noActiveBtn}`}
            onClick={handleApplyButton}
          >
            Apply
          </button>
        </div>

        <button className={styles.mainControlsBtn} onClick={makeRequest}>
          <Image
            src="/img/execute-button.svg"
            width={23}
            height={23}
            alt="logo"
          />
        </button>
        <button
          className={`${styles.mainControlsBtn} ${!isShowVariablesAndHeaders ? styles.noActiveBtn : ''}`}
          onClick={toggleIsShowVariablesAndHeaders}
        >
          {isShowVariablesAndHeaders ? <span>↓↓↓</span> : <span>↑↑↑</span>}
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
    </div>
  );
}
