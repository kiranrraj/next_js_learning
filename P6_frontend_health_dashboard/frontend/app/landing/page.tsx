'use client';

import { useState } from 'react';
import HeaderPortlet from '../components/Header/HeaderPortlet';
import SidebarPortlet from '../components/Sidebar/SidebarPortlet';
import MainArea from '../components/MainArea/MainArea';
import FooterPortlet from '../components/Footer/FooterPortlet';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const ALL_PORTLETS = [
  'Test Site',
  'Test Site Demography Map',
  'Patient Profile',
  'Patient Demography Map',
  'Test Progress',
];

const DEFAULT_PORTLETS = ['Test Site', 'Patient Profile', 'Test Progress'];

export default function LandingPage() {
  const [selectedPortlets, setSelectedPortlets] = useState<string[]>(DEFAULT_PORTLETS);
  const [hoveredPortlet, setHoveredPortlet] = useState<string | null>(null);

  const addPortlet = (name: string) => {
    if (!selectedPortlets.includes(name)) {
      setSelectedPortlets([...selectedPortlets, name]);
    }
  };

  const removePortlet = (name: string) => {
    setSelectedPortlets(selectedPortlets.filter(p => p !== name));
  };

  const availablePortlets = ALL_PORTLETS.filter(p => !selectedPortlets.includes(p));

  const portletDescriptions: Record<string, string> = {
    'Test Site': 'Displays active test sites and stats.',
    'Test Site Demography Map': 'Shows geographic distribution of test sites.',
    'Patient Profile': 'Profile details of a patient.',
    'Patient Demography Map': 'Demographic map of patients.',
    'Test Progress': 'Shows ongoing and completed test status.',
  };

  return (
    <div>
      <HeaderPortlet profileName="Dr. John" />
      <SidebarPortlet
        selectedPortlets={selectedPortlets}
        availablePortlets={availablePortlets}
        onAdd={addPortlet}
        onRemove={removePortlet}
        hoveredPortletDescription={hoveredPortlet ? portletDescriptions[hoveredPortlet] : ''}
      />
      <MainArea selectedPortlets={selectedPortlets} />
      <FooterPortlet />
      <ScrollToTop />
    </div>
  );
}
