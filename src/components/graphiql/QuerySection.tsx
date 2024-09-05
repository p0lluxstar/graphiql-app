import styles from '../../styles/components/graphiql/querySection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function QuerySection(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentValue, setCurrentValue] = useState('');

  const query = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  const handleChange = (value: string): void => {
    dispatch(querySectionActions.setQuerySectionCode(value));
    setCurrentValue(value);
  };

  const handleBlur = (): void => {
    const encodedData = btoa(currentValue);
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    params.set('query', encodedData);
    router.replace(`${currentUrl.pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.querySectionWrapper}>
      <h2 className={styles.title}>Query</h2>
      <CodeMirror
        extensions={[javascript()]}
        onBlur={handleBlur}
        theme={oneDark}
        height="100%"
        onChange={(value) => handleChange(value)}
        className={styles.querySectionCode}
        value={query}
      />
    </div>
  );
}
