import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/components/graphiql/mainControls.module.css';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { responseSectionActions } from '@/redux/slices/graphiqlResponseSectionSlice';

export default function MainControls(): JSX.Element {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  function closingButtonH(): void {}

  function closingButtonV(): void {}

  const variables = JSON.parse('"{}"');

  const makeRequest = async (): Promise<void> => {
    try {
      const response = await fetch('https://rickandmortyapi.graphcdn.app', {
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
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className={styles.mainControls}>
      <input type="text" value="" />
      <button>V</button>
      <button className={styles.executeButton} onClick={makeRequest}>
        <Image
          src="/img/execute-button.svg"
          width={23}
          height={23}
          alt="logo"
        />
      </button>
      <button className={styles.closingButton} onClick={closingButtonH}>
        <span>H</span>
      </button>
      <button className={styles.closingButton} onClick={closingButtonV}>
        <span>V</span>
      </button>
    </div>
  );
}
