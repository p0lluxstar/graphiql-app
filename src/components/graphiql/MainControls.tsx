import styles from '../../styles/components/graphiql/mainControls.module.css';
import Image from 'next/image';

function closingButtonH(): void {}

function closingButtonV(): void {}

async function makeRequest(): Promise<void> {}

export default function MainControls(): JSX.Element {
  return (
    <div className={styles.mainControls}>
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
