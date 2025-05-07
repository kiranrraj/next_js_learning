import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/auth/signin" className={styles.navLink}>Sign In</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/auth/signup" className={styles.navLink}>Sign Up</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin" className={styles.navLink}>Admin</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/doctor" className={styles.navLink}>Doctor</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/user" className={styles.navLink}>User</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
