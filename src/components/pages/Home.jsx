import React from "react";
import img from "../../resources/foto perfil.jpg";

const Home = () => {
  return (
    <div className="page-home">
      {/* <h1>Home</h1> */}
      <div className="smaller-page-home">
        <h1 className="texto titulo">Hi i'm Jose Eduardo Poo Tapia</h1>
        <img src={img} className="imagen-perfil" alt="error on profile" />
        <h2 className="texto">
          A student of engineering of computer science focused on systems
        </h2>
        <h5 className="texto">
          Enthusiast student with knowledge in many programming languajes
          specialized in web development, i've tried my skills as leader in many
          situations and i can make decisions underpressure very well.
        </h5>
        <h5 className="texto">
          let's hop over the "what have i done" tab to see some of my projects!
        </h5>
      </div>
    </div>
  );
};

export default Home;
