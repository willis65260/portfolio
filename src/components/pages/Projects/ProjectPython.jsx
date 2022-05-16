import React, { useState } from "react";

const Project = (props) => {
  const { nombre, desc, github} = props;
  return (
    <div>
      <div className="project">
        <h6 className="project-item">
          <div className="project-item-java">
            <h4>{nombre}</h4>
            <a href={github} className="project-item show-project a-ref-color" rel="noreferrer" target="_blank">
              GitHub
            </a>
            
          </div>
        </h6>
        <h6 className="project-item">{desc}</h6>
      </div>
    </div>
  );
};

export default Project;
