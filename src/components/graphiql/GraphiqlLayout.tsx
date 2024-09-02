import styles from '../../styles/components/graphiql/graphiqlLayout.module.css';
import { Panel, PanelGroup } from 'react-resizable-panels';
import GraphiqlHandel from './GraphiqlHandel';
import { useTranslations } from 'next-intl';
import QuerySection from './QuerySection';
import ResponseSection from './ResponseSection';
import MainControls from './MainControls';
import VariablesAndHeadersSection from './VariablesAndHeadersSection';

const GraphiqlLayout = (): JSX.Element => {
  const t = useTranslations();
  const closingButtonHeaders = false;
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
        </PanelGroup>
      </div>
    </div>
  );
};

export default GraphiqlLayout;
