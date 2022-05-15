import React, { useState } from "react";
// import constancias from ""
const Certificates = (props) => {
  const { certifi} = props;
  const [state, setState] = useState(<h4>Cargando constancias...</h4>);
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

  console.log(certifi);

  return (
    <div className="page-certificates">
      {certifi ? certifi : "loading..."}
    </div>
  );
};

export default Certificates;
