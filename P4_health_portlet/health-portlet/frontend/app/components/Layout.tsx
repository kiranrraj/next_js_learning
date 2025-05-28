import Header from './Header';
import Sidebar from './Sidebar';
import MainArea from '../components/MainArea';
import Footer from './Footer';
import { PortletType } from '../lib/portlets';
import styles from './Layout.module.css';

type LayoutProps = {
  activePortlets: PortletType[];
  availablePortlets: PortletType[];
  onAdd: (portlet: PortletType) => void;
  onRemove: (portlet: PortletType) => void;
};

const Layout = ({
  activePortlets,
  availablePortlets,
  onAdd,
  onRemove,
}: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Sidebar
          activePortlets={activePortlets}
          availablePortlets={availablePortlets}
          onAdd={onAdd}
          onRemove={onRemove}
        />
        <MainArea activePortlets={activePortlets} />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
