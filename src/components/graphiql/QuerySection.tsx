import styles from '../../styles/components/graphiql/querySection.module.css';

export default function QuerySection(): JSX.Element {
  const initialText = `# API - https://rickandmortyapi.graphcdn.app
# Comments should be deleted

query (
  $name: String!
){
  
  characters(filter:{
    name: $name 
  }){
    results {
      name
    }
  }
}`;

  function handleCodeChange(): void {}

  return (
    <>
      <div className={styles.querySection}>
        <div className={styles.queryCode}>
          <pre
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
