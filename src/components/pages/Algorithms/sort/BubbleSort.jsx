import React from "react";
import Sketch from "react-p5";

const Projects = () => {
  var xoff = 0;
  // let setup = (p5, createCanvas) => {
  //   let xyz = p5.createCanvas(400, 400).parent(createCanvas);
  // };

  // let draw = (p5) => {
  //   p5.background(220);
  //   var x = p5.map(p5.noise(xoff), 0, 1, 0, 400);
  //   p5.ellipse(x, 200, 24, 24);

  //   xoff += 0.01;
  // };

  var width = 400;
  var height =400;
  var numeros = [];
  var posx = 0;

  let setup = (p5, createCanvas) => {
    let xyz = p5.createCanvas(400, 400).parent(createCanvas);
    for (var i = 0; i < width; i++) {
      numeros[i] = p5.map(p5.noise(i / 1), 0, 1, 0, height);
      
    }
    console.log(numeros);
  }
  
  var i = 0;
  // var j = 0;
  let draw = (p5) => {
    p5.background(21);
    p5.stroke(255);
    for (let n = 0; n < width; n++) {
      p5.line(n, height, n, height - numeros[n]);
    }
    posx = 0;
  
    //start ordenar
    for (let j = 0; j < numeros.length + i; j++) {
      let a = numeros[j];
      let b = numeros[j + 1];
  
      if (a > b) {
        //cambio
        let c = a;
        numeros[j + 1] = c;
        numeros[j] = b;
      }
    }
    for (let n = 0; n < width; n++) {
      p5.line(n, height, n, height - numeros[n]);
    }
    if (i >= width) {
      p5.noLoop();
      //end draw recursion
    }
    i++;
  
    //finish ordenar
  
    // noLoop();
  }
  



  return (
    <div className="">
      {/* <div className="asd"> */}
        <Sketch setup={setup} draw={draw}/>
        {/* <Sketch setup={setup} draw={draw} className="asd"/> */}
      {/* </div> */}
    </div>
  );
};

export default Projects;
