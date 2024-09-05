import styles from '../../styles/components/graphiql/docsSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CodeMirror, { EditorView, oneDark } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export default function DocsSection(): JSX.Element {
  const docsSectionData = useSelector(
    (state: RootState) => state.docsSectionReducer.docsSectionData
  );

  return (
    <div className={styles.docsSectionWrapper}>
      <h2 className={styles.title}>Docs</h2>
      <CodeMirror
        value={docsSectionData}
        extensions={[
          json(),
          EditorView.theme({
            '&.cm-editor .cm-gutters': { display: 'none' },
          }),
        ]}
        theme={oneDark}
        height="100%"
        className={styles.docsSectionData}
        readOnly={true}
      />
      <div></div>
    </div>
  );
}
