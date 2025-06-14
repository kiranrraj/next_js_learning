import React, { useEffect, useRef, useState } from "react"
import styles from './DropDownMenu.module.css'

const DropDownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false)
        }
    }

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div className={styles.dropdownContainer} onMouseLeave={handleMouseLeave}>
            <div className={styles.dropdownmenu} ref={dropdownRef}>
                <div onClick={toggleDropDown} className={styles.dropdownBtn} onMouseEnter={handleMouseEnter}>
                    Settings
                </div>
                {isOpen && (<div className={styles.dropdownItems}>
                    <div className={styles.dropdownItem}>Account Settings</div>
                    <div className={styles.dropdownItem}>Toggle Theme</div>
                    <div className={styles.dropdownDivider}></div>
                    <div className={styles.dropdownItem}>Logout</div>
                </div>)}
            </div>
        </div>
    )
}

export default DropDownMenu;