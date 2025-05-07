import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PortletContainer from '../components/PortletContainer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <h1>Welcome to the Dashboard</h1>
          <PortletContainer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
