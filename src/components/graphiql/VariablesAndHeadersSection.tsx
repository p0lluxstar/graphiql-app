import styles from '../../styles/components/graphiql/variablesAndHeadersSection.module.css';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { variablesSectionActions } from '@/redux/slices/graphiqlVariablesSectionSlice';
import { headersSectionActions } from '@/redux/slices/graphiqlHeadersSectionSlice';
import { useRouter } from 'next/navigation';

export default function VariablesAndHeadersSection(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showVariables, setShowVariables] = useState(true);
  const [showHeaders, setShowHeaders] = useState(false);
  const [currentValueHeaders, setCurrentValueHeaders] = useState('');

  const valueVariables = useSelector(
    (state: RootState) => state.variablesSectionReducer.variablesSectionCode
  );

  const valueHeaders = useSelector(
    (state: RootState) => state.headersSectionReducer.headersSectionCode
  );

  const valueQuery = useSelector(
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

  const handleBlurVariables = (): void => {
    /*  const encodedData = btoa(currentValueVariables);
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    params.set('variables', encodedData);
    router.replace(`${currentUrl.pathname}?${params.toString()}`); */
  };

  const handleBlurHeaders = (): void => {
    if (currentValueHeaders != '') {
      const jsonObject = JSON.parse(currentValueHeaders);
      const currentUrl = window.location.pathname;
      const searchParams = new URLSearchParams(jsonObject);
      const newUrl = `${currentUrl}?${searchParams.toString()}`;
      router.push(newUrl);
    }

    /*  const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    params.set('headers', 'header1=value1');
    router.replace(`${currentUrl.pathname}?${params.toString()}`); */
  };

  return (
    <div className={styles.variablesAndHeadersWrapper}>
      <div className={styles.variablesAndHeadersMenu}>
        <button
          onClick={handlerVariablesButton}
          className={`${styles.menuBtn} ${showVariables ? styles.active : ''}`}
        >
          Variables
        </button>
        <button
          onClick={handlerHeadersButton}
          className={`${styles.menuBtn} ${showHeaders ? styles.active : ''}`}
        >
          Headers
        </button>
      </div>
      {showVariables && (
        <CodeMirror
          value={valueVariables}
          extensions={[json()]}
          theme={oneDark}
          onBlur={handleBlurVariables}
          height="100%"
          onChange={(value) => handleVariablesChange(value)}
          className={styles.variablesAndHeadersCode}
          readOnly={valueQuery === ''}
        />
      )}
      {showHeaders && (
        <CodeMirror
          value={valueHeaders}
          extensions={[javascript()]}
          theme={oneDark}
          onBlur={handleBlurHeaders}
          height="100%"
          onChange={(value) => handleHeadersChange(value)}
          className={styles.variablesAndHeadersCode}
          readOnly={valueQuery === ''}
        />
      )}
    </div>
  );
}
