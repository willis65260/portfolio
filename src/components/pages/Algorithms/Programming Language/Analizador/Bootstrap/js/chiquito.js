import {
    p_e,
    p_s,
    T,
    c,
    f,
    valores
} from "./A_LSS_VAR.js";
var codigo = document.getElementById("codigo").value;
codigo = (codigo = codigo.replace(/\s/g, "")).split(/(['][']|[']\w[']|['].[']|["]\w*.*\w*["]|[0-9]+|<=|>=|!=|[|][|]|[&][&]|<|>|switch|else|if|case|break|default|do|for|while|Fin|print|input|int|float|char|String|bool|palabra|caracter|num|id|true|false|.)/).filter(Boolean), console.log(codigo.length), codigo.push("$"), console.log(codigo);
var fa, ca, asignacion = "=",
    terminador = ";",
    terminador_cmp = ":",
    tipos_dato = ["String", "char", "int", "float", "bool"],
    retornar_igual = [":", ",", "{", "}", "$"],
    operacion = ["+", "-", "*", "/"],
    ope_men_pri = ["+", "-"],
    ope_may_pri = ["*", "/"],
    operacion_bool = ["<", ">", "<=", ">=", "!=", "||", "&&"],
    comp_num_id = ["<", ">", "<=", ">="],
    comp_bool = ["!=", "||", "&&"],
    boelanos = ["true", "false"],
    palab_clave = ["if", "switch", "do", "while", "for", "break", "else", "print", "read", "case", "default", "input", "Fin"],
    ciclos_repe_selec = ["if", "switch", "do", "while"],
    RegEx_Char = /(['][']|[']\w[']|['].['])/,
    RegEx_Palabra = /(["]\w*.*\w*["])/,
    RegEx_Variable = /(\w)/,
    RegEx_Numero_Int = new RegExp("^\\d+$"),
    RegEx_Numero_Float = new RegExp("^-?d+.?d*$|^d*.?d+$"),
    ban_asignacion = !1,
    ban_declaracion = !1,
    ban_if = !1,
    ban_else = !1,
    ban_while = !1,
    ban_do = !1,
    ban_stich = !1,
    ban_case = !1,
    ban_default = !1,
    ban_break = !1,
    ban_print = !1,
    ban_read = !1,
    etiuno = "",
    etidos = "",
    tipo_dato_actual = "",
    T1 = "",
    T2 = "",
    id_asignar = "",
    aux_eti = "",
    cadena_tabla = "",
    tabla_de_variables = [],
    pila_semantica = [],
    TABLA = [],
    pila_posfija = [],
    posfija = [],
    posfija_tipos = [],
    posfija_tipos_booleanos = [],
    pilaS = [],
    pilaS_booleanos = [],
    var1 = "",
    var2 = "",
    tipo1 = "",
    tipo2 = "",
    pila_etiquetas = [],
    etiqueta_else = [],
    pila_switch = [],
    pila_fin_switch = [],
    cont_var = 0,
    cont_etiq = 0,
    cod_obj_id_asigna = "",
    codigo_obj = "#include <stdio.h>\n#include <stdbool.h> \nint main() { \n";

function setup() {
    InicializarTabla(), Analizar()
}

function InicializarTabla() {
    cadena_tabla += '<table class="table table-hover"><thead><tr class="table-info"><td>estado</td>', c.split("\t").map(o => {
        cadena_tabla = cadena_tabla + '<th scope="col">' + o + "</th>"
    }), cadena_tabla += "</tr></thead>";
    let o = 0;
    f.split("\t").map(a => {
        cadena_tabla = cadena_tabla + '<tr class="table-active"><td>' + a + "</td>", T[o].split("\t").map(o => {
            cadena_tabla = cadena_tabla + "<td>" + o + "</td>"
        }), o++, cadena_tabla += "</tr>"
    }), cadena_tabla += "</table>", document.getElementById("Tabla5").innerHTML = cadena_tabla, ca = c.split("\t"), fa = f.split("\t"), console.log(ca.indexOf("int")), T.map(o => {
        TABLA.push(o.split("\t"))
    })
}

function Analizar() {
    var o = ["s0"],
        a = "",
        i = 0;
    let e = 0;
    do {
        if ("error" == (a = A_L(codigo[i]))) break;
        var l = fa.indexOf(o[o.length - 1]),
            p = ca.indexOf(a);
        if ("$" == a && "acc" == TABLA[l][p]) {
            console.log("Todo correcto");
            break
        }
        if (console.log("Codigo " + codigo[i] + " Fila:" + l + " Columna:" + p + " Tabla:" + TABLA[l][p] + " Entrada:" + a), "s" == TABLA[l][p].charAt(0)) {
            if (-1 != tipos_dato.indexOf(codigo[i])) "String" == codigo[i] ? codigo_obj += "char " : codigo_obj += codigo[i] + " ";
            else if (ban_print) codigo_obj += "print" == a ? "printf" : codigo[i], a == terminador && (codigo_obj += "\n", ban_print = !1);
            else if (ban_default) pila_etiquetas.push("goto " + pila_etiquetas[pila_etiquetas.length - 1]), ban_default = !1;
            else if (ban_case) ArmarPosfija(codigo[i]), "{" == codigo[i] && (tipo1 = posfija_tipos.pop(), etiuno = "etiq" + ++cont_etiq, codigo_obj += "if( !( " + pila_switch[pila_switch.length - 1] + " == " + posfija.pop() + " ) ) \ngoto " + etiuno + " ;\n", pila_etiquetas.push("goto " + pila_etiquetas[pila_etiquetas.length - 1] + etiuno + " : ; \n"), ban_case = !1);
            else if (ban_stich) ArmarPosfija(codigo[i]), "{" == codigo[i] && (tipo1 = posfija_tipos.pop(), ASDeclararVariableAuxiliar("Var" + ++cont_var, tipo1), codigo_obj += tipo1 + " Var" + cont_var + " ;\n", codigo_obj += "Var" + cont_var + " = " + posfija.pop() + " ;\n", pila_switch.push("Var" + cont_var), pila_etiquetas.push("etiq" + ++cont_etiq + ":;\n"), ban_stich = !1);
            else if (ban_do) "{" == codigo[i] && (etiuno = "etiq" + ++cont_etiq, codigo_obj += etiuno + ":;\n", pila_etiquetas.push(etiuno + ";\n"), pila_etiquetas.push(""), ban_do = !1);
            else if (ban_while) ArmarPosfija(codigo[i]), "{" == codigo[i] ? (etiuno = "etiq" + ++cont_etiq, etidos = "etiq" + ++cont_etiq, codigo_obj += etidos + ":;\n", 1 == posfija.length ? (void 0 === (tipo1 = posfija_tipos.pop()) && (tipo1 = posfija_tipos_booleanos.pop()), ASDeclararVariableAuxiliar("Var" + ++cont_var, tipo1), codigo_obj += tipo1 + " Var" + cont_var + " ;\n", codigo_obj += "Var" + cont_var + "=" + posfija.pop() + " ;\n") : Analizar_Posfija(), "bool" != posfija_tipos_booleanos.pop() ? console.log("error") : (etiqueta_else.push("Var" + cont_var), codigo_obj += "if( !( Var" + cont_var + " ) ) \ngoto " + etiuno + ";\n"), pila_etiquetas.push("goto " + etidos + ";\n" + etiuno + ":\n"), ban_while = !1) : ";" == codigo[i] && (Analizar_Posfija(), "bool" != posfija_tipos_booleanos.pop() ? console.log("error") : (codigo_obj += "if( !( Var" + cont_var + " ) ) \ngoto ", codigo_obj += pila_etiquetas.pop()), ban_while = !1);
            else if (ban_else) "{" == codigo[i] && (etiuno = "etiq" + ++cont_etiq, pila_etiquetas.push(etiuno + ":;\n"), codigo_obj += "if( ( " + etiqueta_else.pop() + " ) ) \ngoto " + etiuno + ";\n", ban_else = !1);
            else if (ban_if) ArmarPosfija(codigo[i]), console.log(posfija), "{" == codigo[i] && (1 == posfija.length ? (void 0 === (tipo1 = posfija_tipos.pop()) && (tipo1 = posfija_tipos_booleanos.pop()), ASDeclararVariableAuxiliar("Var" + ++cont_var, tipo1), codigo_obj += tipo1 + " Var" + cont_var + " ;\n", codigo_obj += "Var" + cont_var + "=" + posfija.pop() + " ;\n") : Analizar_Posfija(), "bool" != tipo1 ? console.log("error") : (etiuno = "etiq" + ++cont_etiq, pila_etiquetas.push(etiuno + ": ;\n"), etiqueta_else.push("Var" + cont_var), codigo_obj += "if( !( Var" + cont_var + " ) ) \ngoto " + etiuno + ";\n"), ban_if = !1);
            else if ("}" == codigo[i]) codigo_obj += pila_etiquetas.pop();
            else if ("=" == a) cod_obj_id_asigna += codigo[i] + " ";
            else if (";" == codigo[i]) {
                if (ban_asignacion) {
                    if (ArmarPosfija(codigo[i]), 1 == posfija.length ? (void 0 === (tipo1 = posfija_tipos.pop()) && (tipo1 = posfija_tipos_booleanos.pop()), ASDeclararVariableAuxiliar("Var" + ++cont_var, tipo1), codigo_obj += tipo1 + " Var" + cont_var + " ;\n", codigo_obj += "Var" + cont_var + "=" + posfija.pop() + " ;\n") : Analizar_Posfija(), tabla_de_variables["Var" + cont_var].Tipo != tabla_de_variables[id_asignar].Tipo) {
                        console.log("error en los tipos de dato");
                        break
                    }
                    cod_obj_id_asigna += "Var" + cont_var, 0 != posfija_tipos.length && posfija_tipos.pop(), 0 != posfija_tipos_booleanos.length && posfija_tipos_booleanos.pop(), codigo_obj += cod_obj_id_asigna, cod_obj_id_asigna = "", ban_asignacion = !1
                }
                ban_declaracion && (ban_declaracion = !1), ban_break ? ban_break = !1 : codigo_obj += codigo[i] + " \n"
            } else ban_asignacion && "=" != a ? (ban_read || ArmarPosfija(codigo[i]), ban_read && ("char" == tabla_de_variables[id_asignar].Tipo ? codigo_obj += 'scanf("%c",&' + id_asignar + ")" : "int" == tabla_de_variables[id_asignar].Tipo ? codigo_obj += 'scanf("%d",&' + id_asignar + ")" : "String" == tabla_de_variables[id_asignar].Tipo && (codigo_obj += 'scanf("%s",' + id_asignar + ")"), ban_asignacion = !1)) : "id" == a ? (ban_declaracion || (cod_obj_id_asigna += codigo[i] + " "), ban_declaracion && (codigo_obj += "String" == tipo_dato_actual ? codigo[i] + "[254] " : codigo[i] + " ")) : "," == codigo[i] && (codigo_obj += codigo[i]);
            o.push(a), o.push(TABLA[l][p]), i++
        } else {
            if ("r" != TABLA[l][p].charAt(0)) break;
            TABLA[l][p];
            do {
                if (o.pop(), e++ >= 5e3) {
                    console.log("Te pasaste de v carnal");
                    break
                }
            } while (p_e[TABLA[l][p]] != o[o.length - 1]);
            if (e++ >= 5e3) {
                console.log("Te pasaste de v carnal");
                break
            }
            if (o.pop(), o.push(p_s[TABLA[l][p]]), console.log(o), l = parseInt(o[o.length - 2].substr(1, o[o.length - 2].length - 1)), p = ca.indexOf(o[o.length - 1]), console.log("Fila:" + l + " Columna:" + p + " Tabla:" + TABLA[l][p]), o.push(TABLA[l][p]), e++ >= 5e3) {
                console.log("Te pasaste de v carnal");
                break
            }
        }
        console.log("La pila tiene " + o), console.log("El codigo tiene " + a), console.log(i), console.log(tabla_de_variables)
    } while (i <= codigo.length);
    console.log(pila_posfija), console.log(codigo_obj), console.log(posfija_tipos), console.log(posfija_tipos_booleanos), console.log(tabla_de_variables)
}

function A_L(o) {
    let a = tipos_dato.indexOf(o);
    if (console.log("Entro con " + o), -1 != palab_clave.indexOf(o)) return "if" == o && (ban_if = !0), "else" == o && (ban_else = !0), "while" == o && (ban_while = !0), "do" == o && (ban_do = !0), "switch" == o && (ban_stich = !0), "case" == o && (ban_case = !0), "default" == o && (ban_default = !0), "break" == o && (ban_break = !0), "print" == o && (ban_print = !0), "input" == o && (ban_read = !0), o;
    if (-1 != a) return tipo_dato_actual = o, ban_declaracion = !0, o;
    if (terminador == o) return tipo_dato_actual = "", o;
    if (-1 != retornar_igual.indexOf(o)) return o;
    if (asignacion == o) return ban_asignacion = !0, console.log("Asigno correctamente"), id_asignar = T1, o;
    if (-1 != operacion.indexOf(o)) return o;
    if (RegEx_Variable.test(o) && !RegEx_Numero_Int.test(o) && -1 == boelanos.indexOf(o)) {
        if ("" != tipo_dato_actual) {
            if (console.log(typeof tabla_de_variables[o]), "object" != typeof tabla_de_variables[o]) ASDeclararVariable(o), console.log(tabla_de_variables);
            else if (tabla_de_variables[o].Tipo != tipo_dato_actual) return "error"
        } else ban_asignacion || (T1 = o);
        return "id"
    }
    return RegEx_Numero_Int.test(o) ? (console.log("SAHDKJASHDKJHSADH" + o), "num") : RegEx_Palabra.test(o) ? (console.log("SAHDKJASHDKJHSADH" + o), "palabra") : RegEx_Char.test(o) ? (console.log("SAHDKJASHDKJHSADH" + o), "caracter") : -1 != boelanos.indexOf(o) ? o : (console.log("SAHDKJASHDKJHSADH" + o), console.log("SAHDKJASHDKJHSADH" + o), o)
}

function ASDeclararVariable(o) {
    tabla_de_variables[o] = {
        Nombre: o,
        Tipo: tipo_dato_actual,
        Token: "id",
        Valor: valores[tipo_dato_actual]
    }
}

function ASDeclararVariableAuxiliar(o, a) {
    tabla_de_variables[o] = {
        Nombre: o,
        Tipo: a,
        Token: "id",
        Valor: valores[a]
    }
}

function Analizar_Posfija() {
    for (posfija.reverse(), posfija_tipos.reverse(), console.log(posfija_tipos); void 0 !== posfija[0];)
        if (-1 != operacion.indexOf(posfija[posfija.length - 1])) {
            if (var1 = pilaS.pop(), var2 = pilaS.pop(), tipo1 = posfija_tipos.pop(), tipo2 = posfija_tipos.pop(), "int" != tipo1 && "float" != tipo1 || "int" != tipo2 && "float" != tipo2) {
                console.log("los tipos de dato no coinciden");
                break
            }
            tipo1 == tipo2 ? (posfija_tipos.push(tipo1), pilaS.push(" Var" + ++cont_var), ASDeclararVariableAuxiliar(pilaS[pilaS.length - 1].trim(), tipo1), codigo_obj += tipo1 + pilaS[pilaS.length - 1] + " = " + var2 + " " + posfija.pop() + " " + var1 + ";\n") : (pilaS.push("float"), ASDeclararVariableAuxiliar(pilaS[pilaS.length - 1].trim(), "float"))
        } else if (-1 != comp_num_id.indexOf(posfija[posfija.length - 1])) {
        if (var1 = pilaS.pop(), var2 = pilaS.pop(), console.log(pilaS), console.log(var1 + " " + var2), tipo1 = posfija_tipos.pop(), tipo2 = posfija_tipos.pop(), console.log(posfija_tipos), console.log(tipo1 + " " + tipo2), "int" != tipo1 && "float" != tipo1 || "int" != tipo2 && "float" != tipo2) {
            console.log("los tipos de dato no coinciden");
            break
        }
        posfija_tipos_booleanos.push("bool"), pilaS_booleanos.push(" Var" + ++cont_var), ASDeclararVariableAuxiliar(pilaS_booleanos[pilaS_booleanos.length - 1].trim(), "bool"), codigo_obj += "bool" + pilaS_booleanos[pilaS_booleanos.length - 1] + " = " + var2 + " " + posfija.pop() + " " + var1 + ";\n"
    } else if (-1 != comp_bool.indexOf(posfija[posfija.length - 1])) {
        if (var1 = pilaS_booleanos.pop(), var2 = pilaS_booleanos.pop(), tipo1 = posfija_tipos_booleanos.pop(), tipo2 = posfija_tipos_booleanos.pop(), "bool" != tipo1 && -1 == boelanos.indexOf(tipo1) || "bool" != tipo2 && -1 == boelanos.indexOf(tipo2)) {
            console.log("los tipos de dato no coinciden" + posfija[posfija.length - 1] + tipo1 + " " + tipo2);
            break
        }
        posfija_tipos_booleanos.push("bool"), pilaS_booleanos.push(" Var" + ++cont_var), ASDeclararVariableAuxiliar(pilaS_booleanos[pilaS_booleanos.length - 1].trim(), "bool"), codigo_obj += "bool" + pilaS_booleanos[pilaS_booleanos.length - 1] + " = " + var2 + " " + posfija.pop() + " " + var1 + ";\n"
    } else pilaS.push(posfija.pop());
    console.log(posfija), console.log(posfija_tipos), console.log(id_asignar), console.log(pilaS)
}

function ArmarPosfija(o) {
    if (console.log("======================================"), console.log("Armar Posfija = " + o), "(" == o || "[" == o) pila_posfija.push(o);
    else if (RegEx_Numero_Int.test(o)) posfija.push(o), posfija_tipos.push("int");
    else if (RegEx_Char.test(o)) posfija.push(o), posfija_tipos.push("char");
    else if (-1 != boelanos.indexOf(o)) posfija.push(o), posfija_tipos_booleanos.push("bool");
    else if (void 0 !== tabla_de_variables[o]) posfija.push(tabla_de_variables[o].Nombre), posfija_tipos.push(tabla_de_variables[o].Tipo);
    else if (-1 != operacion.indexOf(o))
        if (-1 != ope_may_pri.indexOf(o)) {
            for (; - 1 != ope_may_pri.indexOf(pila_posfija[pila_posfija.length - 1]);) posfija.push(pila_posfija.pop());
            pila_posfija.push(o)
        } else if (-1 != ope_men_pri.indexOf(o)) {
        for (; - 1 != operacion.indexOf(pila_posfija[pila_posfija.length - 1]);) posfija.push(pila_posfija.pop());
        pila_posfija.push(o)
    } else console.log("Error Semantico");
    else if (-1 != operacion_bool.indexOf(o))
        if (-1 != comp_bool.indexOf(o)) {
            for (; - 1 != comp_bool.indexOf(pila_posfija[pila_posfija.length - 1]);) posfija.push(pila_posfija.pop());
            pila_posfija.push(o)
        } else if (-1 != comp_num_id.indexOf(o)) {
        for (; - 1 != operacion_bool.indexOf(pila_posfija[pila_posfija.length - 1]);) posfija.push(pila_posfija.pop());
        pila_posfija.push(o)
    } else console.log("Error Semantico");
    else if (")" == o || "]" == o) {
        if (")" == o)
            for (;
                "(" != pila_posfija[pila_posfija.length - 1];) posfija.push(pila_posfija.pop());
        if ("]" == o)
            for (;
                "[" != pila_posfija[pila_posfija.length - 1];) posfija.push(pila_posfija.pop());
        pila_posfija.pop()
    } else if (";" == o || "{" == o)
        for (; void 0 !== pila_posfija[0];) posfija.push(pila_posfija.pop());
    console.log(pila_posfija), console.log(posfija), console.log("======================================")
}

setup();