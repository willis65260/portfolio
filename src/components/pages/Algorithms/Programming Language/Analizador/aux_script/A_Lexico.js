var cod = "int*a*,*b*;"
vec = cod.split('*')
console.log()

document.getElementById('compilar').onclick = function () {

    var codigo = document.getElementById('codigo').value
    codigo = codigo.replace(/\s/g, '')
    codigo = codigo.split(/(int|float|char|.)/).filter(Boolean)
    // codigo = codigo.split(/(\b;|\b,|\b[=]|\b[+]|\b[-]|\b[*]|\b[/]|\B[(]|\b[)]|\bint|\bfloat|\bchar)/).filter(car => car != "")

    // codigo = codigo.replace(/\s/g, '')

    retornar_igual = [',', '(', ')', '$']
    terminador = ';'
    asignacion = '='
    operacion = ['+', '-', '*', '/']
    tipos_dato = ['int', 'float', 'char'] //palabras clave

    codigo.push('$')
    tabla_de_variables = []
    var RegEx_Variable = /(\w)/
    pila_semantica = []

    var cadena_tabla = ""
    cadena_tabla_lexico = ""
    cadena_tabla_sintactico = ""
    cadena_tabla_semantico = ""
    producciones_sem = ['P9', 'P10', 'P12', 'P13']
    
    c = "id	int	float	char	,	;	+	-	*	/	=	(	)	$	P	Tipo	V	A	E	T	F"
    f = "I0	I1	I2	I3	I4	I5	I6	I7	I8	I9	I10	I11	I12	I13	I14	I15	I16	I17	I18	I19	I20	I21	I22	I23	I24	I25	I26	I27	I28	I29	I30	I31"

    p_e = {
        P0: 'P',
        P1: 'Tipo',
        P2: 'A',
        P3: 'int',
        P4: 'float',
        P5: 'char',
        P6: ',',
        P7: ';',
        P8: 'id',
        P9: 'E',
        P10: 'E',
        P11: 'T',
        P12: 'T',
        P13: 'T',
        P14: 'F',
        P15: '(',
        P16: 'id'
    }

    p_s = {
        P0: "P'",
        P1: 'P',
        P2: 'P',
        P3: 'Tipo',
        P4: 'Tipo',
        P5: 'Tipo',
        P6: 'V',
        P7: 'V',
        P8: 'A',
        P9: 'E',
        P10: 'E',
        P11: 'E',
        P12: 'T',
        P13: 'T',
        P14: 'T',
        P15: 'F',
        P16: 'F'
    }

    Tipo_lexema = {
        'id': 'identificador',
        'int': 'palabra reservada',
        'float': 'palabra reservada',
        'char': 'palabra reservada',
        ',': 'caracter que no hace nada',
        '(': 'caracter que no hace nada',
        ')': 'caracter que no hace nada',
        '$': 'caracter que no hace nada',
        '=': 'asignacion',
        ';': 'terminador',
        '+': 'operador',
        '-': 'operador',
        '*': 'operador',
        '/': 'operador'
    }

    Tipo_sintactico = {
        P0: "P’-->P",
        P1: 'P--> Tipo id V',
        P2: 'P--> A',
        P3: 'Tipo--> int',
        P4: 'Tipo--> char',
        P5: 'Tipo--> float',
        P6: 'V-->, id V',
        P7: 'V-->;P',
        P8: 'A--> id = E;',
        P9: 'E--> E + T',
        P10: 'E--> E - T',
        P11: 'E--> T',
        P12: 'T--> T * F',
        P13: 'T--> T / F',
        P14: 'T--> F',
        P15: 'F-->(E)',
        P16: 'F--> id'
    }

    var TABLA = []
    // String[] auysdgsa={
    // "I7	I3	I4	I5											I1	I2		I6			",
    // "													P0							",
    // "I8																				",
    // "P3																				",
    // "P4																				",
    // "P5																				",
    // "													P2							",
    // "										I9										",
    // "				I11	I12											I10				",
    // "I17											I16							I13	I14	I15",
    // "													P1							",
    // "I18																				",
    // "I7	I3	I4	I5											I19	I2		I6			",
    // "					I20	I21	I22													",
    // "					P11	P11	P11	I23	I24			P11								",
    // "					P14	P14	P14	P14	P14			P14								",
    // "I17																		I25	I14	I15",
    // "					P16	P16	P16	P16	P16			P16								",
    // "				I11	I12											I26				",
    // "													P7							",
    // "													P8							",
    // "I17											I16								I27	I15",
    // "																			I28	I15",
    // "I17											I16									I29",
    // "I17											I16									I30",
    // "						I21	I22					I31								",
    // "													P6							",
    // "					P9	P9	P9	I23	I24			P9								",
    // "					P10	P10	P10	I23	I24			P10								",
    // "					P12	P12	P12	P12	P12			P12								",
    // "					P13	P13	P13	P13	P13			P13								",
    // "					P15	P15	P15	P15	P15			P15								"
    // };

    T = [
        "I7	I3	I4	I5											I1	I2		I6			",
        "													P0							",
        "I8																				",
        "P3																				",
        "P4																				",
        "P5																				",
        "													P2							",
        "										I9										",
        "				I11	I12											I10				",
        "I17											I16							I13	I14	I15",
        "													P1							",
        "I18																				",
        "I7	I3	I4	I5											I19	I2		I6			",
        "					I20	I21	I22													",
        "					P11	P11	P11	I23	I24			P11								",
        "					P14	P14	P14	P14	P14			P14								",
        "I17																		I25	I14	I15",
        "					P16	P16	P16	P16	P16			P16								",
        "				I11	I12											I26				",
        "													P7							",
        "													P8							",
        "I17											I16								I27	I15",
        "																			I28	I15",
        "I17											I16									I29",
        "I17											I16									I30",
        "						I21	I22					I31								",
        "													P6							",
        "					P9	P9	P9	I23	I24			P9								",
        "					P10	P10	P10	I23	I24			P10								",
        "					P12	P12	P12	P12	P12			P12								",
        "					P13	P13	P13	P13	P13			P13								",
        "					P15	P15	P15	P15	P15			P15								"
    ]
    console.log(codigo)
    console.log(codigo.length)


    car = 'a'
    hola = {
        [car]: {
            Nombre: 'a',
            Tipo: 'int',
            AL: 'id',
            Valor: 0
        }
    }

    console.log(hola['a'])
    setup()

    function setup() {
        InicializarTabla()
        console.log(c.indexOf('='))
        Analizar()
    }

    // console.log(tabla_de_variables)

    function InicializarTabla() {

        cadena_tabla = cadena_tabla + '<table class="table table-hover"><thead><tr class="table-info"><td>estado</td>'
        c.split("	").map(elem => {
            cadena_tabla = cadena_tabla + '<th scope="col">' + elem + '</th>'
        });
        cadena_tabla = cadena_tabla + '</tr></thead>'

        cont = 0
        f.split("	").map(elem => {
            cadena_tabla = cadena_tabla + '<tr class="table-active"><td>' + elem + '</td>'
            T[cont].split("	").map(token => {
                cadena_tabla = cadena_tabla + '<td>' + token + '</td>'
            });
            cont++
            cadena_tabla = cadena_tabla + '</tr>'
        });
        cadena_tabla = cadena_tabla + '</table>'
        document.getElementById("Tabla5").innerHTML = cadena_tabla
        c = c.split("	")
        f = f.split("	")
        
        T.map(tab => {
            TABLA.push(tab.split("	"))
        });

    }


    var iteraciones = 0

    //sintactico
    function Analizar() {
        var pila = ['I0']
        var entrada = ''
        var i = 0
        cadena_tabla_lexico = cadena_tabla_lexico + '<table class="table table-hover"><thead><tr class="table-info"><td>Token</td><td>Lexema</td><td>Tipo</td></tr>'
        cadena_tabla_sintactico = cadena_tabla_sintactico + '<table class="table table-hover"><thead><tr class="table-info"><td>Entrada</td><td>Pila</td><td>Accion</td><td>pila semantica</td></tr>'
        cadena_tabla_semantico = cadena_tabla_semantico + '<table class="table table-hover"><thead><tr class="table-info"><td>Variable</td><td>Tipo</td><td>Pila Sem</td></tr>'
        // for (let i = 0; i < codigo.length; i++) {
        
        
        do {
            entrada = A_L(codigo[i])
            if(entrada=='error'){
                cadena_tabla_lexico = cadena_tabla_lexico + '<tr class="table-active"><td>' + codigo[i] + '</td><td>' + entrada + '</td><td>Error variable ya declarada</td>'
                cadena_tabla_sintactico = cadena_tabla_sintactico + '<tr class="table-active"><td>' + entrada + '</td><td>' + pila + '</td><td>Error lexico</td>'
                break;
            }
            cadena_tabla_sintactico = cadena_tabla_sintactico + '<tr class="table-active"><td>' + entrada + '</td><td>' + pila + '</td>'
            cadena_tabla_semantico = cadena_tabla_semantico + '<tr class="table-active">'

            var fila = f.indexOf(pila[pila.length - 1]) //obtener el ultimo estado de la pila
            var columna = c.indexOf(entrada) //obtener la posicion del token a analizar

            if (entrada == '$' && TABLA[fila][columna] == 'P0') { //se acepta{
                cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>Reducir ' + entrada + ' con ' + Tipo_sintactico[TABLA[fila][columna]] + ' se acepta la cadena</td><td></td>'
                break
            }

            console.log('Codigo ' + codigo[i] + ' Fila:' + fila + ' Columna:' + columna + ' Tabla:' + TABLA[fila][columna] + ' Entrada:' + entrada)

            if (TABLA[fila][columna].charAt(0) == 'I') {
                //Significa que se Desplazara
                
                pila.push(entrada)
                pila.push(TABLA[fila][columna])
                cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>Desplazar ' + entrada + ' a ' + TABLA[fila][columna] + '</td>'
                cadena_tabla_lexico = cadena_tabla_lexico + '<tr class="table-active"><td>' + codigo[i] + '</td><td>' + entrada + '</td><td>' + Tipo_lexema[entrada] + '</td>'
                cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>' + pila_semantica + '</td>'
                i++
                // console.log('La pila tiene '+pila)
                // continue
            } else if (TABLA[fila][columna].charAt(0) == 'P') {
                //Significa que se Reducirá
                //Acciones semanticas segun la produccion
                var andrea=TABLA[fila][columna]
                
                do {
                    pila.pop()
                } while (p_e[TABLA[fila][columna]] != pila[pila.length - 1])
                pila.pop()
                pila.push(p_s[TABLA[fila][columna]])
                cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>Reducir ' + entrada + ' con ' + Tipo_sintactico[TABLA[fila][columna]] + '</td>'
                fila = parseInt(pila[pila.length - 2].substr(1, pila[pila.length - 2].length - 1)) //obtener el ultimo estado de la pila
                // console.log(fila + ' ' + columna + ' ' + pila + ' '+TABLA[fila][columna]+'Aqui hay error')
                columna = c.indexOf(pila[pila.length - 1])
                // console.log(fila + ' ' + columna + ' ' + pila[pila.length-1]  )
                console.log('Fila:' + fila + ' Columna:' + columna + ' Tabla:' + TABLA[fila][columna])
                console.log('Pila semantica: ' + pila_semantica)
                // cadena_tabla_semantico = cadena_tabla_semantico + '<td>'+pila_semantica+'</td></tr>'
                pila.push(TABLA[fila][columna])
                // console.log(TABLA[fila][columna])
                console.log("==========================="+andrea)




                if (andrea == 'P16') {
                    cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>' + pila_semantica + '</td>'
                } else if (producciones_sem.indexOf(andrea)!=-1) {
                    console.log("|||||||||||||||||||||||||||||||||||||||||||")
                    console.log(pila_semantica)
                    T1 = pila_semantica.pop()
                    T2 = pila_semantica.pop()
                    console.log(pila_semantica)

                    if (T1 != 'char' && T2 != 'char') {
                        if (T1 != T2) {
                            pila_semantica.push('float')
                            cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>' + pila_semantica + '</td>'
                        } else {
                            pila_semantica.push(T1)
                            cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>' + pila_semantica + '</td>'
                        }
                    }else{
                        //error semantico
                        cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>error semantico</td>'
                        break;
                    }
                }else if(andrea=='P8'){
                    T1 = pila_semantica.pop()
                    T2 = pila_semantica.pop()
                    if (T1 != T2) {
                        cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>error semantico</td>'
                        break;
                    }
                    cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>' + pila_semantica + '</td>'
                }else{
                    cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>' + pila_semantica + '</td>'
                }
            } else {
                break;
            }

            console.log('La pila tiene ' + pila)
            console.log('El codigo tiene ' + entrada)

            if (iteraciones++ >= 500) {
                console.log('Te pasaste de v carnal')
                break
            }
            cadena_tabla_sintactico = cadena_tabla_sintactico +'</tr>'
            console.log(i)
        } while (i <= codigo.length)

        console.log(tabla_de_variables)
        cadena_tabla_lexico = cadena_tabla_lexico + '</table>'
        cadena_tabla_sintactico = cadena_tabla_sintactico + '</table>'
        cadena_tabla_semantico = cadena_tabla_semantico + '</table>'
        document.getElementById('Tabla2').innerHTML = cadena_tabla_lexico
        document.getElementById('Tabla3').innerHTML = cadena_tabla_sintactico
        // }
    }

    var ban_asignacion = false
    tipo_dato_actual = ""
    T1 = ''
    T2 = ''

    function A_L(ent) {
        tdd = tipos_dato.indexOf(ent) //revisar palabras clave
        // console.log(ent)
        if (tdd != -1) {
            tipo_dato_actual = ent
            return ent
        } else {
            if (terminador /*;*/ == ent) {
                tipo_dato_actual = ''
                if (ban_asignacion) {
                    ban_asignacion = false
                }
                return ent
            } else if (retornar_igual.indexOf(ent) != -1) {
                return ent
            } else if (asignacion == ent) {
                ban_asignacion = true
                
                console.log('estas pendejo mijo ')
                return ent
            } else if (operacion.indexOf(ent) != -1) {
                return ent
            } else if (RegEx_Variable.test(ent)) {
                if (tipo_dato_actual != '') {
                    console.log(typeof tabla_de_variables[ent])
                    if(typeof tabla_de_variables[ent]!=='object'){
                        ASDeclararVariable(ent)
                        console.log(tabla_de_variables)
                    }else{
                        if(tabla_de_variables[ent].Tipo!=tipo_dato_actual){
                            return 'error'
                        }
                        else{ }
                    }
                }
                else {
                    T1 = tabla_de_variables[ent].Tipo
                    pila_semantica.push(T1)
                }
                return 'id'
            } else {}
        }
    }

    // mapeo_tipos_dato={
    //     int:{
    //         int:'int',
    //         float:'float'
    //     },
    //     float:{
    //         int:'float',
    //         float:'float'
    //     }
    // }
    // console.log(mapeo_tipos_dato['int']['int'])
    function Auxiliar_semeantico(as) {
        //T2
    }

    function ASDeclararVariable(ent) {
        tabla_de_variables[ent] = {
            Nombre: ent,
            Tipo: tipo_dato_actual,
            Token: 'id',
            Valor: 0
        }
    }
}

const ExpresionI = [];
const Pila = [];
const Posfija = [];
const operadores = ["+","-","%","*"];
const menPri = ["+","-"];
const mayPri = ["%","*"];
const PilaS = [];
var tipo1, tipo2;

function AnalizarPos(){
  
  Posfija.reverse();

    while(typeof(Posfija[0]) !== "undefined"){
      if (operadores.indexOf(Posfija[Posfija.length-1]) != -1) {
        
        tipo1 = PilaS.pop();
        tipo2 = PilaS.pop();
        Posfija.pop();
      
        if(tipo1 == "char" || tipo2 == "char"){
          console.log("Error Semantico: no coinciden los tipos");
        }else {
          if(tipo1 == tipo2){
            PilaS.push(tipo1);
          }else {
            PilaS.push("float");
          }
        }
      }else {
        PilaS.push(Posfija.pop());
      }
    }
}



/*

console.log(codigo.length)
console.log(codigo)
var i = 0
do {
    declara = tipos_dato.indexOf(codigo[i])
    if (declara == -1) {

    } else {
        //Declarar variables hasta un ;
        i++
        console.log(i)
        console.log('Declara')
        do {
            if (RegEx_Variable.test(codigo[i])) {
                //inicialice segun el tipo de dato
                tabla_de_variables.push({
                    Nombre: codigo[i],
                    Tipo: tipos_dato[declara],
                    AL: 'id',
                    Valor: 0
                })
                codigo[i] = 'id'
            }
            i++
            console.log(i)
        } while (codigo[i] != ';')
        console.log(i)
    }
    i++
    console.log(i)
} while (i < codigo.length)

console.log(tabla_de_variables)
console.log(codigo)
//token



// codigo.map(
//     (token)=>{
//         if(tipos_dato.indexOf(token)){

//         }
//     });


// }*/

/*
PR’->PR
PR->Declaracion DCP Fin
DC->Asigna DC
DC->Selec DC
DC->Repe DC
DC->print(V); DC
DC->}
DCP-> Asigna DCP
DCP ->Selec DCP
DCP ->Repe DCP
DCP ->print(V); DCP
DCP ->Fin
Declaracion Tipo id A Declaracion
A-> , id A
A->;
Tipo->string
Tipo->char
Tipo->int
Tipo->float
Tipo->bool
Asigna-> id=E;
E->Oper
E->cmp
E->input(V)
E->palabra
E->carácter
Oper->Oper+T
Oper->Oper-T
Oper->T
T->T*F
T->T/F
T->F
F->(Oper)
F->id
F->num
cmp->cmp > B
cmp ->cmp < B
cmp ->cmp >= B
cmp ->cmp <= B
cmp -> cmp != B
cmp ->cmp && B
cmp ->cmp || B
cmp ->B
B-> (cmp)
B->id
B->true
B->false
B->num
Selec->Fi
Selec->switch(id){S
Fi->C{DC
Fi->C{DCelse{DC
C->if(cmp)
S->Case N: DC break; 
D->case N: DC break; 
D->Default : DC break
N->num
N->id
N->true
N->false
Repe->do{DC W;
Repe->W{DC
Repe-> for ( IFo ; cmp ; num) { D
W->while(cmp)
IFo->TipoF id=num
TipoF->int
TipoF->float
V->id 
V->num
V->palabra
V->carácter
*/