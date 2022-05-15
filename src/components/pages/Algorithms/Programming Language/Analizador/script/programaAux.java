

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;
import java.util.Vector;

public class programaAux {
	public String cadena;
	String[] cadenaS; //variable utilizada para separar el codigo a analaizar
	String ExpCh = "/([']['])/";
	String ExpPa = "[\"][^\"]*[\"]";
	String ExpVa = "\\w";
	String ExpNu = "(^\\d+)";
	String Ident = "[A-z][A-z]*[0-9]*[A-z]*";
	int ContV = 0;
	int EtiqCont = 0;
	Boolean BanAsig = false;
	Boolean BanDec = false;
	Boolean BanIf = false;
	Boolean BanDo = false;
	Boolean BanWh = false;
	Boolean BanPrint = false;
	Boolean BanRead = false;
	String Terminador = ";";
	String AsignaCauxon = "=";
	String[] Operandos = { "+", "-", "*", "/" };
	String TipDat[] = { "Char", "Int", "Float"};
	String IgualRet[] = { ":", ",", "{", "}", "(", ")", "[", "]", "$" };
	String BoolOper[] = { "<", ">", "<=", ">=", "!=", "==" };
	String Comparadores[] = { "<", ">", "<=", ">=" };
	String PalClave[] = { "IF", "DO", "WHILE", "PRINT", "END", "BEGIN", "SCAN" };
	String CodObj = "#include <stdio.h>\\n#include <stdbool.h> \nint main() { \n";
	String CodObj_Asig = "";
	String Etiqueta1 = "";
	String Etiqueta2 = "";
	String CComp = "";
	Stack<String> PSintactica = new Stack<String>();							
	Stack<String> PSemantica = new Stack<String>();
	Stack<String> PEtiq = new Stack<String>();
	Map<String, Variables> Dicc = new HashMap<>(); //Donde estaran las variables de la cadena  
	Map<String, String> ProduSac = new HashMap<>(); //Se guardan los caracteres a eliminar
	Map<String, String> ProduRem = new HashMap<>(); //El que se utiliza para ingresar los elementos
	Stack<String> PilaPos = new Stack<String>();
	Stack<String> PosFija = new Stack<String>();
	Stack<String> PilaExt = new Stack<String>();
	Stack<String> PosFijaT = new Stack<String>();
	Stack<String> PilaExtB = new Stack<String>();
	Stack<String> PilaFijaTB = new Stack<String>();
	Stack<String> PosFijaAux;
	Stack<String> PosFijaAuxT;
	String OperandosP[] = { "*", "/" };
	String OperandosM[] = { "-", "+" };
	String Var1, Var2, Tipo1, Tipo2;
	Vector<String[]> TablaBuena = new Vector<String[]>();
	String Caux = "Id	Int	Float	Char	,	;	+	-	*	/	(	)	=	==	< 	<=	>	>=	¡=	{	}	“	Mensaje	Num	PRINT	SCAN	BEGIN	IF	DO	WHILE	END	ENDIF	THEN	$	S	B	P	V	PD	M	E	T	F	C";
	String Faux = "I0	I1	I2	I3	I4	I5	I6	I7	I8	I9	I10	I11	I12	I13	I14	I15	I16	I17	I18	I19	I20	I21	I22	I23	I24	I25	I26	I27	I28	I29	I30	I31	I32	I33	I34	I35	I36	I37	I38	I39	I40	I41	I42	I43	I44	I45	I46	I47	I48	I49	I50	I51	I52	I53	I54	I55	I56	I57	I58	I59	I60	I61	I62	I63	I64	I65	I66	I67	I68	I69	I70	I71	I72	I73	I74	I75	I76	I77	I78	I79	I80	I81	I82	I83	I84	I85	I86	I87	I88	I89	I90	I91	I92	I93	I94	I95	I96	I97	I98	I99	I100	I101	I102	I103	I104";
	String[] Columnas;
	String[] Filas;
	String TablaAux[] = {
			"																										I1																	",
			"I7	I3	I4	I5																					I8	I9		I10	I11		I12					I2			I6					",
			"																																	P2										",
			"I13																																											",
			"I14																																											",
			"I15																																											",
			"																																	P6										",
			"												I16																															",
			"I19																					I18																		I17				",
			"I20																																											",
			"										I21																																	",
			"																			I22																								",
			"																																	P14										",
			"				I24	I25																																I23						",
			"				124	I25																																I26						",
			"				I24	I25																																I27						",
			"I32										I31													I33																	I28	I29	I30	",
			"I7																								I8	I9		I10	I11		I12								I34					",
			"																						I35																					",
			"P22																				P22				P22	P22		P22	P22	P22	P22													",
			"I7																								I8	I9		I10	I11		I12								I36					",
			"I37																																											",
			"I56																				I61				I57	I58		I59	I60								I38							",
			"																																	P3										",
			"I39																																											",
			"I7	I3	I4	I5																					I8	I9		I10	I11		I12					I40			I6					",
			"																																	P4										",
			"																																	P5										",
			"					I41	I42	I43																																				",
			"					P25	P25	P25	I44	I45		P25																																",
			"					P28	P28	P28	P28	P28		P28																																",
			"I32										I31													I33																	I46	I29	I30	",
			"					P30	P30	P30	P30	P30		P30																																",
			"					P31	P31	P31	P31	P31		P31																																",
			"																																	P10										",
			"																					I47																						",
			"																																	P11										",
			"													I49	I50	I51	I52	I53	I54																									I48",
			"																													I55														",
			"				I24	I25																																I62						",
			"																																	P8										",
			"I7																								I8	I9		I10	I11		I12								I63					",
			"I32										I31													I33																		I64	I30	",
			"																																									I65	I30	",
			"I32										I31													I33																			I66	",
			"I32										I31													I33																			I67	",
			"											I68																																",
			"P21																				P21				P21	P21		P21	P21	P21	P21													",
			"I69																																											",
			"P32																																											",
			"P33																																											",
			"P34																																											",
			"P35																																											",
			"P36																																											",
			"P37																																											",
			"										I98																																	",
			"												I70																															",
			"I19																					I18																		I71				",
			"I72																																											",
			"										I73																																	",
			"																			I74																								",
			"P20																								P20	P20		P20	P20	P20	P20													",
			"																																	P7										",
			"																																	P9										",
			"					P23	P23	P23	I44	I45		P23																																",
			"					P24	P24	P24	I44	I45		P24																																",
			"					P26	P26	P26	P26	P26		P26																																",
			"					P27	P27	P27	P27	P27		P27																																",
			"					P29	P29	P29	P29	P29		P29																																",
			"											I75																																",
			"I32											I31												I33																	I76	I29	I30	",
			"I56																				I61				I57	I58		I59	I60								I77							",
			"I56																				I61				I57	I58		I59	I60								I78							",
			"I79																																											",
			"I56																				I61				I57	I58		I59	I60								I80							",
			"																			I81																								",
			"					I82	I42	I43																																				",
			"P16																								P16	P16		P16	P16	P16	P16													",
			"P17																								P17	P17		P17	P17	P17	P17													",
			"													I49	I50	I51	I52	I53	I54																									I83",
			"																													I84														",
			"I56																				I61				I57	I58		I59	I60								I85							",
			"I56																				I61				I57	I58		I59	I60								I86							",
			"I87																																											",
			"										I88																																	",
			"I7																								I8	I9		I10	I11		I12								I89					",
			"P15																								P15	P15		P15	P15	P15	P15													",
			"											I90																																",
			"I91																																											",
			"																																	P12										",
			"																			I92																								",
			"													I49	I50	I51	I52	I53	I54																									I93",
			"I56																				I61				I57	I58		I59	I60								I94							",
			"I95																																											",
			"P18																								P18	P18		P18	P18	P18	P18													",
			"											I96																																",
			"					I97																																						",
			"P19																								P19	P19		P19	P19	P19	P19													",
			"I99																																											",
			"													I49	I50	I51	I52	I53	I54																									I100",
			"I101																																											",
			"											I102																																",
			"					I103																																						",
			"I7																								I8	I9		I10	I11		I12								I104					",
			"																																	P13										", };


	public programaAux() {
		Filas = Faux.split("	");
		Columnas = Caux.split("	");
		System.out.println(Faux);
		cadena = "BEGIN Int a , c ; c = 5 + 0 ; SCAN a DO { PRINT c c = c + a ; } WHILE ( a > c ) ; IF ( a == c ) { PRINT \"iguales\" } END $";	
		System.out.println(cadena);
	}
	
	public void producCauxones() {
		ProduRem.put("P1", "S’");
		ProduRem.put("P2", "S");
		ProduRem.put("P3", "B");
		ProduRem.put("P4", "B");
		ProduRem.put("P5", "B");
		ProduRem.put("P6", "B");
		ProduRem.put("P7", "V");
		ProduRem.put("P8", "V");
		ProduRem.put("P9", "PD");
		ProduRem.put("P10", "PD");
		ProduRem.put("P11", "PD");
		ProduRem.put("P12", "PD");
		ProduRem.put("P13", "PD");
		ProduRem.put("P14", "PD");
		ProduRem.put("P15", "P");
		ProduRem.put("P16", "P");
		ProduRem.put("P17", "P");
		ProduRem.put("P18", "P");
		ProduRem.put("P19", "P");
		ProduRem.put("P20", "P");
		ProduRem.put("P21", "M");
		ProduRem.put("P22", "M");
		ProduRem.put("P23", "E");
		ProduRem.put("P24", "E");
		ProduRem.put("P25", "E");
		ProduRem.put("P26", "T");
		ProduRem.put("P27", "T");
		ProduRem.put("P28", "T");
		ProduRem.put("P29", "F");
		ProduRem.put("P30", "F");
		ProduRem.put("P31", "F");
		ProduRem.put("P32", "C");
		ProduRem.put("P33", "C");
		ProduRem.put("P34", "C");
		ProduRem.put("P35", "C");
		ProduRem.put("P36", "C");
		ProduRem.put("P37", "C");
		
		ProduSac.put("P1", "S’");
		ProduSac.put("P2", "BEGIN");
		ProduSac.put("P3", "Int");
		ProduSac.put("P4", "float");
		ProduSac.put("P5", "char");
		ProduSac.put("P6", "PD");
		ProduSac.put("P7", ",");
		ProduSac.put("P8", ";");
		ProduSac.put("P9", "id");
		ProduSac.put("P10", "PRINT");
		ProduSac.put("P11", "SCAN");
		ProduSac.put("P12", "IF");
		ProduSac.put("P13", "DO");
		ProduSac.put("P14", "END");
		ProduSac.put("P15", "id");
		ProduSac.put("P16", "PRINT");
		ProduSac.put("P17", "SCAN");
		ProduSac.put("P18", "IF");
		ProduSac.put("P19", "DO");
		ProduSac.put("P20", "}");
		ProduSac.put("P21", "\"");
		ProduSac.put("P22", "id");
		ProduSac.put("P23", "E");
		ProduSac.put("P24", "E");
		ProduSac.put("P25", "T");
		ProduSac.put("P26", "T");
		ProduSac.put("P27", "T");
		ProduSac.put("P28", "F");
		ProduSac.put("P29", "(");
		ProduSac.put("P30", "id");
		ProduSac.put("P31", "num");
		ProduSac.put("P32", "==");
		ProduSac.put("P33", "<");
		ProduSac.put("P34", "<=");
		ProduSac.put("P35", ">");
		ProduSac.put("P36", ">=");
		ProduSac.put("P37", "!= ");
	}
	
	public void analizar() {
		cadenaS=cadena.split(" ");//separa el cadena
		//primero generamos la TablaAux
		for (int i = 0; i < TablaAux.length; i++) {
			TablaBuena.add(i, TablaAux[i].split((char) 9 + "", 400));
		}
		int i = 0, f = 0, c = 0;
		PSintactica.push("I0");
		String caracter = ""; 
		do {
			caracter = anlisislexico(cadenaS[i]); //-------------------------------------------------------------
			f = SearchFil();
			c = SearchCol(caracter);
			System.out.println("Fila: " + f + " Columna: " + c + " Entrada: " + caracter + " Tabla:"
					+ TablaBuena.elementAt(f)[c]);

			if (caracter.equalsIgnoreCase("$") && TablaBuena.elementAt(f)[c].equalsIgnoreCase("")) {//Se acepta la cadena
				System.out.println("cadena aceptada");
				System.out.println();
				break;
			}
			System.out.println(PSintactica);
			if (TablaBuena.elementAt(f)[c].charAt(0) == 'I') { //Verifica que sea un estado
				if (CompEntr(TipDat, cadenaS[i]) != -1) {
					if (cadenaS[i].equals("String")) {
						CodObj += "char ";
					} else {
						CodObj += cadenaS[i] + " ";
					}
				} else if (BanRead) {
					if (caracter.equals("id")) {
						if (Dicc.get(cadenaS[i]).tipo.equals("char")) {
							CodObj += "scanf(\"%c\",&" + cadenaS[i] + ");\n";
						} else if (Dicc.get(cadenaS[i]).tipo.equals("Int")) {
							CodObj += "scanf(\"%d\",&" + cadenaS[i] + ");\n";
						}
						BanRead = false;
					}
				} else if (BanPrint) {
					if (caracter.equals("print")) {
						CodObj += "printf";
					} else {
						CodObj += cadenaS[i];
					}
					if (caracter.equals(";")) {
						CodObj += "\n";
						BanPrint = false;
					}
				} else if (BanDo) {
					if (cadenaS[i].equals("{")) {

						Etiqueta1 = "etiq" + (++EtiqCont);
						CodObj += Etiqueta1 + ":;\n";
						analisis_PosFija(); //-------------------------------------------------------------1
						PEtiq.push(Etiqueta1 + ": ; \n");
						PEtiq.push("");
						BanDo = false;
					}
				} else if (BanWh) {
					if (cadenaS[i].equals(";")) {
						Var1 = PilaExt.pop();
						Var2 = PilaExt.pop();

						Tipo1 = PosFijaT.pop();
						Tipo2 = PosFijaT.pop();

						if (Tipo1.equals(Tipo2)) {
							Dicc.put("Var" + (++ContV), new Variables("Var" + ContV, "bool", "id", 0));
							CodObj += "bool Var" + (ContV) + " = " + Var2 + ' ' + CComp + ' ' + Var1 + ";\n";
						}else{
							System.out.println("Error semantico");
						}


						if (!PilaFijaTB.isEmpty())
							Tipo1 = PilaFijaTB.pop();
						CodObj += "while( ( Var" + ContV + " ) ) \ngoto ";
						CodObj += PEtiq.pop();
						BanWh = false;
					} else if (caracter.equals("id")) {
						PilaExt.push(cadenaS[i]);
						PosFijaT.push(Dicc.get(cadenaS[i]).tipo);
					} else if (CompEntr(BoolOper, caracter) != -1) {
						CComp = caracter;
					}
				} else if (BanIf) {
					
					if (cadenaS[i].equals("{")) {
						
						Var1 = PilaExt.pop();
						Var2 = PilaExt.pop();

						Tipo1 = PosFijaT.pop();
						Tipo2 = PosFijaT.pop();

						if (Tipo1.equals(Tipo2)) {
							Dicc.put("Var" + (++ContV), new Variables("Var" + ContV, "bool", "id", 0));
							CodObj += "bool Var" + (ContV) + " = " + Var2 + ' ' + CComp + ' ' + Var1 + ";\n";
						}else{
							System.out.println("Error semantico");
						}

						if (!PilaFijaTB.isEmpty())
							Tipo1 = PilaFijaTB.pop();
						Etiqueta1 = "etiq" + (++EtiqCont);
						PEtiq.push(Etiqueta1 + ": ; \n");
						CodObj += "if( ( Var" + ContV + " ) ) \ngoto " + Etiqueta1 + ";\n";
						BanIf = false;
					} else if (caracter.equals("id")) {
						PilaExt.push(cadenaS[i]);
						PosFijaT.push(Dicc.get(cadenaS[i]).tipo);
					} else if (CompEntr(BoolOper, caracter) != -1) {
						CComp = caracter;
					}
					
				} else if (caracter.equals("}")) {
					CodObj += PEtiq.pop();
				} else if (caracter.equals("=")) {
					CodObj_Asig += cadenaS[i] + " ";

				} else if (caracter.equals(";")) {
					if (BanDec)
						BanDec = false;

					if (BanAsig) {
						PosFijaT(cadenaS[i]);
						analisis_PosFija(); //-------------------------------------------------------------

						if ((Dicc.get("Var" + ContV).tipo).equals(Dicc.get(idAsigna).tipo)) {
							CodObj_Asig += "Var" + ContV;
							CodObj += CodObj_Asig;
							CodObj_Asig = "";

							if (!PosFijaAuxT.isEmpty())
								PosFijaAuxT.pop();
							if (!PilaExtB.isEmpty())
								PilaExtB.pop();
							if (!PilaFijaTB.isEmpty())
								PilaFijaTB.pop();
						} else {
							System.out.println("Error en los tipos");
							break;
						}
						BanAsig = false;
					}

					CodObj += cadenaS[i] + " \n";
				} else if (BanAsig && !caracter.equals("=")) {
					PosFijaT(cadenaS[i]);
				} else if (caracter.equals("id")) {
					System.out.println("Entro con: " + cadenaS[i]);
					if (!BanDec)
						CodObj_Asig += cadenaS[i];
					if (BanDec) {
						
						CodObj += cadenaS[i] + " ";
						
					}
				} else {

					if (caracter.equals(","))
						CodObj += cadenaS[i] + " ";
				}
				PSintactica.push(caracter);
				PSintactica.push(TablaBuena.elementAt(f)[c]);
				i++;
				
			} else if (TablaBuena.elementAt(f)[c].charAt(0) == 'P') {
				
				do { 
					PSintactica.pop();
				} while (!ProduSac.get(TablaBuena.elementAt(f)[c]).equalsIgnoreCase(PSintactica.peek()));

				
				PSintactica.pop();
				PSintactica.push(ProduRem.get(TablaBuena.elementAt(f)[c]));
				
				f = Integer.parseInt(
						PSintactica.elementAt(PSintactica.size() - 2).substring(1, PSintactica.elementAt(PSintactica.size() - 2).length()));
				c = SearchCol(PSintactica.elementAt(PSintactica.size() - 1));
				PSintactica.push(TablaBuena.elementAt(f)[c]);// meto a la pila lo q nos encontramos

			} else {
				break;
			}

		} while (i <= cadenaS.length);
		System.out.println(CodObj);
	}
	
	public String anlisislexico(String p) { //-------------------------------------------------------------
		if (CompEntr(PalClave, p) != -1) {
			if (p.equals("IF"))
				BanIf = true;
			if (p.equals("WHILE"))
				BanWh = true;
			if (p.equals("DO"))
				BanDo = true;
			if (p.equals("PRINT"))
				BanPrint = true;
			if (p.equals("SCAN"))
				BanRead = true;
			return p;
		} else if (TipSD(p) != -1) {
			tipoAct = p;
			BanDec = true;
			return p;
		} else {
			if (p.equalsIgnoreCase(Terminador)) { //cuando se encuentra un ;
				tipoAct = "";
				return p;
			} else if (RetIgual(p)) { //Retorna si las variables son de un retorno igual
				return p;
			} else if (p.equalsIgnoreCase(AsignaCauxon)) { //cuando se encuentra un caracter de asignacion
				BanAsig = true;
				idAsigna = T1;
				return p;
			} else if (Operandos(p)) { //cuando se encuentra operadores
				return p;
			} else if (string(p) && !p.matches(ExpNu)) { //cuando se encuentra una variable
				
				if (tipoAct.equalsIgnoreCase("")) { //si el tipo actual esta vacio
					if (!BanAsig) {
						T1 = p;
					}
				} else {
					Dicc.put(p, new Variables(p, tipoAct, "id", 0)); //Declaracion de variables con sus respectivos atributos
				}
				return "id"; //al ser un id se tiene que retornar con id respectivamente
			} else if (p.matches(ExpNu)) {
				return "num";
			} else if (p.matches(ExpPa)) {
				return "Mensaje";
			} else if (p.matches(ExpCh)) {
				return "caracter";
			} 
			return p;
		}

	}
	
	String T1 = "";
	String idAsigna = "";
	String tipoAct = "";

	public void PosFijaT(String ent) {
		System.out.println(ent);
		if (ent.equals("(") || ent.equals("[")) {
			PilaPos.push(ent);
		} else if (ent.matches(ExpNu)) {
			PosFija.push(ent);
			PosFijaT.push("Int");
		} else if (ent.matches(ExpVa)) {
			PosFija.push(ent);
			PosFijaT.push(Dicc.get("" + ent).tipo);
		} else if (CompEntr(Operandos, ent) != -1) {
			if (CompEntr(OperandosP, ent) != -1) {
				if (!PilaPos.empty()) {
					while (CompEntr(OperandosP, PilaPos.peek()) != -1) {
						PosFija.push(PilaPos.pop());
						if (PilaPos.empty())
							break;
					}
				}
			} else if (CompEntr(OperandosM, ent) != -1) {
				if (!PilaPos.empty()) {
					while (CompEntr(Operandos, PilaPos.peek()) != -1) {
						PosFija.push(PilaPos.pop());
						if (PilaPos.empty())
							break;
					}
				}
			}

			PilaPos.push(ent);
		} else if (ent.equals(")") || ent.equals("]")) {
			if (ent.equals(")")) {
				while (!PilaPos.peek().equals("(")) {
					PosFija.push(PilaPos.pop());
				}
			} else if (ent.equals("]")) {
				while (!PilaPos.peek().equals("[")) {
					PosFija.push(PilaPos.pop());
				}
			}
			PilaPos.pop();
		} else if (ent.equals(";") || ent.equals("{") || ent.equals(":")) {
			while (PilaPos.size() > 0) {
				PosFija.push(PilaPos.pop());
			}
		}
		
	}

	public void analisis_PosFija() {

		PosFijaAux = new Stack<String>();
		PosFijaAuxT = new Stack<String>();

		while (!PosFija.isEmpty()) {
			PosFijaAux.push(PosFija.pop());
		}

		while (!PosFijaT.isEmpty()) {
			PosFijaAuxT.push(PosFijaT.pop());
		}

		while (!PosFijaAux.empty()) {
			if (!PilaExt.empty() && CompEntr(Operandos, PosFijaAux.peek()) != -1) {
				Var1 = PilaExt.pop();
				Var2 = PilaExt.pop();

				Tipo1 = PosFijaAuxT.pop();
				Tipo2 = PosFijaAuxT.pop();

				if (!Tipo1.equalsIgnoreCase("char") && !Tipo2.equalsIgnoreCase("char")) {
					if (!Tipo1.equalsIgnoreCase(Tipo2)) {
						PilaExt.push("float");

					} else {

						PilaExt.push(" Var" + (++ContV));
						Dicc.put("Var" + ContV, new Variables("Var" + ContV, Tipo1, "id", 0));
						CodObj += Tipo1 + PilaExt.peek() + " = " + Var2 + ' ' + PosFijaAux.pop() + ' ' + Var1 + ";\n";
						PosFijaAuxT.push(Tipo1);
						
					}
				}
			}else {
				PilaExt.push(PosFijaAux.pop());
			}
		}
	}
	
	public boolean string(String y) {
		if (y.matches(Ident)) {
			return true;
		} else {
			return false;
		}
	}

	public boolean Operandos(String q) {
		for (int i = 0; i < Operandos.length; i++) {
			if (q.equalsIgnoreCase(Operandos[i])) {
				return true;
			}

		}
		return false;

	}

	public boolean RetIgual(String q) {// buscar simbolo
		for (int i = 0; i < IgualRet.length; i++) {
			if (q.equalsIgnoreCase(IgualRet[i])) {
				return true;
			}
		}
		return false;

	}

	public int SearchFil() {
		String fauxi = PSintactica.elementAt(PSintactica.size() - 1).trim();
		System.out.println("Esta buscando "+fauxi);
		for (int i = 0; i < Filas.length; i++) {
			if (Filas[i].equalsIgnoreCase(fauxi)) {
				return i;
			}
		}
		return 19;
	}

	public int SearchCol(String x) {
		for (int i = 0; i < Columnas.length; i++) {
			if (Columnas[i].equalsIgnoreCase(x)) {
				return i;
			}
		}
		return 0;
	}

	public int TipSD(String td) {
		for (int i = 0; i < TipDat.length; i++) {
			if (td.equalsIgnoreCase(TipDat[i])) {
				return i;
			}
		}
		return -1;
	}

	

	public int CompEntr(String vec[], String ent) {
		int ret = -1;
		for (int i = 0; i < vec.length; i++) {
			if (vec[i].equals(ent)) {
				ret = i;
			}

		}
		return ret;
	}
	
	public static void main(String[] args) {
		programaAux obj= new programaAux();
		obj.producCauxones();
		obj.analizar();
	}

}

class Variables {
	String nombre, tipo, token;
	int valor;

	public Variables(String n, String t, String t2, int v) {
		nombre = n;
		tipo = t;
		token = t2;
		valor = v;
	}
}
