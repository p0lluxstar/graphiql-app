import styles from '../../styles/components/graphiql/responseSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';

export default function ResponseSection(): JSX.Element {
  const responseSectionCode = useSelector(
    (state: RootState) => state.responseSectionReducer.responseSectionCode
  );

  if (responseSectionCode.length === 0) {
    return (
      <div className={styles.responseSectionWrapper}>
        <h2 className={styles.title}>Response</h2>
      </div>
    );
  }

  return (
    <div className={styles.responseSectionWrapper}>
      <h2 className={styles.title}>Response</h2>
      <CodeMirror
        value={responseSectionCode}
        extensions={[
          json(),
          EditorView.theme({
            '&.cm-editor .cm-gutters': { display: 'none' },
          }),
        ]}
        theme={oneDark}
        height="100%"
        className={styles.responseSectionCode}
        readOnly={true}
      />
    </div>
  );
}
