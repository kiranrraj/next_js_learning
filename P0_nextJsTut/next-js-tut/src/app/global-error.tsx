'use client'

import { useEffect } from "react"
import styles from './global-error.module.css'

export default function GlobalError(
    { error, reset }: { error: Error, reset: () => void }
) {
    useEffect(() => {
        console.log('Global error caught: ', error)
    }, [error])

    return (
        <html>
            <body className={styles.container}>
                <h1 className={styles.heading}>Oops, something went really wrong globally!</h1>
                <p className={styles.para}>{error.message}</p>
                <button onClick={reset} className={styles.button}>Try Again</button>
            </body>
        </html>
    )
}