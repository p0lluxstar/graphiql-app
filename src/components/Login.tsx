import styles from '../styles/components/login.module.css';

export default function Login(): JSX.Element {
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form className={styles.form}>
        <input id="name" placeholder="Name" type="text" />
        <input placeholder="Password" type="password" />
        <button>Login</button>
      </form>
    </div>
  );
}
