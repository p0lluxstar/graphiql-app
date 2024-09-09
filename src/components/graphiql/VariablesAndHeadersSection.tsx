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
import useHandleBlur from '@/hooks/useHandleBlur';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';

export default function VariablesAndHeadersSection(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleBlur } = useHandleBlur();
  const [showVariables, setShowVariables] = useState(true);
  const [showHeaders, setShowHeaders] = useState(false);
  const [currentValueHeaders, setCurrentValueHeaders] = useState('');

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
    }
  };

  const formatJson = (text: string): string | Promise<string> => {
    try {
      return prettier.format(text, {
        parser: 'json',
        plugins: [parserBabel],
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ошибка форматирования:', error);
      return text;
    }
  };

  return (
    <div className={styles.variablesAndHeadersWrapper}>
      <div className={styles.temp}>
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
        <div>
          <button onClick={() => formatJson(variablesSectionCode)}>
            Button
          </button>
        </div>
      </div>
      {showVariables && (
        <CodeMirror
          value={variablesSectionCode}
          extensions={[json()]}
          theme={oneDark}
          onBlur={handleBlur}
          height="100%"
          onChange={(value) => handleVariablesChange(value)}
          className={styles.variablesAndHeadersCode}
          readOnly={querySectionCode === ''}
        />
      )}
      {showHeaders && (
        <CodeMirror
          value={headersSectionCode}
          extensions={[javascript()]}
          theme={oneDark}
          onBlur={handleBlurHeaders}
          height="100%"
          onChange={(value) => handleHeadersChange(value)}
          className={styles.variablesAndHeadersCode}
          readOnly={querySectionCode === ''}
        />
      )}
    </div>
  );
}
