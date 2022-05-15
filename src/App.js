import React, { useState } from "react";

import Home from "./components/pages/Home";

import Background from "./components/Backgrounds/Background";
import BackgroundSecond from "./components/Backgrounds/BackgroundSecond";
import BackgroundThird from "./components/Backgrounds/BackgroundThird";
import BakcgroundFourth from "./components/Backgrounds/BakcgroundFourth";
import "./estilos/estilos.css";
import Projects from "./components/pages/Projects";
import Certificates from "./components/pages/Certificates";
import Contact from "./components/pages/Contact";

function App() {
  const handler = (pagina, h, p, c, m) => {
    setActivePage(pagina);
    setHoverHome(h);
    setHoverProjects(p);
    setHoverCertificates(c);
    setHoverContact(m);
    // document.getElementById(id).classList.remove("button-home");
  };

  let constancias = (
    <>
      <iframe
        src="https://drive.google.com/file/d/14prZmb5-NnhLTqJ1iygEFYmCUe-JNqWB/preview"
        width="640"
        height="480"
        allow="autoplay"
        className="certificados"
        title="constancias"
      ></iframe>
    </>
  );

  const [activePage, setActivePage] = useState(<Home />);
  const [hoverHome, setHoverHome] = useState(false);
  const [hoverProjects, setHoverProjects] = useState(true);
  const [hoverCertificates, setHoverCertificates] = useState(true);
  const [hoverContact, setHoverContact] = useState(true);

  return (
    <div className="App">
      <nav>
        <button
          className={
            "button" + (hoverHome ? " button-home" : " button-home-no-hover")
          }
          onClick={() => {
            handler(<Home />, false, true, true, true);
          }}
        >
          Who am i?
        </button>
        <button
          className={
            "button" +
            (hoverProjects ? " button-projects" : " button-projects-no-hover")
          }
          onClick={() => {
            handler(<Projects />, true, false, true, true);
          }}
        >
          what have i done ?
        </button>
        <button
          className={
            "button" +
            (hoverCertificates
              ? " button-certificates"
              : " button-certificates-no-hover")
          }
          onClick={() => {
            handler(<Certificates certifi={constancias} />, true, true, false, true);
          }}
        >
          Certificates
        </button>
        <button
          className={
            "button" +
            (hoverContact ? " button-contact" : " button-contact-no-hover")
          }
          onClick={() => {
            handler(<Contact />, true, true, true, false);
          }}
        >
          Contact me
        </button>
      </nav>

      {activePage}
    </div>
  );
}

export default App;

// <button className="button button-projects">Projects</button>
// <button className="button button-certificates">Certificates</button>
// <button className="button button-contact">Contact me</button>
