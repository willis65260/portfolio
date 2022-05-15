import React from "react";
import Project from "./Project";

const JavaScript = (props) => {
  const { display } = props;
  return (
    <div className="projects-container">
      {display.map((elem) => {
        return (
          <Project
            nombre={elem.nombre}
            desc={elem.desc}
            comp={elem.component}
            key={elem.key}
          />
        );
      })}
    </div>
  );
};

export default JavaScript;
