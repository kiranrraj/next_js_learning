'use client'

import styles from './Header.module.css'
import Image from 'next/image';
import DropDownMenu from './DropDownMenu'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeftContainer}>
                    <p className={styles.leftContainerPara}>GbeeX</p>
                </div>
                <div className={styles.headerRightContainer}>
                    <Image
                        src="/img/boy2.svg"
                        alt="Profile Avatar"
                        width={40}
                        height={40}
                        className={styles.rightContainerImg}
                    />

                    <p className={styles.rightContainerPara}>Profile Name</p>
                    <div className="dropDownContainer">
                        <DropDownMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;