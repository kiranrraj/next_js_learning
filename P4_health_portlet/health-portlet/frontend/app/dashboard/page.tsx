'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import PortletDisplay from '../components/PortletDisplay';
import styles from './page.module.css';
import { ALL_PORTLETS, PortletType } from '../lib/portlets';

export default function DashboardPage() {
  const [username] = useState('admin');
  const [role] = useState('admin');
  const [activePortlets, setActivePortlets] = useState<PortletType[]>([]);

  const handleAddPortlet = (portlet: PortletType) => {
    if (!activePortlets.includes(portlet)) {
      setActivePortlets([...activePortlets, portlet]);
    }
  };

  const handleRemovePortlet = (portlet: PortletType) => {
    setActivePortlets(activePortlets.filter(p => p !== portlet));
  };

  return (
    <div className={styles.dashboard}>
      <Header username={username} />
      <div className={styles.main}>
        <Sidebar
          availablePortlets={ALL_PORTLETS}
          activePortlets={activePortlets}
          onAdd={handleAddPortlet}
          onRemove={handleRemovePortlet}
        />
        <div className={styles.content}>
          {activePortlets.map(portlet => (
            <PortletDisplay key={portlet} portlet={portlet} />
          ))}
        </div>
      </div>
      <Footer role={role} />
    </div>
  );
}
