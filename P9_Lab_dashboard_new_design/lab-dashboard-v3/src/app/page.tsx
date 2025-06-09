import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import './global.css'
import './page.module.css'

export default function Home() {
  return (
    <div className="container">
      <Header />
      <MainContainer/>
      <Footer />
    </div>
  );
}
