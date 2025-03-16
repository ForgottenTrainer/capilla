import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import Horarios from "./components/Horarios";
import Services from "./components/Services";


export default function Home() {
  return (
    <>
      <Header />
      <Horarios />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
