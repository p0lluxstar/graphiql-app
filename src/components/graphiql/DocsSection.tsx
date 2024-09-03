import styles from '../../styles/components/graphiql/docsSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CodeMirror, { EditorView, oneDark } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export default function DocsSection(): JSX.Element {
  const docsSectionCode = useSelector(
    (state: RootState) => state.docsSectionReducer.docsSectionCode
  );

  return (
    <div className={styles.docsSectionWrapper}>
      <h2 className={styles.title}>Docs</h2>
      <CodeMirror
        value={docsSectionCode}
        extensions={[
          json(),
          EditorView.theme({
            '&.cm-editor .cm-gutters': { display: 'none' },
          }),
        ]}
        theme={oneDark}
        height="100%"
        className={styles.docsSectionCode}
        readOnly={true}
      />
    </div>
  );
}
