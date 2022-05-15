import React from "react";
import ProjectJava from "./ProjectJava";

const Java = (props) => {
  const { display } = props;
  return (
    <div className="projects-container">
      <div className="project">
        <h6 className="project-item">
          Click in the link to download the .jar file
        </h6>
        <h6 className="project-item">
          or click on the 'GitHub' to see the source code
        </h6>
      </div>
      {display.map((elem) => {
        return (
          <ProjectJava
            nombre={elem.nombre}
            desc={elem.desc}
            github={elem.github}
            jarfile={elem.jarfile}
            download={elem.download}
            key={elem.key}
          />
        );
      })}
    </div>
  );
};

export default Java;
