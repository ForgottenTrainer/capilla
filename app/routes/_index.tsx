import About from "~/components/About";
import Contact from "~/components/Contact";
import { Header } from "~/components/Header";
import Horarios from "~/components/Horarios";
import Services from "~/components/Services";


export default function Index() {
  return (
    <div className="">
      <Header />
      <Horarios />
      <About />
      <Services />
      <Contact />
    </div>
  );
}


