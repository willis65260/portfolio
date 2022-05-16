import React from "react";
import ProjectPython from "./ProjectPython";

const Java = (props) => {
  const { display } = props;
  return (
    <div className="projects-container">
      <div className="project">
        
        <h6 className="project-item-p">
          Click on the 'GitHub' to see the source code and to download the windows build (only available on some projects)
        </h6>
      </div>
      {display.map((elem) => {
        return (
          <ProjectPython
            nombre={elem.nombre}
            desc={elem.desc}
            github={elem.github}
            key={elem.key}
          />
        );
      })}
    </div>
  );
};

export default Java;
