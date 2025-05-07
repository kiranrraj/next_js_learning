import styles from "./Portlet.module.css";

interface PortletProps {
  title: string;
  content: string;
}

const Portlet = ({ title, content }: PortletProps) => {
  return (
    <div className={styles.portlet}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Portlet;
