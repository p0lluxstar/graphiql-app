import styles from '../../styles/components/graphiql/graphiqlLayout.module.css';
import { Panel, PanelGroup } from 'react-resizable-panels';
import GraphiqlLayoutHandel from './GraphiqlLayoutHandel';
import { useTranslations } from 'next-intl';
import QuerySection from './QuerySection';
import ResponseSection from './ResponseSection';
import MainControls from './MainControls';
import VariablesAndHeadersSection from './VariablesAndHeadersSection';

const GraphiqlLayout = (): JSX.Element => {
  const t = useTranslations();
  const closingButtonHeaders = false;
  return (
    <>
      <h1>{t('graphiql')}</h1>
      <div className={styles.wrapper}>
        <span>SchemaPage</span>
        <div className={styles.closingButton}></div>
        <div className={styles.Container}>
          <MainControls />
          <div className={styles.TopRow}></div>
          <div className={styles.BottomRow}>
            <PanelGroup autoSaveId="example" direction="horizontal">
              <Panel defaultSize={50} minSize={30}>
                <PanelGroup autoSaveId="example" direction="vertical">
                  <Panel
                    className={styles.Panel}
                    order={1}
                    minSize={20}
                    defaultSize={70}
                  >
                    <div className={`${styles.PanelContent}`}>
                      <QuerySection />
                    </div>
                  </Panel>
                  {!closingButtonHeaders && (
                    <>
                      <GraphiqlLayoutHandel />
                      <Panel
                        className={`${styles.Panel}`}
                        order={2}
                        defaultSize={30}
                        minSize={0}
                      >
                        <div className={`${styles.PanelContent}`}>
                          <VariablesAndHeadersSection />
                        </div>
                      </Panel>
                    </>
                  )}
                </PanelGroup>
              </Panel>
              <GraphiqlLayoutHandel />
              <Panel
                className={`${styles.Panel} ${styles[`br-3`]}`}
                defaultSize={50}
                minSize={30}
              >
                <div className={`${styles.PanelContent}`}>
                  <ResponseSection />
                </div>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphiqlLayout;
