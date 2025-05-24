'use client';

import styles from './SidebarPortlet.module.css';

interface SidebarPortletProps {
  selectedPortlets: string[];
  availablePortlets: string[];
  onAdd: (portlet: string) => void;
  onRemove: (portlet: string) => void;
  hoveredPortletDescription: string;
}

export default function SidebarPortlet({
  selectedPortlets,
  availablePortlets,
  onAdd,
  onRemove,
  hoveredPortletDescription,
}: SidebarPortletProps) {
  return (
    <aside className={styles.sidebar}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🟢 Selected Portlets</h3>
        {selectedPortlets.length === 0 && <p className={styles.empty}>None</p>}
        {selectedPortlets.map((p) => (
          <div key={p} className={styles.portletItem}>
            <span>{p}</span>
            <button onClick={() => onRemove(p)} className={styles.removeButton}>−</button>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🔵 Available Portlets</h3>
        {availablePortlets.length === 0 && <p className={styles.empty}>None</p>}
        {availablePortlets.map((p) => (
          <div
            key={p}
            className={styles.portletItem}
            onMouseEnter={() => {
              // this will need to call a setHoveredPortlet later
              // we'll wire that in when state is managed at top level
            }}
          >
            <span>{p}</span>
            <button onClick={() => onAdd(p)} className={styles.addButton}>＋</button>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📘 Description</h3>
        <p className={styles.descriptionText}>{hoveredPortletDescription || 'Hover on a portlet to view details'}</p>
      </section>
    </aside>
  );
}
