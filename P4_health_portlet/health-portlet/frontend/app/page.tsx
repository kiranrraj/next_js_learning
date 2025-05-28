'use client'
import { useState } from 'react'; 
import Layout from './components/Layout';
import { availablePortlets } from './lib/portlets';
import { PortletType } from './types/PortletTypes';

const HomePage = () => {
  const [activePortlets, setActivePortlets] = useState<PortletType[]>([]);
  
  const handleAddPortlet = (portlet: PortletType) => {
    setActivePortlets((prev) => [...prev, portlet]);
  };

  const handleRemovePortlet = (portlet: PortletType) => {
    setActivePortlets((prev) => prev.filter((item) => item !== portlet));
  };

  return (
    <Layout
      activePortlets={activePortlets}
      availablePortlets={availablePortlets}
      onAdd={handleAddPortlet}
      onRemove={handleRemovePortlet}
    />
  );
};

export default HomePage;
