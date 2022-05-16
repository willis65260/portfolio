import React from "react";

const ImageClassification = () => {
  return (
    <div className="">
      <div className="traductor">
        <h5 className="texto">
          This is a simple AI made with TensorFlow & P5.js that 'recognizes' which shape you draw ( circle,
          square and triangle ) i know it has it's flaws but sometimes it works 
        </h5>
        <h6 className="texto">use the mouse to drw and press any key to erease all</h6>
        <iframe
          src="https://willis65260.github.io/ImageClassification/"
          title="frame2"
          className="p5-image-classification ov-hidden"
        //   className="projects-container"
        ></iframe>
        <h5 className="texto">
          check the source code on '
          <a
            href="https://github.com/willis65260/ImageClassification"
            target="_blank"
            rel="noreferrer noopener"
            className="a-ref-color"
          >
            GitHub
          </a>
          ' 
        </h5>
      </div>
    </div>
  );
};

export default ImageClassification;
