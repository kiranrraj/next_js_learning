import styles from "./page.module.css";
import Spinner from "./Spinner";

export default function Home() {
  return (
    <div className={styles.page}>
      <Spinner size={50} />
    </div>
  );
}
