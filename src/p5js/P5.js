import React from "react";
import Sketch from "react-p5";

export const P5 = () => {
  var xoff = 0;
  let setup = (p5, createCanvas) => {
    let xyz = p5.createCanvas(400, 400).parent(createCanvas);
  };

  let draw = (p5) => {
    p5.background(220);
    var x = p5.map(p5.noise(xoff), 0, 1, 0, 400);
    p5.ellipse(x, 200, 24, 24);

    xoff += 0.01;
  };
  return <Sketch setup={setup} draw={draw} />;
};
