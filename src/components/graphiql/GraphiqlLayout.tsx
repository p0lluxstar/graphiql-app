import styles from '../../styles/components/graphiql/graphiqlLayout.module.css';
import { Panel, PanelGroup } from 'react-resizable-panels';
import GraphiqlLayoutHandel from './GraphiqlLayoutHandel';
import { useTranslations } from 'next-intl';
import QuerySection from './QuerySection';
import MainControls from './MainControls';

const GraphiqlLayout = (): JSX.Element => {
  const t = useTranslations();
  const closingButtonHeaders = false;
  const closingButtonVariables = false;
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
                  <>
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
                        <div className={styles.titleSection}>
                          <span>headers</span>
                        </div>
                        <Panel
                          className={`${styles.Panel}`}
                          order={2}
                          defaultSize={30}
                          minSize={0}
                        >
                          <div className={`${styles.PanelContent}`}>
                            <span>HeadersEditor</span>
                          </div>
                        </Panel>
                      </>
                    )}
                    {!closingButtonVariables && (
                      <>
                        <GraphiqlLayoutHandel />
                        <div className={styles.titleSection}>
                          <span>variables</span>
                        </div>
                        <Panel
                          className={`${styles.Panel} ${styles[`br-4`]}`}
                          order={2}
                          defaultSize={30}
                          minSize={0}
                        >
                          <div className={`${styles.PanelContent}`}>
                            <span>VariablesEditor</span>
                          </div>
                        </Panel>
                      </>
                    )}
                  </>
                </PanelGroup>
              </Panel>
              <GraphiqlLayoutHandel />
              <Panel
                className={`${styles.Panel} ${styles[`br-3`]}`}
                defaultSize={50}
                minSize={30}
              >
                <div className={`${styles.PanelContent}`}>
                  <span>ResponseSection</span>
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
