var turno = 0;
const GANADORES = [
    ['1', '2', '3'],
    ['1', '4', '7'],
    ['4', '5', '6'],
    ['2', '5', '8'],
    ['7', '8', '9'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
];
var jugador1 = [];
var jugador2 = [];
setup();

function setup() {
    obtainBoxes([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((ids) => {
        let StringFromIdsObjects = ids.outerHTML + '';
        ids.onclick = () => {
            // eslint-disable-next-line no-unused-expressions
            turno == 0 ? (
                ids.innerHTML != 'X' && ids.innerHTML != 'O' ? (
                    ids.innerText = 'X',
                    AButtonHasBeenPressed(jugador1, StringFromIdsObjects),
                    turno = 1,
                    SomeOneWon(1)

                ) : (
                    alert("No puedes jugar alli la casilla ya esta llena")
                )
            ) : (
                ids.innerHTML != 'O' && ids.innerHTML != 'X' ? (
                    ids.innerText = 'O',
                    AButtonHasBeenPressed(jugador2, StringFromIdsObjects),
                    turno = 0,
                    SomeOneWon(0)
                ) : (
                    alert("No puedes jugar alli la casilla ya esta llena")
                )
            )
        };
    });

    document.getElementById("reinicio").onclick = () => {
        Limpiar()
        turno = 0;
    }
}

function AButtonHasBeenPressed(jugador, StringFromIdsObjects) {
    jugador.push(
        (() => {
            //El objeto StringFromIdsObjects have the entire element that is being pressed, but this thing from below is cleaning it and it leaves only it's id thats why it cleans the entire thing that is not a number 
            return StringFromIdsObjects.split("").map((car) => {
                if (isNaN(car))
                    return;
                else
                    return car;
            }).filter(obj => !isNaN(obj) && obj.charCodeAt(0) != 32 && obj.charCodeAt(0) != 10)[0];
        })()
    );
}

function SomeOneWon(jugador) {
    // eslint-disable-next-line no-unused-expressions
    jugador == 1 ? (
        console.log(jugador1),
        //*Try the different combination of winners
        GANADORES.forEach(element => {
            if (jugador1.indexOf(element[0] + "") != -1) {
                if (jugador1.indexOf(element[1]) != -1) {
                    if (jugador1.indexOf(element[2]) != -1) {
                        HaGanado(1)
                        let actual = document.getElementById("puntos1").innerHTML
                        document.getElementById("puntos1").innerHTML = parseInt(actual) + 1;

                        Limpiar()
                    }
                }
                console.log("Entro aqui");
            }
        })
    ) : (
        console.log(jugador2),
        GANADORES.forEach(element => {
            if (jugador2.indexOf(element[0]) != -1) {
                if (jugador2.indexOf(element[1]) != -1) {
                    if (jugador2.indexOf(element[2]) != -1) {
                        HaGanado(2)
                        let actual = document.getElementById("puntos2").innerHTML
                        document.getElementById("puntos2").innerHTML = parseInt(actual) + 1;

                        Limpiar()
                    }
                }
            }
        })
    )
}

function obtainBoxes(ids) {
    //Obtains the entire element from it's id
    var nuevosid = ids.map((FromId) => {
        return document.getElementById('' + FromId);
    });
    return nuevosid 
}

function HaGanado(ganador) {
    ganador == 1 ? alert("Ha ganado el jugador 1") : alert("Ha ganado el jugador 2")
    ganador == 1 ? turno = 0 : turno = 1
}

function Limpiar() {
    jugador1 = [];
    jugador2 = [];

    obtainBoxes([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((ids) => {
        ids.innerText = ''
    });
}