import styles from '../../styles/components/graphiql/querySection.module.css';
import { useDispatch } from 'react-redux';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import { useRef } from 'react';

export default function QuerySection(): JSX.Element {
  const dispatch = useDispatch();
  const myElementRef = useRef<HTMLInputElement>(null);

  const initialText = `query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}`;

  function handleCodeChange(): void {
    dispatch(
      querySectionActions.setQuerySectionCode(
        myElementRef.current.innerText.replace(/\s/g, '')
      )
    );
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
            {initialText}
          </pre>
        </div>
      </div>
    </>
  );
}
