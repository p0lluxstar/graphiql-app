import styles from '../../styles/components/graphiql/graphiqlLayout.module.css';
import { Panel, PanelGroup } from 'react-resizable-panels';
import GraphiqlHandel from './GraphiqlHandel';
import { useTranslations } from 'next-intl';
import QuerySection from './QuerySection';
import ResponseSection from './ResponseSection';
import MainControls from './MainControls';
import DocsSection from './DocsSection';
import VariablesAndHeadersSection from './VariablesAndHeadersSection';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const GraphiqlLayout = (): JSX.Element => {
  const t = useTranslations();
  const closingButtonHeaders = false;

  const isDocsSectionVisible = useSelector(
    (state: RootState) => state.docsSectionReducer.isDocsSectionVisible
  );
  return (
    <div className={styles.graphiqlLayout}>
      <h1>{t('graphiql')}</h1>
      <MainControls />
      <div className={styles.wrapper}>
        <PanelGroup autoSaveId="example" direction="horizontal">
          {/* Левая часть с двумя блоками */}
          <Panel className={styles.leftPanel} defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel
                className={styles.topLeftPanel}
                defaultSize={50}
                minSize={20}
              >
                <QuerySection />
              </Panel>
              {!closingButtonHeaders && (
                <>
                  <GraphiqlHandel />
                  <Panel
                    className={`${styles.bottomLeftPanel}`}
                    defaultSize={30}
                    minSize={30}
                  >
                    <VariablesAndHeadersSection />
                  </Panel>
                </>
              )}
            </PanelGroup>
          </Panel>
          {/* Правая часть с одним блоком */}
          <GraphiqlHandel />
          <Panel className={styles.rightPanel} defaultSize={50} minSize={30}>
            <ResponseSection />
          </Panel>
          {isDocsSectionVisible && (
            <>
              <GraphiqlHandel />
              <Panel className={styles.leftPanel} defaultSize={10} minSize={5}>
                <DocsSection />
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
    </div>
  );
};

export default GraphiqlLayout;
