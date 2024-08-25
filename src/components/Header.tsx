'use client';

import Link from 'next/link';
import styles from '../styles/components/header.module.css';
import { usePathname } from 'next/navigation';

export default function Header(): JSX.Element {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <ul className={styles.headerMenu}>
        <li>
          <Link
            href="/"
            className={`${styles.headerMenuItem} ${pathname === '/' ? styles.active : ''}`}
          >
            Main
          </Link>
        </li>
        <li>
          <Link
            href="/restfull"
            className={`${styles.headerMenuItem} ${pathname === '/restfull' ? styles.active : ''}`}
          >
            RESTfull
          </Link>
        </li>
        <li>
          <Link
            href="/graphiql"
            className={`${styles.headerMenuItem} ${pathname === '/graphiql' ? styles.active : ''}`}
          >
            GraphiQL
          </Link>
        </li>
      </ul>
    </header>
  );
}
