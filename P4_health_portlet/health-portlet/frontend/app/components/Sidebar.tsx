import { PortletType } from '../lib/portlets';
import styles from './Sidebar.module.css';

type SidebarProps = {
  activePortlets: PortletType[];
  availablePortlets: PortletType[];
  onAdd: (portlet: PortletType) => void;
  onRemove: (portlet: PortletType) => void;
};

const Sidebar = ({
  activePortlets,
  availablePortlets,
  onAdd,
  onRemove,
}: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3>Currently Selected Portlets</h3>
        <ul>
          {activePortlets.map((portlet) => (
            <li key={portlet}>
              {portlet}
              <button onClick={() => onRemove(portlet)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3>Available Portlets</h3>
        <ul>
          {availablePortlets.map((portlet) => (
            <li key={portlet}>
              {portlet}
              <button onClick={() => onAdd(portlet)}>Add</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <p>Hover over a portlet to view its details.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
