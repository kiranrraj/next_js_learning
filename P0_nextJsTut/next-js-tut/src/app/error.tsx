'use client'

import { useEffect } from "react"
import styles from './error.module.css'

export default function ErrorPage({error, reset}: {error: Error, reset: () => void}) {
    useEffect (() => {
        console.error('Route Error: ', error)
    }, [error])

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Something went wrong!</h1>
            <p className={styles.para}>{error.message}</p>
            <button onClick={reset} className={styles.button}>Try again</button>
        </div>
    )
}