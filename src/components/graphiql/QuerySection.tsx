import styles from '../../styles/components/graphiql/querySection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { RootState } from '@/redux/store';

export default function QuerySection(): JSX.Element {
  const dispatch = useDispatch();
  /*   const myElementRef = useRef<HTMLInputElement>(null);

  const [queryCode, setQueryCode] = useState(' '); */
  const query = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  /*   function handleCodeChange(): void {
    dispatch(
      querySectionActions.setQuerySectionCode(
        myElementRef.current.innerText.replace(/\s/g, '')
      )
    );

    setQueryCode(myElementRef.current.innerText);
  } */

  const tmp = (value: string): void => {
    dispatch(querySectionActions.setQuerySectionCode(value));
  };

  return (
    <div className={styles.querySectionWrapper}>
      <h2 className={styles.title}>Query</h2>
      <CodeMirror
        extensions={[javascript()]}
        theme={oneDark}
        height="100%"
        onChange={(value) => tmp(value)}
        className={styles.querySectionCode}
        value={query}
      />
    </div>
  );
}
