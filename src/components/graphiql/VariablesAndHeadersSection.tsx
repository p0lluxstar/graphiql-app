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

  const valueVariables = useSelector(
    (state: RootState) => state.variablesSectionReducer.variablesSectionCode
  );

  const valueHeaders = useSelector(
    (state: RootState) => state.headersSectionReducer.headersSectionCode
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

    //
    const encodedData = btoa(value);
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    params.set('variables', encodedData);
    router.replace(`${currentUrl.pathname}?${params.toString()}`);
  };

  const handleHeadersChange = (value: string): void => {
    dispatch(headersSectionActions.setheadersSectionCode(value));
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
          height="100%"
          onChange={(value) => handleVariablesChange(value)}
          className={styles.variablesAndHeadersCode}
        />
      )}
      {showHeaders && (
        <CodeMirror
          value={valueHeaders}
          extensions={[javascript()]}
          theme={oneDark}
          height="100%"
          onChange={(value) => handleHeadersChange(value)}
          className={styles.variablesAndHeadersCode}
        />
      )}
    </div>
  );
}
