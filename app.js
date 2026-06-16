let punkte = Number(localStorage.getItem("punkte") || 0);

let modus = "";

let aktuelleLoesung = "";

let aktuelleAufgabe = null;



const denkaufgaben = [

{
frage:"Ein Freizeitpark kostet 5 € Eintritt. Jede Fahrt kostet 1,20 €. Welcher Term beschreibt die Kosten für x Fahrten?",
antworten:[
"5 + 1,2x",
"1,2 + 5x",
"5x + 1,2",
"6,2x"
],
richtig:0
},

{
frage:"Ein Baum ist 2,20 m hoch und wächst jedes Jahr 5 cm. Welcher Term beschreibt die Höhe nach n Jahren?",
antworten:[
"2,20 + 0,05n",
"2,20n + 0,05",
"5n + 2,20",
"0,05 + n"
],
richtig:0
},

{
frage:"Ein Rechteck hat die Seitenlängen 4x und 2x. Wie lautet der Umfang?",
antworten:[
"6x",
"8x",
"12x",
"16x"
],
richtig:2
},

{
frage:"Ein Kasten enthält 20 Flaschen. Das Flaschenpfand beträgt y Euro pro Flasche. Das Kastenpfand beträgt x Euro. Welcher Term beschreibt das Gesamtpfand?",
antworten:[
"20x+y",
"x+20y",
"20xy",
"21xy"
],
richtig:1
}

];



function aktualisierePunkte(){

document.getElementById("punkte").innerText = punkte;

localStorage.setItem("punkte", punkte);

}



window.onload = function(){

aktualisierePunkte();

};



function zeigeTrainer(titel){

document.getElementById("menu").style.display="none";

document.getElementById("trainer").style.display="block";

document.getElementById("titel").innerText=titel;

document.getElementById("feedback").innerHTML="";

}



function zurueckZumMenue(){

document.getElementById("menu").style.display="block";

document.getElementById("trainer").style.display="none";

}



function starteBerechnen(){

modus="berechnen";

zeigeTrainer("Werte von Termen");

naechsteAufgabe();

}



function starteAufstellen(){

modus="aufstellen";

zeigeTrainer("Terme aufstellen");

naechsteAufgabe();

}



function starteVergleichen(){

modus="vergleichen";

zeigeTrainer("Terme vergleichen");

naechsteAufgabe();

}



function starteGleichungen(){

modus="gleichungen";

zeigeTrainer("Gleichungen lösen");

naechsteAufgabe();

}



function starteDenkaufgaben(){

modus="denken";

zeigeTrainer("🧠 Denkaufgaben");

naechsteAufgabe();

}



function normalisiere(text){

return String(text)
.toLowerCase()
.replace(/\s+/g,"")
.replace(",",".");
}
function naechsteAufgabe(){

document.getElementById("feedback").innerHTML="";

document.getElementById("antwort").value="";

const mc =
document.getElementById("multipleChoiceBereich");

const txt =
document.getElementById("antwortBereich");

const pruef =
document.getElementById("pruefButton");

mc.style.display="none";

txt.style.display="block";

pruef.style.display="block";



if(modus==="berechnen"){

let a=Math.floor(Math.random()*8)+2;

let b=Math.floor(Math.random()*10)+1;

let x=Math.floor(Math.random()*8)+1;

aktuelleLoesung=String(a*x+b);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>${a}x + ${b}</b><br><br>für x = ${x}`;

}



if(modus==="aufstellen"){

let typ=Math.floor(Math.random()*3);



if(typ===0){

let a=Math.floor(Math.random()*7)+2;

let b=Math.floor(Math.random()*9)+1;

aktuelleLoesung=`${a}x+${b}`;

document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das ${a}-fache einer Zahl plus ${b}`;

}



if(typ===1){

let b=Math.floor(Math.random()*9)+1;

aktuelleLoesung=`x-${b}`;

document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Eine Zahl vermindert um ${b}`;

}



if(typ===2){

let a=Math.floor(Math.random()*5)+2;

aktuelleLoesung=`${a}x`;

document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das ${a}-fache einer Zahl`;

}

}



if(modus==="vergleichen"){

aktuelleLoesung="ja";

let a=Math.floor(Math.random()*4)+2;

let b=Math.floor(Math.random()*4)+2;

document.getElementById("aufgabe").innerHTML=
`Sind die Terme gleichwertig?<br><br><b>${a}x + ${b}x</b><br><br><b>${a+b}x</b><br><br>Antwort: ja oder nein`;

}



if(modus==="gleichungen"){

let x=Math.floor(Math.random()*10)+1;

let b=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(x);

document.getElementById("aufgabe").innerHTML=
`Löse die Gleichung:<br><br><b>x + ${b} = ${x+b}</b>`;

}



if(modus==="denken"){

txt.style.display="none";

pruef.style.display="none";

mc.style.display="block";

aktuelleAufgabe =
denkaufgaben[
Math.floor(
Math.random()*denkaufgaben.length
)
];

document.getElementById("aufgabe").innerHTML =
aktuelleAufgabe.frage;



["A","B","C","D"].forEach(function(id,index){

const button =
document.getElementById("antwort"+id);

button.innerText =
aktuelleAufgabe.antworten[index];

button.onclick=function(){

pruefeMC(index);

};

});

}

}
function pruefeMC(index){

if(index===aktuelleAufgabe.richtig){

punkte++;

aktualisierePunkte();

document.getElementById("feedback").innerHTML =
"✅ Richtig! +1 Punkt";

}
else{

document.getElementById("feedback").innerHTML =
"❌ Noch nicht richtig.";

}

}



function pruefen(){

const eingabe =
normalisiere(
document.getElementById("antwort").value
);

const loesung =
normalisiere(aktuelleLoesung);



if(eingabe===loesung){

punkte++;

aktualisierePunkte();

document.getElementById("feedback").innerHTML =
"✅ Richtig! +1 Punkt";

return;

}



if(modus==="aufstellen"){

if(
eingabe==="x+x+x+5"
&&
loesung==="3x+5"
){

punkte++;

aktualisierePunkte();

document.getElementById("feedback").innerHTML =
"✅ Inhaltlich richtig<br><br>💡 Übliche Schreibweise: 3x + 5";

return;

}

}



document.getElementById("feedback").innerHTML =
"❌ Falsch<br><br>Richtige Lösung: "
+ aktuelleLoesung;

}