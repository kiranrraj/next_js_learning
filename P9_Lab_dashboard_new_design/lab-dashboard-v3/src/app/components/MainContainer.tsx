import styles from './MainContainer.module.css'
import SideBar from './SideBar'
import ContentArea from './ContentArea'

function MainContainer() {
    return (
        <div className={styles.main}>
            <SideBar />
            <ContentArea />
        </div>
    )
}

export default MainContainer;