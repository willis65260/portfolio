import { p_e, p_s, T, c, f, valores } from "./A_LSS_VAR.js";

// document.getElementById("compilar").onclick = function () {
var codigo;
var asignacion = "=";
var terminador = ";";
var terminador_cmp = ":";
var tipos_dato = ["String", "char", "int", "float", "bool"];
var retornar_igual = [":", ",", "{", "}", "$"];
var operacion = ["+", "-", "*", "/"];
var ope_men_pri = ["+", "-"];
var ope_may_pri = ["*", "/"];
//, '[', ']'

var operacion_bool = ["<", ">", "<=", ">=", "!=", "||", "&&"];
var comp_num_id = ["<", ">", "<=", ">="];
var comp_bool = ["!=", "||", "&&"];
var boelanos = ["true", "false"];

var palab_clave = [
  "if",
  "switch",
  "do",
  "while",
  "for",
  "break",
  "else",
  "print",
  "read",
  "case",
  "default",
  "input",
  "Fin",
];

var ciclos_repe_selec = ["if", "switch", "do", "while"];

var RegEx_Char = /(['][']|['][^']['])/;
var RegEx_Palabra = /(["][^"]*["])/;
var RegEx_Variable = /(\w)/;
var RegEx_Numero_Int = new RegExp("^\\d+$");
var RegEx_Numero_Float = new RegExp("^-?d+.?d*$|^d*.?d+$");
//palabras a regresar ( id pala	carac num true false numf )

var ban_asignacion = false;
var ban_declaracion = false;
var ban_if = false;
var ban_else = false;
var ban_while = false;
var ban_do = false;
var ban_stich = false;
var ban_case = false;
var ban_default = false;
var ban_break = false;
var ban_print = false;
var ban_read = false;

// var otra_ban_while = false
// var ban_cierra_normal = false
var etiuno = "";
var etidos = "";
var tipo_dato_actual = "";
var T1 = "";
var T2 = "";
var id_asignar = "";

var aux_eti = "";

var cadena_tabla = "";
var tabla_de_variables = [];
var pila_semantica = [];

var TABLA = [];

var pila_posfija = [];
var posfija = [];
var posfija_tipos = [];
var posfija_tipos_booleanos = [];
var pilaS = [];
var pilaS_booleanos = [];

var var1 = "";
var var2 = "";
var tipo1 = "";
var tipo2 = "";

var pila_etiquetas = [];
var etiqueta_else = [];

var pila_switch = [];
var pila_fin_switch = [];

var cont_var = 0;
var cont_etiq = 0;

var cod_obj_id_asigna = "";

var fa, ca;

var codigo_obj = "#include <stdio.h>\n#include <stdbool.h> \nint main() { \n";

export const iniciar = function (cod) {
  codigo = cod.code
  codigo = codigo.replace(/\s/g, "");
  codigo = codigo
    .split(
      /(['][']|['][^'][']|["][^"]*["]|[0-9]+|<=|>=|!=|[|][|]|[&][&]|<|>|switch|else|if|case|break|default|do|for|while|Fin|print|input|int|float|char|String|bool|palabra|caracter|num|id|true|false|.)/
    )
    .filter(Boolean);
// console.log(cod)
  console.log(codigo.length);
  codigo.push("Fin");
  codigo.push("$");
  console.log(codigo);
  setup();
  let regresar = codigo_obj;
  codigo_obj = "#include <stdio.h>\n#include <stdbool.h> \nint main() { \n";
  return regresar;
};

function setup() {
  InicializarTabla();
  Analizar();
}

// console.log(tabla_de_variables)

function InicializarTabla() {
  cadena_tabla =
    cadena_tabla +
    '<table class="table table-hover"><thead><tr class="table-info"><td>estado</td>';
  c.split("	").map((elem) => {
    cadena_tabla = cadena_tabla + '<th scope="col">' + elem + "</th>";
  });
  cadena_tabla = cadena_tabla + "</tr></thead>";

  let cont = 0;
  f.split("	").map((elem) => {
    cadena_tabla =
      cadena_tabla + '<tr class="table-active"><td>' + elem + "</td>";
    T[cont].split("	").map((token) => {
      cadena_tabla = cadena_tabla + "<td>" + token + "</td>";
    });
    cont++;
    cadena_tabla = cadena_tabla + "</tr>";
  });
  cadena_tabla = cadena_tabla + "</table>";
//   document.getElementById("Tabla5").innerHTML = cadena_tabla;

  ca = c.split("	");
  fa = f.split("	");

  console.log(ca.indexOf("int"));

  T.map((tab) => {
    TABLA.push(tab.split("	"));
  });
}

function Analizar() {
  var pila = ["s0"];
  var entrada = "";
  var i = 0;
  let iteraciones = 0;
  do {
    entrada = A_L(codigo[i]);
    if (entrada == "error") {
      break;
    }

    var fila = fa.indexOf(pila[pila.length - 1]); //obtener el ultimo estado de la pila
    var columna = ca.indexOf(entrada); //obtener la posicion del token a analizar

    if (entrada == "$" && TABLA[fila][columna] == "acc") {
      //se acepta{
      console.log("Todo correcto");
      break;
    }

    console.log(
      "Codigo " +
        codigo[i] +
        " Fila:" +
        fila +
        " Columna:" +
        columna +
        " Tabla:" +
        TABLA[fila][columna] +
        " Entrada:" +
        entrada
    );

    if (TABLA[fila][columna].charAt(0) == "s") {
      //Significa que se Desplazara

      if (tipos_dato.indexOf(codigo[i]) != -1) {
        if (codigo[i] == "String") {
          codigo_obj += "char ";
        } else {
          codigo_obj += codigo[i] + " ";
        }
      } else if (ban_print) {
        // if(entrada=='id' || entrada=='num' || entrada=='palabra' || entrada=='caracter'){

        // }

        if (entrada == "print") {
          codigo_obj += "printf";
        } else if (codigo[i] == "(" || codigo[i] == ")") {
          codigo_obj += codigo[i];
          if (entrada == ")") ban_print = false;
        } else if (entrada == "id") {
          if (tabla_de_variables[codigo[i]].Tipo == "char") {
            codigo_obj += '"%c",' + codigo[i];
          } else if (tabla_de_variables[codigo[i]].Tipo == "int") {
            codigo_obj += '"%d",' + codigo[i];
          } else if (tabla_de_variables[codigo[i]].Tipo == "String") {
            codigo_obj += '"%s",' + codigo[i];
          } else if (tabla_de_variables[codigo[i]].Tipo == "bool") {
            console.log("Error");
          }
        }
        if (entrada == "caracter") {
          codigo_obj += '"%c",' + codigo[i];
        } else if (entrada == "num") {
          codigo_obj += '"%d",' + codigo[i];
        } else if (entrada == "palabra") {
          codigo_obj += '"%s",' + codigo[i];
        }

        // pila_etiquetas.push(');')
      } else if (ban_default) {
        // etiuno = 'andrea' + (++cont_etiq)
        // pila_etiquetas.push(etiuno + ': ;\n')
        // etiqueta_else.push('Variable' + cont_var)

        // codigo_obj += 'if( !( ' + pila_switch + ' == ' + posfija + ' ) ) \ngoto ' + etiuno + ' ;\n'
        //}

        pila_switch.pop();
        //pila_switch.push('Variable' + cont_var)
        pila_etiquetas.push(
          "goto " + pila_etiquetas[pila_etiquetas.length - 1] + ";\n"
        );
        codigo_obj += pila_etiquetas.pop();
        //codigo_obj += 'Variable' + cont_var
        ban_default = false;
      } else if (ban_case) {
        ArmarPosfija(codigo[i]);
        if (codigo[i] == "{") {
          tipo1 = posfija_tipos.pop();
          //ASDeclararVariableAuxiliar('Variable' + (++cont_var), tipo1)
          //codigo_obj += tipo1+' Variable' + (cont_var)+' ;\n';
          //lo ideal seria verificar que posfija.pop() estuviese declarado en tabla variables
          //if (posfija_tipos_booleanos.pop() != 'bool') console.log('error')
          //else {
          etiuno = "andrea" + ++cont_etiq;
          // pila_etiquetas.push(etiuno + ': ;\n')
          // etiqueta_else.push('Variable' + cont_var)

          codigo_obj +=
            "if( !( " +
            pila_switch[pila_switch.length - 1] +
            " == " +
            posfija.pop() +
            " ) ) \ngoto " +
            etiuno +
            " ;\n";
          //}

          //pila_switch.push('Variable' + cont_var)
          pila_etiquetas.push(
            "goto " +
              pila_etiquetas[pila_etiquetas.length - 1] +
              ";\n" +
              etiuno +
              " : ; \n"
          );

          //codigo_obj += 'Variable' + cont_var
          ban_case = false;
        }
      } else if (ban_stich) {
        ArmarPosfija(codigo[i]);
        if (codigo[i] == "{") {
          tipo1 = posfija_tipos.pop();
          ASDeclararVariableAuxiliar("Variable" + ++cont_var, tipo1);
          codigo_obj += tipo1 + " Variable" + cont_var + " ;\n";
          //lo ideal seria verificar que posfija.pop() estuviese declarado en tabla variables
          codigo_obj += "Variable" + cont_var + " = " + posfija.pop() + " ;\n";

          pila_switch.push("Variable" + cont_var);
          pila_etiquetas.push(":;\n");
          pila_etiquetas.push("andrea" + ++cont_etiq);

          //codigo_obj += 'Variable' + cont_var
          ban_stich = false;
        }
      } else if (ban_do) {
        if (codigo[i] == "{") {
          etiuno = "andrea" + ++cont_etiq;

          codigo_obj += etiuno + ":;\n";
          //Analizar_Posfija();
          // if (posfija_tipos_booleanos.pop() != 'bool') //console.log('error')
          // else {
          //     //codigo_obj += 'if( !( Variable' + cont_var + ' ) ) \n'
          // }
          pila_etiquetas.push(etiuno + ";\n");
          pila_etiquetas.push("");
          ban_do = false;
        }
      } else if (ban_while) {
        ArmarPosfija(codigo[i]);
        if (codigo[i] == "{") {
          etiuno = "andrea" + ++cont_etiq;
          etidos = "andrea" + ++cont_etiq;
          if (posfija.length == 1) {
            tipo1 = posfija_tipos.pop();
            if (typeof tipo1 === "undefined")
              tipo1 = posfija_tipos_booleanos.pop();
            ASDeclararVariableAuxiliar("Variable" + ++cont_var, tipo1);
            codigo_obj += tipo1 + " Variable" + cont_var + " ;\n";
            codigo_obj += etidos + ":;\n";
            codigo_obj += "Variable" + cont_var + "=" + posfija.pop() + " ;\n";
          } else {
            codigo_obj += etidos + ":;\n";
            Analizar_Posfija();
            tipo1 = posfija_tipos_booleanos.pop();
          }

          if (tipo1 != "bool") console.log("error");
          else {
            etiqueta_else.push("Variable" + cont_var);
            codigo_obj +=
              "if( !( Variable" + cont_var + " ) ) \ngoto " + etiuno + ";\n";
          }
          pila_etiquetas.push("goto " + etidos + ";\n" + etiuno + ": ;\n");
          ban_while = false;
        } else if (codigo[i] == ";") {
          //etiuno = 'andrea' + (++cont_etiq)

          //codigo_obj += etiuno + ':;\n'
          if (posfija.length == 1) {
            tipo1 = posfija_tipos.pop();
            if (typeof tipo1 === "undefined")
              tipo1 = posfija_tipos_booleanos.pop();
            ASDeclararVariableAuxiliar("Variable" + ++cont_var, tipo1);
            codigo_obj += tipo1 + " Variable" + cont_var + " ;\n";
            // codigo_obj += etidos + ':;\n'
            codigo_obj += "Variable" + cont_var + "=" + posfija.pop() + " ;\n";
          } else {
            Analizar_Posfija();
            tipo1 = posfija_tipos_booleanos.pop();
          }
          if (tipo1 != "bool") console.log("error");
          else {
            //codigo_obj += 'if( !( Variable' + cont_var + ' ) ) \n' + pila_etiquetas.pop()
            //codigo_obj+= pila_etiquetas.pop();
            codigo_obj += "if( !( Variable" + cont_var + " ) ) \ngoto ";
            codigo_obj += pila_etiquetas.pop();
          }

          ban_while = false;
        }
      } else if (ban_else) {
        if (codigo[i] == "{") {
          etiuno = "andrea" + ++cont_etiq;
          pila_etiquetas.push(etiuno + ":;\n");
          codigo_obj +=
            "if( ( " + etiqueta_else.pop() + " ) ) \ngoto " + etiuno + ";\n";
          ban_else = false;
        }
      } else if (ban_if) {
        ArmarPosfija(codigo[i]);
        console.log(posfija);
        if (codigo[i] == "{") {
          if (posfija.length == 1) {
            tipo1 = posfija_tipos.pop();
            if (typeof tipo1 === "undefined")
              tipo1 = posfija_tipos_booleanos.pop();
            ASDeclararVariableAuxiliar("Variable" + ++cont_var, tipo1);
            codigo_obj += tipo1 + " Variable" + cont_var + " ;\n";
            codigo_obj += "Variable" + cont_var + "=" + posfija.pop() + " ;\n";
          } else {
            Analizar_Posfija();
            tipo1 = posfija_tipos_booleanos.pop();
          }
          // tipo1 = posfija_tipos_booleanos.pop()
          if (tipo1 != "bool") console.log("error");
          else {
            etiuno = "andrea" + ++cont_etiq;
            pila_etiquetas.push(etiuno + ": ;\n");
            etiqueta_else.push("Variable" + cont_var);
            codigo_obj +=
              "if( !( Variable" + cont_var + " ) ) \ngoto " + etiuno + ";\n";
          }
          ban_if = false;
        }
      } else if (codigo[i] == "}") {
        //codigo_obj +='goto andrea'+(++cont_etiq)+';\n' +pila_etiquetas.pop() + ':\n'+etiqueta_else+': \n'
        codigo_obj += pila_etiquetas.pop();
      } else if (entrada == "=") {
        cod_obj_id_asigna += codigo[i] + " ";
      } else if (codigo[i] == ";") {
        if (ban_asignacion) {
          ArmarPosfija(codigo[i]);
          if (posfija.length == 1) {
            tipo1 = posfija_tipos.pop();
            if (typeof tipo1 === "undefined")
              tipo1 = posfija_tipos_booleanos.pop();
            if (tipo1 == "Sring") {
              //esto no se pude hacer porque en c no existen las asignaciones de strings
              ASDeclararVariableAuxiliar("Variable" + ++cont_var, tipo1);
              codigo_obj += tipo1 + " Variable" + cont_var + " ;\n";
              codigo_obj += "Variable" + cont_var + "=" + posfija.pop() + " ;\n";
            } else {
              ASDeclararVariableAuxiliar("Variable" + ++cont_var, tipo1);
              codigo_obj += tipo1 + " Variable" + cont_var + " ;\n";
              codigo_obj += "Variable" + cont_var + "=" + posfija.pop() + " ;\n";
            }
          } else {
            Analizar_Posfija();
          }
          if (
            tabla_de_variables["Variable" + cont_var].Tipo ==
            tabla_de_variables[id_asignar].Tipo
          ) {
            cod_obj_id_asigna += "Variable" + cont_var;
            if (posfija_tipos.length != 0) posfija_tipos.pop();
            if (posfija_tipos_booleanos.length != 0)
              posfija_tipos_booleanos.pop();
            if (pilaS_booleanos.length != 0) pilaS_booleanos.pop();
          } else {
            //hay error de tipos
            console.log("error en los tipos de dato");
            break;
          }
          codigo_obj += cod_obj_id_asigna;
          cod_obj_id_asigna = "";
          ban_asignacion = false;
        }

        if (ban_read) ban_read = false;
        if (ban_declaracion) ban_declaracion = false;
        //if (ban_break = !(ban_break) )  codigo_obj += codigo[i] + ' \n'
        if (ban_break) {
          ban_break = false;
        } else {
          codigo_obj += codigo[i] + " \n";
        }
      } else if (ban_asignacion && entrada != "=") {
        if (!ban_read) ArmarPosfija(codigo[i]);
        if (ban_read) {
          if (tabla_de_variables[id_asignar].Tipo == "char") {
            codigo_obj += 'scanf("%c",&' + id_asignar + ")";
          } else if (tabla_de_variables[id_asignar].Tipo == "int") {
            codigo_obj += 'scanf("%d",&' + id_asignar + ")";
          } else if (tabla_de_variables[id_asignar].Tipo == "String") {
            codigo_obj += 'scanf("%s",' + id_asignar + ")";
          }
          cod_obj_id_asigna = "";
          ban_asignacion = false;
        }
      } else if (entrada == "id") {
        //guarda la variable en la que se hara la asignacion
        if (!ban_declaracion) cod_obj_id_asigna += codigo[i] + " ";
        //no se que hace pero de aqui no se mueve
        //pone los id's a la hora de declararlos
        if (ban_declaracion) {
          if (tipo_dato_actual == "String") {
            codigo_obj += codigo[i] + "[254] ";
          } else {
            codigo_obj += codigo[i] + " ";
          }
        }
      } else {
        if (codigo[i] == ",") codigo_obj += codigo[i];
      }

      pila.push(entrada);
      pila.push(TABLA[fila][columna]);
      i++;
      // console.log('La pila tiene '+pila)
      // continue
    } else if (TABLA[fila][columna].charAt(0) == "r") {
      //Significa que se Reducirá
      //Acciones semanticas segun la produccion
      var andrea = TABLA[fila][columna];

      do {
        pila.pop();
        if (iteraciones++ >= 50000) {
          console.log("Te pasaste de v carnal");
          break;
        }
      } while (p_e[TABLA[fila][columna]] != pila[pila.length - 1]);
      if (iteraciones++ >= 50000) {
        console.log("Te pasaste de v carnal");
        break;
      }

      pila.pop();
      pila.push(p_s[TABLA[fila][columna]]);
      console.log(pila);
      fila = parseInt(
        pila[pila.length - 2].substr(1, pila[pila.length - 2].length - 1)
      ); //obtener el ultimo estado de la pila
      // console.log(fila + ' ' + columna + ' ' + pila + ' '+TABLA[fila][columna]+'Aqui hay error')
      columna = ca.indexOf(pila[pila.length - 1]);
      // console.log(fila + ' ' + columna + ' ' + pila[pila.length-1]  )
      console.log(
        "Fila:" +
          fila +
          " Columna:" +
          columna +
          " Tabla:" +
          TABLA[fila][columna]
      );
      //console.log('Pila semantica: ' + pila_semantica)
      // cadena_tabla_semantico = cadena_tabla_semantico + '<td>'+pila_semantica+'</td></tr>'
      pila.push(TABLA[fila][columna]);
      // console.log(TABLA[fila][columna])
      //console.log("===========================" + andrea)

      //Acciones semanticas dependiendo de la produccion

      if (iteraciones++ >= 50000) {
        console.log("Te pasaste de v carnal");
        break;
      }
    } else {
      break;
    }

    console.log("La pila tiene " + pila);
    console.log("El codigo tiene " + entrada);

    // if (iteraciones++ >= 500) {
    //     console.log('Te pasaste de v carnal')
    //     break
    // }

    console.log(i);
    console.log(tabla_de_variables);
    // console.log(pila_valores_dato)
  } while (i <= codigo.length);
  // console.log(pila_tipos_dato)
  console.log(pila_posfija);
  console.log(codigo_obj);
  // document.getElementById("codigoC").innerHTML = codigo_obj + "}";
  console.log(posfija_tipos);
  console.log(pilaS_booleanos);
  console.log(posfija_tipos_booleanos);
  console.log(tabla_de_variables);
  codigo_obj = codigo_obj + "}";
  

  // }
}

function A_L(ent) {
  let tdd = tipos_dato.indexOf(ent); //revisar palabras clave
  console.log("Entro con " + ent);

  if (palab_clave.indexOf(ent) != -1) {
    //muchas mas cosas depende de lo que le llegue
    if (ent == "if") ban_if = true;
    if (ent == "else") ban_else = true;
    if (ent == "while") ban_while = true;
    if (ent == "do") ban_do = true;
    if (ent == "switch") ban_stich = true;
    if (ent == "case") ban_case = true;
    if (ent == "default") ban_default = true;
    if (ent == "break") ban_break = true;
    if (ent == "print") ban_print = true;
    if (ent == "input") ban_read = true;
    return ent;
  } else if (tdd != -1) {
    tipo_dato_actual = ent;
    ban_declaracion = true;
    return ent;
  } else {
    //si la entrada corresponde con un ';' entonces se limpian ciertas variables
    ////puede ser innecesario este paso pero alv
    if (terminador /*;*/ == ent) {
      tipo_dato_actual = "";

      return ent;
    } else if (retornar_igual.indexOf(ent) != -1) {
      return ent;
    } else if (asignacion == ent) {
      ban_asignacion = true;
      console.log("Asigno correctamente");
      //asignado = ent
      // console.log('estas pendejo mijo ')
      //ban_pos_asignacion = true
      id_asignar = T1;
      return ent;
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
      return ent;
    } else if (
      RegEx_Variable.test(ent) &&
      !RegEx_Numero_Int.test(ent) &&
      boelanos.indexOf(ent) == -1 &&
      !RegEx_Palabra.test(ent)
    ) {
      if (tipo_dato_actual != "") {
        //si hay un tipo de dato actual se declara la variable
        console.log(typeof tabla_de_variables[ent]);
        if (typeof tabla_de_variables[ent] !== "object") {
          if (tipo_dato_actual == "String") {
            ASDeclararVariable(ent);
          } else {
            ASDeclararVariable(ent);
          }
          console.log(tabla_de_variables);
        } else {
          if (tabla_de_variables[ent].Tipo != tipo_dato_actual) {
            return "error";
          } else {
            //variable declarada correctamente pero analizada de nuevo
          }
        }
        //si no hay un tipo de dato actual se piensa que se va a analizar la variable
      } else {
        if (ban_asignacion) {
          //se hace solo una vez para tener guardado el valor del id en el que se va
          //a guardar el valor
        } else {
          // T1 = tabla_de_variables[ent].Tipo
          T1 = ent;
          // if (ban_pos_asignacion) pila_valores_dato.push(tabla_de_variables[T1].Valor)
          // if(ban_asignacion) pila_tipos_dato.push(tabla_de_variables[T1].Tipo)
        }
      }
      return "id";
    } else if (RegEx_Numero_Int.test(ent)) {
      //si es una asignacion le asigna el valor a la variable
      console.log("SAHDKJASHDKJHSADH" + ent);
      // pila_valores_dato.push(ent)
      // pila_tipos_dato.push('num')
      return "num";
    } else if (RegEx_Palabra.test(ent)) {
      //si es una asignacion le asigna el valor a la variable
      console.log("SAHDKJASHDKJHSADH" + ent);
      // pila_valores_dato.push(ent)
      // pila_tipos_dato.push('num')
      return "palabra";
    } else if (RegEx_Char.test(ent)) {
      //si es una asignacion le asigna el valor a la variable
      console.log("SAHDKJASHDKJHSADH" + ent);
      // pila_valores_dato.push(ent)
      // pila_tipos_dato.push('num')
      return "caracter";
    } else if (boelanos.indexOf(ent) != -1) {
      // pila_valores_dato.push((ent == 'true'))
      // pila_tipos_dato.push('bool')
      return ent;
    } else {
      //// eres joto();
      console.log("SAHDKJASHDKJHSADH" + ent);
    }
  }
  console.log("SAHDKJASHDKJHSADH" + ent);
  return ent;
}

function ASDeclararVariable(ent) {
  tabla_de_variables[ent] = {
    Nombre: ent,
    Tipo: tipo_dato_actual,
    Token: "id",
    Valor: valores[tipo_dato_actual],
  };
}

function ASDeclararVariableAuxiliar(ent, tdd) {
  tabla_de_variables[ent] = {
    Nombre: ent,
    Tipo: tdd,
    Token: "id",
    Valor: valores[tdd],
  };
}

function Analizar_Posfija() {
  posfija.reverse();
  posfija_tipos.reverse();
  console.log(posfija_tipos);
  while (typeof posfija[0] !== "undefined") {
    if (operacion.indexOf(posfija[posfija.length - 1]) != -1) {
      var1 = pilaS.pop();
      var2 = pilaS.pop();

      tipo1 = posfija_tipos.pop();
      tipo2 = posfija_tipos.pop();
      // posfija.pop()

      if (
        (tipo1 == "int" || tipo1 == "float") &&
        (tipo2 == "int" || tipo2 == "float")
      ) {
        if (tipo1 == tipo2) {
          posfija_tipos.push(tipo1);
          pilaS.push(" Variable" + ++cont_var);
          ASDeclararVariableAuxiliar(pilaS[pilaS.length - 1].trim(), tipo1);
          codigo_obj +=
            tipo1 +
            pilaS[pilaS.length - 1] +
            " = " +
            var2 +
            " " +
            posfija.pop() +
            " " +
            var1 +
            ";\n";
        } else {
          pilaS.push("float");
          ASDeclararVariableAuxiliar(pilaS[pilaS.length - 1].trim(), "float");
        }
      } else {
        //error
        console.log("los tipos de dato no coinciden");
        break;
      }
    } else if (comp_num_id.indexOf(posfija[posfija.length - 1]) != -1) {
      var1 = pilaS.pop();
      var2 = pilaS.pop();
      console.log(pilaS);
      console.log(var1 + " " + var2);
      tipo1 = posfija_tipos.pop();
      tipo2 = posfija_tipos.pop();
      // posfija.pop()
      console.log(posfija_tipos);
      console.log(tipo1 + " " + tipo2);
      if (
        (tipo1 == "int" || tipo1 == "float") &&
        (tipo2 == "int" || tipo2 == "float")
      ) {
        posfija_tipos_booleanos.push("bool");
        pilaS_booleanos.push(" Variable" + ++cont_var);
        ASDeclararVariableAuxiliar(
          pilaS_booleanos[pilaS_booleanos.length - 1].trim(),
          "bool"
        );
        codigo_obj +=
          "bool" +
          pilaS_booleanos[pilaS_booleanos.length - 1] +
          " = " +
          var2 +
          " " +
          posfija.pop() +
          " " +
          var1 +
          ";\n";
        // else {
        //     pilaS.push("float")
        // }
      } else {
        //error
        console.log("los tipos de dato no coinciden");
        break;
      }
    } else if (comp_bool.indexOf(posfija[posfija.length - 1]) != -1) {
      var1 = pilaS_booleanos.pop();
      var2 = pilaS_booleanos.pop();

      tipo1 = posfija_tipos_booleanos.pop();
      tipo2 = posfija_tipos_booleanos.pop();
      // posfija.pop()

      if (
        (tipo1 == "bool" || boelanos.indexOf(tipo1) != -1) &&
        (tipo2 == "bool" || boelanos.indexOf(tipo2) != -1)
      ) {
        posfija_tipos_booleanos.push("bool");
        pilaS_booleanos.push(" Variable" + ++cont_var);
        ASDeclararVariableAuxiliar(
          pilaS_booleanos[pilaS_booleanos.length - 1].trim(),
          "bool"
        );
        codigo_obj +=
          "bool" +
          pilaS_booleanos[pilaS_booleanos.length - 1] +
          " = " +
          var2 +
          " " +
          posfija.pop() +
          " " +
          var1 +
          ";\n";

        // else {
        //     pilaS.push("float")
        // }
      } else {
        //error
        console.log(
          "los tipos de dato no coinciden" +
            posfija[posfija.length - 1] +
            tipo1 +
            " " +
            tipo2
        );
        break;
      }
    }
    //else if (posfija.length == 1) {}
    else {
      if (boelanos.indexOf(posfija[posfija.length - 1]) != -1)
        pilaS_booleanos.push(posfija.pop());
      else pilaS.push(posfija.pop());
    }
  }
  console.log(posfija);
  console.log(posfija_tipos);
  console.log(id_asignar);
  console.log(pilaS);
}

function ArmarPosfija(ent) {
  console.log("======================================");
  console.log("Armar Posfija = " + ent);
  if (ent == "(" || ent == "[") {
    pila_posfija.push(ent);
  } else if (RegEx_Numero_Int.test(ent)) {
    posfija.push(ent);
    posfija_tipos.push("int");
  }
  // else if (RegEx_Palabra.test(ent)) {
  //     posfija.push(ent);
  //     posfija_tipos.push('String')
  // }
  else if (RegEx_Char.test(ent)) {
    posfija.push(ent);
    posfija_tipos.push("char");
  } else if (boelanos.indexOf(ent) != -1) {
    posfija.push(ent);
    posfija_tipos_booleanos.push("bool");
  } else if (typeof tabla_de_variables[ent] !== "undefined") {
    posfija.push(tabla_de_variables[ent].Nombre);
    posfija_tipos.push(tabla_de_variables[ent].Tipo);
  } else if (operacion.indexOf(ent) != -1) {
    if (ope_may_pri.indexOf(ent) != -1) {
      while (ope_may_pri.indexOf(pila_posfija[pila_posfija.length - 1]) != -1) {
        posfija.push(pila_posfija.pop());
      }
      pila_posfija.push(ent);
    } else if (ope_men_pri.indexOf(ent) != -1) {
      while (operacion.indexOf(pila_posfija[pila_posfija.length - 1]) != -1) {
        posfija.push(pila_posfija.pop());
      }
      pila_posfija.push(ent);
    } else console.log("Error Semantico");
  } else if (operacion_bool.indexOf(ent) != -1) {
    if (comp_bool.indexOf(ent) != -1) {
      while (comp_bool.indexOf(pila_posfija[pila_posfija.length - 1]) != -1) {
        posfija.push(pila_posfija.pop());
      }
      pila_posfija.push(ent);
    } else if (comp_num_id.indexOf(ent) != -1) {
      while (
        operacion_bool.indexOf(pila_posfija[pila_posfija.length - 1]) != -1
      ) {
        posfija.push(pila_posfija.pop());
      }
      pila_posfija.push(ent);
    } else console.log("Error Semantico");
  } else if (ent == ")" || ent == "]") {
    if (ent == ")")
      while (pila_posfija[pila_posfija.length - 1] != "(") {
        posfija.push(pila_posfija.pop());
      }

    if (ent == "]")
      while (pila_posfija[pila_posfija.length - 1] != "[") {
        posfija.push(pila_posfija.pop());
      }

    pila_posfija.pop();
  } else if (ent == ";" || ent == "{") {
    while (typeof pila_posfija[0] !== "undefined") {
      posfija.push(pila_posfija.pop());
    }
  }
  console.log(pila_posfija);
  console.log(posfija);
  console.log("======================================");
}
// };
