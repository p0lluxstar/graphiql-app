import styles from '../../styles/components/graphiql/responseSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export default function ResponseSection(): JSX.Element {
  const responseSectionCode = useSelector(
    (state: RootState) => state.responseSectionReducer.responseSectionCode
  );

  if (responseSectionCode.length === 0) {
    return <div className={styles.responseSectionWrapper}></div>;
  }

  return (
    <div className={styles.responseSectionWrapper}>
      <CodeMirror
        value={responseSectionCode}
        extensions={[json()]}
        theme={oneDark}
        height="100%"
        className={styles.responseSectionCode}
        readOnly={true}
      />
    </div>
  );
}
