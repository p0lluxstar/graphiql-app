import styles from '../../styles/components/graphiql/querySection.module.css';
import { useDispatch } from 'react-redux';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import { useRef, useState } from 'react';

export default function QuerySection(): JSX.Element {
  const dispatch = useDispatch();
  const myElementRef = useRef<HTMLInputElement>(null);

  const [queryCode, setQueryCode] = useState(' ');

  function handleCodeChange(): void {
    dispatch(
      querySectionActions.setQuerySectionCode(
        myElementRef.current.innerText.replace(/\s/g, '')
      )
    );

    setQueryCode(myElementRef.current.innerText);
  }

  return (
    <>
      <div className={styles.querySection}>
        <div className={styles.queryCode}>
          <pre
            ref={myElementRef}
            contentEditable="true"
            spellCheck="false"
            suppressContentEditableWarning={true}
            onInput={handleCodeChange}
            /* onKeyDown={} */
          >
            {queryCode}
          </pre>
        </div>
      </div>
    </>
  );
}
