'use client';

import React from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import styles from '../../styles/components/graphiql/temp.module.css'; // Подключаем стили, если необходимо
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Temp(): JSX.Element {
  const responseSectionCode = useSelector(
    (state: RootState) => state.responseSectionReducer.responseSectionCode
  );

  return (
    <div className={styles.wrapper}>
      <PanelGroup direction="horizontal">
        {/* Левая часть с двумя блоками */}
        <Panel className={styles.leftPanel} defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel
              className={styles.topLeftPanel}
              defaultSize={50}
              minSize={20}
            >
              <CodeMirror
                value={responseSectionCode}
                extensions={[json()]}
                theme={oneDark}
                height="100%"
                /*  readOnly={true} */
              />
            </Panel>
            <Panel
              className={styles.bottomLeftPanel}
              defaultSize={50}
              minSize={20}
            >
              <div>Левый нижний блок</div>
            </Panel>
          </PanelGroup>
        </Panel>
        {/* Правая часть с одним блоком */}
        <Panel className={styles.rightPanel} defaultSize={50} minSize={30}>
          <CodeMirror
            value={responseSectionCode}
            extensions={[json()]}
            theme={oneDark}
            height="100%"
            /*  readOnly={true} */
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}
