import styles from './page.module.css'

export default function HomePage() {
    // throw new Error('Test error for error.tsx')
    return(
        <section className={styles.homepage}>
            <h1 className={styles.homepage_title}>Welcome to Next.js Tutorial</h1>
        </section>
    )
}