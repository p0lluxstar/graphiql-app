import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import useAuth from '../hooks/useAuth';

export default function Logout(): JSX.Element {
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
          <span>{user.email}</span>
          <button onClick={handleClick}>Logout</button>
        </>
      )}
    </>
  );
}
