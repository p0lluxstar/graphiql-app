import styles from '../styles/components/logout.module.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import useAuth from '../hooks/useAuth';
import { useTranslations } from 'next-intl';

export default function Logout(): JSX.Element {
  const t = useTranslations();
  const { user } = useAuth();
  const handleClick = (): void => {
    signOut(auth)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('User signed out.');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error signing out:', error);
      });
  };
  return (
    <>
      {user && (
        <>
          <span className={styles.userEmail}>{user.email}</span>
          <button className={styles.btnLogout} onClick={handleClick}>
            {t('logout')}
          </button>
        </>
      )}
    </>
  );
}
