import React from "react";
import image from "../../../../resources/images/statisticsWoL.png";
const WhisperOfLearning = () => {
  return (
    // <>
    <div className="traductor">
      <h5 className="texto">
        This is only an informative page but it had more traffic than i expected
        
      </h5>
      <img
        src={image}
        alt="statistics error"
        width={"100%"}
        style={{ marginBottom: "20px" }}
      />
      <iframe
        src="https://whisperoflearning.wordpress.com"
        title="frame2"
        className="pagina"
      ></iframe>
      <h5 className="texto">
      '
        <a
          href="https://whisperoflearning.wordpress.com"
          target="_blank"
          rel="noreferrer"
          className="texto-10 a-ref-color"
        >
          see on the browser
        </a>
        '
      </h5>
    </div>
    // </>
  );
};

export default WhisperOfLearning;
