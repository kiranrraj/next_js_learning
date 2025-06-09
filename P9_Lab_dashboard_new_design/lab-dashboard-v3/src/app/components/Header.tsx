'use client'

import styles from './Header.module.css'
import Image from 'next/image';
import DropDownMenu from './DropDownMenu'

function Header () {
    return(
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeftContainer}>
                    <p className={styles.leftContainerPara}>GbeeX</p>
                </div>
                <div className={styles.headerRightContainer}>
                    {/* <Image src="/" alt='Profile Pic' className={styles.rightContainerImg}></Image> */}
                    <p className={styles.rightContainerPara}>Profile Name</p>
                    <div className="dropDownContainer">
                        <DropDownMenu/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;