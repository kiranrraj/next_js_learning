import getCurrentTime from "@/_utils/getCurrentTime";
import styles from './About.module.css'

export default function About() {
    const timeNow = getCurrentTime();

    return(
        <section className={styles.container}>
        <h1 className={styles.heading}>About Us</h1>
        <p className={styles.para}>Current Time: {timeNow}</p>
        </section>
    )
}