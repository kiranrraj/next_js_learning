import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h3>Portlets</h3>
      <ul>
        <li>Portlet 1</li>
        <li>Portlet 2</li>
        <li>Portlet 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;
