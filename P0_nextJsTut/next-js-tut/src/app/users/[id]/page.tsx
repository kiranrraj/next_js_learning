import { getUserById } from "@/_data/userData";
import styles from './users.module.css'

type Params = {
    params: {
        id: string
    }
}

export default function UserProfile({params}: Params){
    const user = getUserById(params.id)

    if(!user) {
        return <h2 className={styles.userNotFound}>User Not Found!!</h2>
    }

    return (
        <section className={styles.userContainer}>
            <h1 className={styles.userName}>Welcome, {user.name}</h1>
        </section>
    )
}