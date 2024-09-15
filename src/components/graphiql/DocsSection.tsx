import styles from '../../styles/components/graphiql/docsSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useTranslations } from 'next-intl';

export default function DocsSection(): JSX.Element {
  const t = useTranslations();

  const docsSectionData = useSelector(
    (state: RootState) => state.docsSectionReducer.docsSectionData
  );

  return (
    <div className={styles.docsSectionWrapper} data-testid="docsSectionWrapper">
      <h2 className={styles.title}>{t('docs')}</h2>
      <div className={styles.docsSectionData}>
        <pre>{docsSectionData}</pre>
      </div>
    </div>
  );
}
