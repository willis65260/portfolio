import React, { useState } from "react";
import Sketch from "react-p5";
import { P5 } from "../../p5js/P5";
import JavaScript from "./Projects/JavaScript";
import Java from "./Projects/Java";
import Python from "./Projects/Python";
import BubbleSort from "./Algorithms/sort/BubbleSort";
import IntermediateCode from "./Algorithms/Programming Language/FromMyLanguageToC/IntermediateCode";
import TallerArte from "./Algorithms/webPages/TallerArte";
// import Gato from "./Algorithms/games/gato/Gato";

import PaintMejorJar1 from "./Algorithms/Graficacion/ProyectoTransformaciones.jar";
import PaintMejorJar2 from "./Algorithms/Graficacion/Proyecto2.jar";
import ElReyLeon from "./Algorithms/Graficacion/Sepientes_Escaleras_ElReyLeon.jar";
import icon from "../../resources/icons/discord-120x120.png";
import WhisperOfLearning from "./Algorithms/webPages/WhisperOfLearning";
import ImageClassification from "./Algorithms/IA/ImageClassification";
{
  /* <TallerArte/> */
}

/* TO DO LIST */
// ,{
//   key: "WeirdCat",
//   nombre: "XO Cat Game",
//   desc: "'Simple' cause i made it in the hardest way i could think of (i made it to practice things like map,filter and stuff like that)",
//   component: <Gato/>,
// }
// 1. Make a cat game or change the styles on the one that you already have
// 2. Fix the Paint v1.0 Github SourceCode

/*{
  nombre: "Paint v1.0",
  desc:
    "A simple 'paint' that allows you to make changes to an image this changes are made by math in the image array",
  github: "https://github.com/willis65260/PaintMejor",
  jarfile: icon,
  download: "discord-120x120.png",
},*/

const proyectos = {
  JavaScript: [
    {
      key: "1",
      nombre: "Bubble Sort",
      desc: "Algoritmo de ordenamiento Burbuja con P5.js",
      component: <BubbleSort />,
    },
    {
      key: "2",
      nombre: "Code traductor to C",
      desc: "De un lenguaje hecho a mano a codigo objeto en C",
      component: <IntermediateCode />,
    },
    {
      key: "TallerArte",
      nombre: "Informative web page",
      desc: "Informative web page made in react to advertise departments ",
      component: <TallerArte />,
    },
    {
      key: "ImageClassification",
      nombre: "IA ImageClassification",
      desc:
        "This is a simple AI that 'recognizes' which shape you draw ( circle, square and triangle )",
      component: <ImageClassification />,
    },
  ],
  Java: [
    {
      key: "Paint1",
      nombre: "Paint v2.0",
      desc:
        "A simple 'paint' that allows you to make changes to an image this changes are made by math in the image array",
      github: "https://github.com/willis65260/PaintMejor",
      jarfile: PaintMejorJar1,
      download: "ProyectoTransformaciones.jar",
    },
    {
      key: "Paint2",
      nombre: "Paint v1.0",
      desc:
        "A simple 'paint' that allows you to make changes to an image this changes are made by the library of Java2D",
      github: "https://github.com/willis65260/PaintPrimero",
      jarfile: PaintMejorJar2,
      download: "Proyecto2.jar",
    },
    {
      key: "ReyLeon",
      nombre: "The LionKing",
      desc:
        "Just a simple leaders & Snakes game it can be palyed by 1 or 2 players in the same PC",
      github: "https://github.com/willis65260/ElReyLeon",
      jarfile: ElReyLeon,
      download: "Sepientes_Escaleras_ElReyLeon.jar",
    },
  ],
  Python: [
    {
      key: "MailToPDF",
      nombre: "Mail To PDF with Python",
      desc:
        "A program that takes your outlook emails from the desktop app and turns them into PDFs",
      github: "https://github.com/willis65260/mail-to-PDF-Python",
    },
  ],
  WordPress: [
    {
      key: "PaintWP1",
      nombre: "WhisperOfLearning",
      desc:
        "This was a very simple page that i did on highschool that contained a lot of the topics of the differents classes so you can have place where you can find the information",
      github: "https://whisperoflearning.wordpress.com",
      component: <WhisperOfLearning />,
    },
  ],
};

const Projects = () => {
  const [showJavaScript, setShowJavaScript] = useState(false);
  const [showJava, setShowJava] = useState(false);
  const [showWordpress, setShowWordpress] = useState(false);
  const [showPython, setShowPython] = useState(false);

  const [activeJS, setActiveJS] = useState(false);
  const [activeJ, setActiveJ] = useState(false);
  const [activeWP, setActiveWP] = useState(false);
  const [activeP, setActiveP] = useState(false);

  return (
    <div className="page-projects">
      
      <h4 className="texto">
        Click on one category to see my awesome projects!
      </h4>
      <p className="texto">
        I have a lot of them so i'm still adding new ones every day!
      </p>
      <div className="asd">
        <div className="drop-down-menu">
          <h1
            className={activeJS ? "drop-down-item active" : "drop-down-item"}
            onClick={() => {
              setShowJavaScript(!showJavaScript);
              setActiveJS(!activeJS);
            }}
          >
            JavaScript
          </h1>
          {showJavaScript ? (
            <JavaScript display={proyectos.JavaScript} />
          ) : (
            <></>
          )}
          <h1
            className={activeJ ? "drop-down-item active" : "drop-down-item"}
            onClick={() => {
              setShowJava(!showJava);
              setActiveJ(!activeJ);
            }}
          >
            Java
          </h1>
          {showJava ? <Java display={proyectos.Java} /> : <></>}

          {/*  */}
          <h1
            className={activeP ? "drop-down-item active" : "drop-down-item"}
            onClick={() => {
              setShowPython(!showPython);
              setActiveP(!activeP);
            }}
          >
            Python
          </h1>
          {showPython ? <Python display={proyectos.Python} /> : <></>}
{/*  */}
          <h1
            className={activeWP ? "drop-down-item active" : "drop-down-item"}
            onClick={() => {
              setShowWordpress(!showWordpress);
              setActiveWP(!activeWP);
            }}
          >
            WordPress
          </h1>
          {showWordpress ? <JavaScript display={proyectos.WordPress} /> : <></>}
          {/* <h1 className="drop-down-item">Python</h1>
          <h1 className="drop-down-item">Others</h1> */}
          {/* <Java/> */}
        </div>
        {/* <P5 /> */}
      </div>
      {/* <div className="asd"> */}
      {/* <Sketch setup={setup} draw={draw} className="asd"/> */}
      {/* <Sketch setup={setup} draw={draw} className="asd"/> */}
      {/* </div> */}
    </div>
  );
};

export default Projects;
