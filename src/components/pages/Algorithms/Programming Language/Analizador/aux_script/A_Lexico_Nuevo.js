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
        P0: 'PR',
        P1: 'Declaracion',
        P2: 'Asigna',
        P3: 'Selec',
        P4: 'Repe',
        P5: 'print',
        P6: '}',
        P7: 'Asigna',
        P8: 'Selec',
        P9: 'Repe',
        P10: 'print',
        P11: 'Fin',
        P12: 'Tipo',
        P13: ',',
        P14: ';',
        P15: 'String',
        P16: 'char',
        P17: 'int',
        P18: 'float',
        P19: 'bool',
        P20: 'id',
        P21: 'Oper',
        P22: 'cmp',
        P23: 'input',
        P24: 'palabra',
        P25: 'caracter',
        P26: 'Oper',
        P27: 'Oper',
        P28: 'T',
        P29: 'T',
        P30: 'T',
        P31: 'F',
        P32: '(',
        P33: 'id',
        P34: 'num',
        P35: 'cmp',
        P36: 'cmp',
        P37: 'cmp',
        P38: 'cmp',
        P39: 'cmp',
        P40: 'cmp',
        P41: 'cmp',
        P42: 'B',
        P43: '(',
        P44: 'id',
        P45: 'true',
        P46: 'false',
        P47: 'num',
        P48: 'Fi',
        P49: 'switch',
        P50: 'C',
        P51: 'C',
        P52: 'if',
        P53: 'case',
        P54: 'case',
        P55: 'default',
        P56: 'num',
        P57: 'id',
        P58: 'true',
        P59: 'false',
        P60: 'do',
        P61: 'W',
        P62: 'for',
        P63: 'while',
        P64: 'TipoF',
        P65: 'int',
        P66: 'float',
        P67: 'id',
        P68: 'num',
        P69: 'numf',
        P70: 'palabra',
        P71: 'caracter'
    }

    p_s = {
        P0: 'PR’',
        P1: 'PR',
        P2: 'DC',
        P3: 'DC',
        P4: 'DC',
        P5: 'DC',
        P6: 'DC',
        P7: 'DCP',
        P8: 'DCP',
        P9: 'DCP',
        P10: 'DCP',
        P11: 'DCP',
        P12: 'Declaracion',
        P13: 'A',
        P14: 'A',
        P15: 'Tipo',
        P16: 'Tipo',
        P17: 'Tipo',
        P18: 'Tipo',
        P19: 'Tipo',
        P20: 'Asigna',
        P21: 'E',
        P22: 'E',
        P23: 'E',
        P24: 'E',
        P25: 'E',
        P26: 'Oper',
        P27: 'Oper',
        P28: 'Oper',
        P29: 'T',
        P30: 'T',
        P31: 'T',
        P32: 'F',
        P33: 'F',
        P34: 'F',
        P35: 'cmp',
        P36: 'cmp',
        P37: 'cmp',
        P38: 'cmp',
        P39: 'cmp',
        P40: 'cmp',
        P41: 'cmp',
        P42: 'cmp',
        P43: 'B',
        P44: 'B',
        P45: 'B',
        P46: 'B',
        P47: 'B',
        P48: 'Selec',
        P49: 'Selec',
        P50: 'Fi',
        P51: 'Fi',
        P52: 'C',
        P53: 'S',
        P54: 'D',
        P55: 'D',
        P56: 'N',
        P57: 'N',
        P58: 'N',
        P59: 'N',
        P60: 'Repe',
        P61: 'Repe',
        P62: 'Repe',
        P63: 'W',
        P64: 'IFo',
        P65: 'TipoF',
        P66: 'TipoF',
        P67: 'V',
        P68: 'V',
        P69: 'V',
        P70: 'V',
        P71: 'V'
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
        P0: "PR’--> PR",
        P1: 'PR--> Declaracion DC',
        P2: 'DC--> Asigna DC',
        P3: 'DC--> Selec DC',
        P4: 'DC--> Repe DC',
        P5: 'DC--> print(V);DC',
        P6: 'DC--> }',
        P7: 'DCP--> Asigna DCP',
        P8: 'DCP--> Selec DCP',
        P9: 'DCP--> Repe DCP',
        P10: 'DCP--> print(V);DCP',
        P11: 'DCP--> Fin',
        P12: 'Declaracion--> Tipo id A Declaracion',
        P13: 'A--> , id A',
        P14: 'A--> ;',
        P15: 'Tipo--> String',
        P16: 'Tipo--> char',
        P17: "Tipo--> int",
        P18: 'Tipo--> float',
        P19: 'Tipo--> bool',
        P20: 'Asigna--> id=E',
        P21: 'E--> Oper',
        P22: 'E--> cmp',
        P23: 'E--> input(V)',
        P24: 'E--> palabra',
        P25: 'E--> caracter',
        P26: 'Oper--> Oper + T',
        P27: 'Oper--> Oper - T',
        P28: 'Oper--> T',
        P29: 'T--> T * F',
        P30: 'T--> T / F',
        P31: 'T--> F',
        P32: 'F--> (Oper)',
        P33: 'F--> id',
        P34: "F--> num",
        P35: 'cmp--> cmp > B',
        P36: 'cmp--> cmp < B',
        P37: 'cmp--> cmp >= B',
        P38: 'cmp--> cmp <= B',
        P39: 'cmp--> cmp != B',
        P40: 'cmp--> cmp && B',
        P41: 'cmp--> cmp || B',
        P42: 'cmp--> B',
        P43: 'B--> (cmp)',
        P44: 'B--> id',
        P45: 'B--> true',
        P46: 'B--> false',
        P47: 'B--> num',
        P48: 'Selec--> Fi',
        P49: 'Selec-->switch ( id ) { S }',
        P50: 'Fi--> C { DC',
        P51: "Fi-->C { DC else { DC",
        P52: 'C--> if( cmp )',
        P53: 'S--> case N : DC break ; D',
        P54: 'D--> case N : DC break ; D',
        P55: 'D--> default : DC break ;',
        P56: 'N--> num',
        P57: 'N-->, id',
        P58: 'N--> true',
        P59: 'N--> false',
        P60: 'Repe--> do { DC W ;',
        P61: 'Repe--> W { DC',
        P62: 'Repe--> for ( IFo ; cmp ; num ) { DC',
        P63: 'W--> while ( cmp )',
        P64: 'IFo--> TipoF id = num ;',
        P65: 'TipoF--> int',
        P66: 'TipoF--> float',
        P67: 'V--> id',
        P68: "V-->num",
        P69: 'V--> numf',
        P70: 'V--> palabra',
        P71: 'V--> caracter',
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
            if (entrada == 'error') {
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
                var andrea = TABLA[fila][columna]

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
                console.log("===========================" + andrea)

                if (andrea == 'P16') {
                    cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>' + pila_semantica + '</td>'
                } else if (producciones_sem.indexOf(andrea) != -1) {
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
                    } else {
                        //error semantico
                        cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>error semantico</td>'
                        break;
                    }
                } else if (andrea == 'P8') {
                    T1 = pila_semantica.pop()
                    T2 = pila_semantica.pop()
                    if (T1 != T2) {
                        cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>error semantico</td>'
                        break;
                    }
                    cadena_tabla_sintactico = cadena_tabla_sintactico + '<td>' + pila_semantica + '</td>'
                } else {
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
            cadena_tabla_sintactico = cadena_tabla_sintactico + '</tr>'
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
            //si la entrada corresponde con un ';' entonces se limpian ciertas variables
            ////puede ser innecesario este paso pero fuck it
            if (terminador /*;*/ == ent) {
                tipo_dato_actual = ''
                if (ban_asignacion) {
                    //comparar T1 y T2
                    ban_asignacion = false
                }
                return ent
            } else if (retornar_igual.indexOf(ent) != -1) {
                return ent
            } else if (asignacion == ent) {
                ban_asignacion = true
                //asignado = ent
                console.log('estas pendejo mijo ')
                return ent
            } else if (operacion.indexOf(ent) != -1) {
                //saca los dos tipos de dato de arriba de la tabla semantica
                // T1 = pila_semantica.pop()
                // T2 = pila_semantica.pop()
                // if (T1 != T2) {
                //     pila_semantica.push('float')
                // } else {
                //     pila_semantica.push(T1)
                // }
                // cadena_tabla_semantico = cadena_tabla_semantico + '<td>'+ent+'</td><td>'+tabla_de_variables[ent].Tipo+'</td><td>'+pila_semantica+'</td></tr>'
                return ent
            } else if (RegEx_Variable.test(ent)) {
                if (tipo_dato_actual != '') {
                    console.log(typeof tabla_de_variables[ent])
                    if (typeof tabla_de_variables[ent] !== 'object') {
                        ASDeclararVariable(ent)
                        console.log(tabla_de_variables)
                    } else {
                        if (tabla_de_variables[ent].Tipo != tipo_dato_actual) {
                            return 'error'
                        } else {
                            //variable declarada correctamente pero analizada de nuevo
                        }
                    }
                }
                // else if (asignacion) {
                //     //Analiscze los tipos
                //     //ent = 'a'
                //     //Auxiliar_semeantico(ent);
                //     console.log(ent)

                //     pila_semantica.push(tabla_de_variables[ent].Tipo)
                //     cadena_tabla_semantico = cadena_tabla_semantico + '<td>' + ent + '</td><td>' + tabla_de_variables[ent].Tipo + '</td><td>' + pila_semantica + '</td></tr>'
                //     return 'id'
                //     // tabla_de_variables[ent].Tipo}
                else {
                    T1 = tabla_de_variables[ent].Tipo
                    pila_semantica.push(T1)
                }
                return 'id'
            } else {
                //// eres joto();
            }
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

//posfija
const ExpresionI = [];
const Pila = [];
const Posfija = [];
const operadores = ["+", "-", "/", "*"];
const menPri = ["+", "-"];
const mayPri = ["/", "*"];
const PilaS = [];
//var tipo1, tipo2;

function AnalizarPos() {

    Posfija.reverse();

    while (typeof (Posfija[0]) !== "undefined") {
        if (operadores.indexOf(Posfija[Posfija.length - 1]) != -1) {

            tipo1 = PilaS.pop();
            tipo2 = PilaS.pop();
            Posfija.pop();

            if (tipo1 == "char" || tipo2 == "char") {
                console.log("Error Semantico: no coinciden los tipos");
            } else {
                if (tipo1 == tipo2) {
                    PilaS.push(tipo1);
                } else {
                    PilaS.push("float");
                }
            }
        } else {
            PilaS.push(Posfija.pop());
        }
    }
}


function Analizar(exp) {
    if (exp == "(") {
        Pila.push(exp);
    } else if (decV.indexOf(exp) != -1) {
        Posfija.push(decT[decV.indexOf(exp)]);
    } else if (operadores.indexOf(exp) != -1) {
        
        if (mayPri.indexOf(exp) != -1) {
            while (mayPri.indexOf(Pila[Pila.length - 1]) != -1) {
                Posfija.push(Pila.pop());
            }
            Pila.push(exp);
        } else if (menPri.indexOf(exp) != -1) {
            while (operadores.indexOf(Pila[Pila.length - 1]) != -1) {
                Posfija.push(Pila.pop());
            }
            Pila.push(exp);
        } else console.log("Error Semantico")
        

    } else if (exp == ")") {
        while (Pila[Pila.length - 1] != "(") {
            Posfija.push(Pila.pop());
        }
        Pila.pop();
    } else if (exp === ";") {
        while (typeof (Pila[0]) !== "undefined") {
            Posfija.push(Pila.pop());
        }
    }
}

if (PilaS[0] === decT[decV.indexOf(tipodato)] && decV.length !== 0 && decT.length !== 0) {
    console.log("Analisis Semantico correcto");
} else {
    console.log("Analisis Semantico incorrecto");
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
DC->print ( V ) ; DC
DC->}
DCP->Asigna DCP
DCP->Selec DCP
DCP->Repe DCP
DCP->print ( V ) ; DCP
DCP->Fin
Declaracion->Tipo id A 
A->, id A
A->; Declaracion
A->;
Tipo->string
Tipo->char
Tipo->int
Tipo->float
Tipo->bool
Asigna-> id = E ;
E->Oper
E->cmp :
E->input ( V )
E->palabra
E->carácter
Oper->Oper + T
Oper->Oper - T
Oper->T
T->T * F
T->T / F
T->F
F->( Oper )
F->id
F->num
cmp->cmp > B
cmp->cmp < B
cmp->cmp >= B
cmp->cmp <= B
cmp-> cmp != B
cmp->cmp && B
cmp->cmp || B
cmp->B
B->[ cmp ]
B->id
B->true
B->false
B->num
Selec->Fi
Selec->switch ( id ) { S }
Fi->C { DC
Fi->C { DC else { DC
C->if ( cmp )
S->case N { DC break ; D
D->case N { DC break ; D
D->default { DC break ;
N->num
N->id
N->true
N->false
Repe->do { DC W ;
Repe->W { DC
Repe-> for ( IFo ; cmp : num ) { DC
W->while ( cmp )
IFo->TipoF id = num
TipoF->int
TipoF->float
V->id 
V->num
V->palabra
V->carácter
*/