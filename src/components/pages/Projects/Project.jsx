import React, { useState } from "react";

const Project = (props) => {
  const { nombre, desc, comp } = props;
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="project">
        <h6
          className="project-item show-project"
          onClick={() => {
            setShow(!show);
          }}
        >
          {nombre}
        </h6>
        <h6 className="project-item">{desc}</h6>
      </div>
      {show ? <div className="p5-canvas">{comp}</div> : <></>}
    </div>
  );
};

export default Project;
