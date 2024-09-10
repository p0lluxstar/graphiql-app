import styles from '../../styles/components/graphiql/docsSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function DocsSection(): JSX.Element {
  const docsSectionData = useSelector(
    (state: RootState) => state.docsSectionReducer.docsSectionData
  );

  return (
    <div className={styles.docsSectionWrapper}>
      <h2 className={styles.title}>Docs</h2>
      <div className={styles.docsSectionData}>
        <pre>{docsSectionData}</pre>
      </div>
    </div>
  );
}
