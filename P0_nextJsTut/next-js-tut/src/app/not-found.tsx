import styles from './not-found.module.css'

import Link from 'next/link'

export default function PageNotFound() {
    return(
        <div className={styles.container}>
            <h1 className={styles.head}>404 - Page Not Found</h1>
            <p className={styles.para}>The page you are looking for does not exist.</p>
            <Link href="/" className={styles.link}>Home</Link>
        </div>
    )
}