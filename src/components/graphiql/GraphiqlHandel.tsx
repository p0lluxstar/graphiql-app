import { PanelResizeHandle } from 'react-resizable-panels';

import styles from '../../styles/components/graphiql/graphiqlLayout.module.css';

export default function GraphiqlHandel({
  className = '',
  id,
}: {
  className?: string;
  id?: string;
}): JSX.Element {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandleOuter, className].join(' ')}
      id={id}
    >
      <div className={styles.ResizeHandleInner}></div>
    </PanelResizeHandle>
  );
}
