import { JSX} from 'react';
import styles from './MainArea.module.css';
import TestSitePortlet from '../PortletCards/TestSitePortlet';
import TestSiteDemographyPortlet from '../PortletCards/TestSiteDemographyPortlet';
import PatientProfilePortlet from '../PortletCards/PatientProfilePortlet';
import PatientDemographyPortlet from '../PortletCards/PatientDemographyPortlet';
import TestProgressPortlet from '../PortletCards/TestProgressPortlet';

interface MainAreaProps {
  selectedPortlets: string[];
}

export default function MainArea({ selectedPortlets }: MainAreaProps) {
  const portletMap: Record<string, JSX.Element> = {
    'Test Site': <TestSitePortlet />,
    'Test Site Demography Map': <TestSiteDemographyPortlet />,
    'Patient Profile': <PatientProfilePortlet />,
    'Patient Demography Map': <PatientDemographyPortlet />,
    'Test Progress': <TestProgressPortlet />,
  };

  return (
    <main className={styles.mainArea}>
      {selectedPortlets.map((portlet) => (
        <div key={portlet} className={styles.portletCard}>
          {portletMap[portlet]}
        </div>
      ))}
    </main>
  );
}