import styles from '../../styles/components/graphiql/graphiqlLayout.module.css';
import { Panel, PanelGroup } from 'react-resizable-panels';
import GraphiqlHandel from './GraphiqlHandel';
import { useTranslations } from 'next-intl';
import QuerySection from './QuerySection';
import ResponseSection from './ResponseSection';
import MainControls from './MainControls';
import DocsSection from './DocsSection';
import VariablesAndHeadersSection from './VariablesAndHeadersSection';
import { useVisibility } from '@/context/VisibilityContext';

const GraphiqlLayout = (): JSX.Element => {
  const t = useTranslations();
  const { isShowVariablesAndHeaders, isShowDocs, isShowBtnDocs } =
    useVisibility();

  return (
    <div className={styles.graphiqlLayout} data-testid="graphiqlLayout">
      <h1 className={styles.title}>{t('graphiql')}</h1>
      <MainControls />
      <div className={styles.wrapper}>
        <PanelGroup autoSaveId="example" direction="horizontal">
          <Panel className={styles.leftPanel} defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel
                className={styles.topLeftPanel}
                defaultSize={50}
                minSize={20}
              >
                <QuerySection />
              </Panel>
              {isShowVariablesAndHeaders && (
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
          <GraphiqlHandel />
          <Panel className={styles.rightPanel} defaultSize={50} minSize={30}>
            <ResponseSection />
          </Panel>
          {isShowDocs && isShowBtnDocs && (
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
