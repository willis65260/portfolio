import React, { useState } from "react";
import { p_e, p_s, T, c, f, valores } from "../Analizador/script/A_LSS_VAR";
import {iniciar} from "../Analizador/script/A_LSS"
const code = `int o,n,u,c;
print("Dame_la base:_");
n=input("");
print("Dame_la altura:_");
u=input("");
print("El resultadoes:_");
c=(n*u)/2;
print(c);
Fin`;

const IntermediateCode = () => {
  // console.log(T);
  const [transaltion, setTransaltion] = useState("");
  return (
    <div className="traductor">
      <h5 className="texto">
        This is a little 'code translator' (if we can call it that way) from my
        own 'Programming Language' to C{" "}
      </h5>
      <textarea
        id="codigo"
        cols="30"
        rows="10"
        defaultValue={code}
        style={{ color: "black" }}
      ></textarea>
      <button className="button button-translate" onClick={()=>{
        // document.getElementById("codigo-tra").innerText = ""
        setTransaltion("")

        setTransaltion(iniciar({code}))
      }}>Translate</button>
      <h5 className="texto">
        {" "}
        atm it has very basic commands but if you wanna see all that it can do,
        please check the grammar on 'GitHub'
      </h5>
      <pre id="codigo-tra">
        {transaltion}
      </pre>
      <button className="button button-copy" onClick={()=>{
       navigator.clipboard.writeText(transaltion);
      }}>Copy</button>
      <h5 className="texto">
        {" "}
        Now you can copy and paste this in a <a href="https://www.onlinegdb.com/online_c_compiler" target="_blank" rel="noreferrer noopener" className="a-ref-color">C compiler</a> to execute the code
      </h5>
      
    </div>
  );
};

export default IntermediateCode;

