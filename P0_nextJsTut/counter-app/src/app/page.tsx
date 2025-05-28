'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Counter() {

    const [count, setCount] = useState(0)
    const [warning, setWarning] = useEffect('')
    const MAX_VAL = 10
    const MIN_VAL = 0
    const LOCAL_KEY = 'counter_value'

    useEffect( () => {
        const saved = localStorage.getItem(LOCAL_KEY)
        if (saved != null) {
            setCount(parseInt(saved))
        }
    }, [])

    useEffect( () => {
        localStorage.setItem(LOCAL_KEY, count.toString())
    })

    function add() {
        if (count < MAX_VAL) {
            setCount(count + 1);
        }
    }

    function sub() {
        if (count > MIN_VAL) {
            setCount(count - 1);
        }
    }

    function clear() {
        setCount(0)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Counter App</h1>
            <div className={styles.displayBlock}>
                <p className={styles.para}>{count}</p>
                <div className={styles.btnGroup}>
                    <button
                        className={`${styles.btn} ${styles.btnAdd}`}
                        onClick={add}
                        disabled={count == MAX_VAL}
                    >Add</button>
                    <button
                        className={`${styles.btn} ${styles.btnSub}`}
                        onClick={sub}
                        disabled={count == MIN_VAL}
                    >Sub</button>
                    <button
                        className={`${styles.btn} ${styles.btnClear}`}
                        disabled={count == MIN_VAL}
                        onClick={clear}>Clear</button>
                </div>
            </div>
        </div>
    )
}