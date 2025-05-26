import styles from './Header.module.css'

export default function Header() {
    return(
        <header className={styles.header}>
            <h1 className={styles.title}>Next JS</h1>
            <nav className={styles.nav}>
                {/* Navigation Links */}
            </nav>
        </header>
    )
}