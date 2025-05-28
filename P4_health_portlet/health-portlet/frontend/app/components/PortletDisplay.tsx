import styles from './PortalDisplay.module.css'

type PortletDisplayProps = {
  portlet: string;
};

export default function PortletDisplay({ portlet }: PortletDisplayProps) {
  return (
    <div className={styles.portlet}>
      <h2>{portlet}</h2>
      <p>Loading data from <strong>{portlet}</strong> collection...</p>
      {/* Later: fetch and render data in table */}
    </div>
  );
}
