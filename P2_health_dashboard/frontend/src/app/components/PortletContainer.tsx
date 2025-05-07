"use client";

import { useState } from "react";
import Portlet from "./Portlet";
import styles from "./PortletContainer.module.css";

type PortletData = {
  id: string;
  title: string;
};

export default function PortletContainer() {
  const [portlets, setPortlets] = useState<PortletData[]>([]);

  const addPortlet = () => {
    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newPortlet: PortletData = {
      id: newId,
      title: `Portlet ${portlets.length + 1}`,
    };
    setPortlets([...portlets, newPortlet]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Portlet Area</h2>
      <button className={styles.button} onClick={addPortlet}>
        Add Portlet
      </button>
      <div className={styles.portletArea}>
        {portlets.map((portlet) => (
          <Portlet key={portlet.id} title={portlet.title} content={""} />
        ))}
      </div>
    </div>
  );
}
