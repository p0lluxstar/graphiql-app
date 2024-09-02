import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/components/graphiql/mainControls.module.css';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { responseSectionActions } from '@/redux/slices/graphiqlResponseSectionSlice';
import { useState } from 'react';

export default function MainControls(): JSX.Element {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );
  const [urlApi, setUrlApi] = useState('');

  /* function closingButtonH(): void {}

  function closingButtonV(): void {} */

  const variables = JSON.parse('"{}"');

  const makeRequest = async (): Promise<void> => {
    try {
      const response = await fetch(`${urlApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();
      dispatch(responseSectionActions.setResponseSectionCode(result));
    } catch (error) {
      dispatch(responseSectionActions.setResponseSectionCode('error'));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUrlApi(event.target.value);
  };

  return (
    <div className={styles.mainControls}>
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
      {/* <button className={styles.closingButton} onClick={closingButtonH}>
        <span>H</span>
      </button>
      <button className={styles.closingButton} onClick={closingButtonV}>
        <span>V</span>
      </button> */}
    </div>
  );
}
