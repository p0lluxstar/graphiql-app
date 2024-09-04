import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/components/graphiql/mainControls.module.css';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { responseSectionActions } from '@/redux/slices/graphiqlResponseSectionSlice';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import { useEffect, useState } from 'react';
import { useVisibility } from '@/context/VisibilityContext';

export default function MainControls(): JSX.Element {
  const dispatch = useDispatch();
  const querySectionCode = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  const variablesSectionCode = useSelector(
    (state: RootState) => state.variablesSectionReducer.variablesSectionCode
  );

  const [urlApi, setUrlApi] = useState('');

  useEffect(() => {
    const temp = async (): Promise<void> => {
      const currentUrl = window.location.href;
      const parsedUrl = new URL(currentUrl);
      const queryParam = parsedUrl.searchParams.get('query');

      if (queryParam === null) {
        return;
      }

      let variablesSectionCodeParse = '';
      if (variablesSectionCode === '') {
        variablesSectionCodeParse = JSON.parse('{}');
      } else {
        variablesSectionCodeParse = JSON.parse(variablesSectionCode);
      }

      try {
        const response = await fetch(`${urlApi}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: querySectionCode,
            variables: variablesSectionCodeParse,
          }),
        });

        const result = await response.json();
        dispatch(
          responseSectionActions.setResponseSectionCode(
            JSON.stringify(result, null, 2)
          )
        );
      } catch (error) {
        dispatch(responseSectionActions.setResponseSectionCode('error'));
      } finally {
        const decodedData = atob(queryParam);
        dispatch(querySectionActions.setQuerySectionCode(decodedData));
      }
    };
    temp();
  }, []);

  const makeRequest = async (): Promise<void> => {
    let variablesSectionCodeParse = '';
    if (variablesSectionCode === '') {
      variablesSectionCodeParse = JSON.parse('{}');
    } else {
      variablesSectionCodeParse = JSON.parse(variablesSectionCode);
    }

    try {
      const response = await fetch(`${urlApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: querySectionCode,
          variables: variablesSectionCodeParse,
        }),
      });

      const result = await response.json();
      dispatch(
        responseSectionActions.setResponseSectionCode(
          JSON.stringify(result, null, 2)
        )
      );
    } catch (error) {
      dispatch(responseSectionActions.setResponseSectionCode('error'));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUrlApi(event.target.value);
  };

  /*   const handleButtonDocs = async (): Promise<void> => {
    const introspectionQuery = `fragment FullType on __Type {
  kind
  name
  fields(includeDeprecated: true) {
    name
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}
fragment InputValue on __InputValue {
  name
  type {
    ...TypeRef
  }
  defaultValue
}
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      locations
      args {
        ...InputValue
      }
    }
  }
}`;

    dispatch(docsSectionActions.toggleDocsSectionVisibility(true));

    try {
      const response = await fetch(`${urlApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: introspectionQuery }),
      });

      const result = await response.json();
      dispatch(
        docsSectionActions.setDocsSectionCode(JSON.stringify(result, null, 2))
      );
    } catch (error) {
      dispatch(docsSectionActions.setDocsSectionCode('error'));
    }
  }; */

  const { toggleIsShowVariablesAndHeaders, toggleIsShowDocs, isShowDocs } =
    useVisibility();

  return (
    <div className={styles.mainControls}>
      <div className={styles.apiRequestControls}>
        <input
          type="text"
          value={urlApi}
          onChange={handleInputChange}
          placeholder={'Url API'}
          className={styles.inputUrlApi}
        />
        <button className={styles.executeButton} onClick={makeRequest}>
          <Image
            src="/img/execute-button.svg"
            width={23}
            height={23}
            alt="logo"
          />
        </button>
        <button onClick={toggleIsShowVariablesAndHeaders}>
          <span>H</span>
        </button>
      </div>
      <button
        className={`${styles.executeButton} ${isShowDocs ? '' : styles.active}`}
        onClick={toggleIsShowDocs}
      >
        Docs
      </button>
      {/* <button className={styles.closingButton} onClick={closingButtonH}>
        <span>H</span>
      </button>
      <button className={styles.closingButton} onClick={closingButtonV}>
        <span>V</span>
      </button> */}
    </div>
  );
}
