import styles from '../styles/components/logout.module.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import useAuth from '../hooks/useAuth';
import { IoMdExit } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function Logout(): JSX.Element {
  const { user } = useAuth();
  const router = useRouter();
  const handleClick = (): void => {
    router.replace(`/`);
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
            <IoMdExit className={styles.icon} />
          </button>
        </>
      )}
    </>
  );
}
