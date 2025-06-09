'use client'

import { useEffect, useState } from 'react';
import styles from './Footer.module.css'

function Footer() {
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        // This code only runs on the client after hydration
        const updateTime = () => {
            setCurrentTime(new Date().toLocaleTimeString().toLocaleUpperCase());
        };

        // Set initial time immediately
        updateTime();

        // Set up interval for subsequent updates
        const interval = setInterval(updateTime, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <p className={styles.footerMSg2}>© 2025 GBeeX. All Rights Reserved.</p>
                <p className={styles.footerMSg3}>{currentTime}</p>
            </div>
        </footer>
    )
}

export default Footer;