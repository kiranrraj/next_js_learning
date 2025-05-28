import styles from './MainArea.module.css';

const MainArea = ({ activePortlets }: { activePortlets: string[] }) => {
  return (
    <main className={styles.mainArea}>
      {activePortlets.map((portlet, index) => (
        <div key={index} className={styles.portlet}>
          <h2>{portlet}</h2>
          {/* Add portlet content dynamically here */}
        </div>
      ))}
    </main>
  );
};

export default MainArea;
