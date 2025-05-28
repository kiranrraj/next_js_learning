import styles from './Footer.module.css';

const Footer = () => {
  const currentTime = new Date().toLocaleTimeString();
  const lastLogin = "2025-05-12 18:33:49";
  const role = "admin";
  const loginStatus = "Active";

  return (
    <footer className={styles.footer}>
      <span>© 2025 All Rights Reserved</span>
      <div className={styles.details}>
        <span>{currentTime}</span>
        <span>Role: {role}</span>
        <span>Last Login: {lastLogin}</span>
        <span>Status: {loginStatus}</span>
      </div>
    </footer>
  );
};

export default Footer;
