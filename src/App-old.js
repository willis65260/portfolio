import Background from "./components/Backgrounds/Background";
import BackgroundSecond from "./components/Backgrounds/BackgroundSecond";
import BackgroundThird from "./components/Backgrounds/BackgroundThird";
import BakcgroundFourth from "./components/Backgrounds/BakcgroundFourth";
// import "./estilos/estilos.css";

function App() {
  return (
    <div className="App">

      {/* <h1 style={{backgroundColor:"#124050", width:"300px"}}>Hola mund</h1> */}
      <div className="">
        <nav className="nav-bar">
          
        </nav>
        <div className="contenedor">
        <div className="test"> 
           {/* Hola mundo */}
          </div>
          <Background />
        </div>
        <div className="contenedor">
        <div className="test"> 
           {/* Hola mundo */}
          </div>
          <BackgroundSecond />
        </div>
        <div className="contenedor">
        <div className="test"> 
           {/* Hola mundo */}
          </div>
          <BackgroundThird />
        </div>
        <div className="contenedor">
        <div className="test"> 
           {/* Hola mundo */}
          </div>
          <BakcgroundFourth />
        </div>
      </div>

    </div>
  );
}

export default App;
