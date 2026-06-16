let punkte = Number(localStorage.getItem("punkte") || 0);

let modus = "";

let aktuelleLoesung = "";

let aktuelleAufgabe = null;



const denkaufgaben = [

{
frage:"Ein Freizeitpark kostet 5 € Eintritt. Jede Fahrt kostet 1,20 €. Welcher Term beschreibt die Kosten für x Fahrten?",
antworten:["5 + 1,2x","1,2 + 5x","5x + 1,2","6,2x"],
richtig:0
},

{
frage:"Ein Baum ist 2,20 m hoch und wächst jedes Jahr 5 cm. Welcher Term beschreibt die Höhe nach n Jahren?",
antworten:["2,20 + 0,05n","2,20n + 0,05","5n + 2,20","0,05 + n"],
richtig:0
},

{
frage:"Ein Rechteck hat die Seitenlängen 4x und 2x. Wie lautet der Umfang?",
antworten:["6x","8x","12x","16x"],
richtig:2
},

{
frage:"Ein Kasten enthält 20 Flaschen. Das Flaschenpfand beträgt y Euro pro Flasche. Das Kastenpfand beträgt x Euro. Welcher Term beschreibt das Gesamtpfand?",
antworten:["20x+y","x+20y","20xy","21xy"],
richtig:1
},

{
frage:"Ein Kinobesuch kostet 8 €. Popcorn kostet p €. Welcher Term beschreibt die Gesamtkosten?",
antworten:["8+p","8p","p-8","8/p"],
richtig:0
},

{
frage:"Eine Zahl wird verdoppelt und anschließend um 7 erhöht.",
antworten:["2x+7","2(x+7)","x+14","7x+2"],
richtig:0
},

{
frage:"Ein Quadrat hat die Seitenlänge x. Welchen Umfang hat es?",
antworten:["2x","4x","x²","8x"],
richtig:1
},

{
frage:"Ein Rechteck ist 5 cm breit und x cm lang. Welchen Flächeninhalt hat es?",
antworten:["5+x","5x","10x","x²"],
richtig:1
},

{
frage:"Eine Kerze ist 30 cm hoch und wird pro Stunde 2 cm kleiner. Welcher Term beschreibt die Höhe nach t Stunden?",
antworten:["30-2t","30+2t","2t-30","60-2t"],
richtig:0
},

{
frage:"Ein Handyvertrag kostet 10 € Grundgebühr und 3 € pro GB. Welcher Term beschreibt die Kosten bei x GB?",
antworten:["10+3x","3+10x","13x","10x+3"],
richtig:0
},

{
frage:"Welcher Term beschreibt 'eine Zahl vermindert um 9'?",
antworten:["x-9","9-x","x+9","9x"],
richtig:0
},

{
frage:"Ein Rechteck hat die Seiten x und 3. Wie lautet sein Umfang?",
antworten:["x+3","2x+6","3x+2","6x"],
richtig:1
},

{
frage:"Eine Zahl wird mit 5 multipliziert und anschließend 2 abgezogen.",
antworten:["5x-2","5(x-2)","x-10","2x-5"],
richtig:0
},

{
frage:"Ein Bus kostet 150 €. Die Kosten werden auf x Personen verteilt. Welcher Term beschreibt die Kosten pro Person?",
antworten:["150/x","150x","x/150","150+x"],
richtig:0
},

{
frage:"Welcher Term beschreibt das Dreifache einer Zahl?",
antworten:["3x","x³","x+3","3+x"],
richtig:0
},

{
frage:"Ein Quader hat 12 Kanten. Jede Kante ist x cm lang. Wie lang sind alle Kanten zusammen?",
antworten:["12x","x¹²","6x","24x"],
richtig:0
},

{
frage:"Ein Sparschwein enthält 20 €. Jede Woche kommen x € hinzu. Welcher Term beschreibt den Betrag nach einer Woche?",
antworten:["20+x","20x","x-20","20/x"],
richtig:0
},

{
frage:"Welcher Term passt zu 'das Doppelte einer Zahl plus 4'?",
antworten:["2x+4","2(x+4)","x+8","4x+2"],
richtig:0
},

{
frage:"Ein Geschenkband umschließt ein Quadrat mit Seitenlänge x. Wie lang ist das Band mindestens?",
antworten:["4x","2x","x²","8x"],
richtig:0
},

{
frage:"Ein Rechteck hat die Seiten 2x und 5x. Wie groß ist sein Umfang?",
antworten:["7x","10x","14x","20x"],
richtig:2
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

let typ = Math.floor(Math.random()*12);

if(typ===0){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(x+5);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>x + 5</b><br><br>für x = ${x}`;

}

if(typ===1){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(x-4);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>x - 4</b><br><br>für x = ${x}`;

}

if(typ===2){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(2*x);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>2x</b><br><br>für x = ${x}`;

}

if(typ===3){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(3*x+5);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>3x + 5</b><br><br>für x = ${x}`;

}

if(typ===4){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(10-2*x);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>10 - 2x</b><br><br>für x = ${x}`;

}

if(typ===5){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(2*x+3*x);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>2x + 3x</b><br><br>für x = ${x}`;

}

if(typ===6){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(4*x-x);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>4x - x</b><br><br>für x = ${x}`;

}

if(typ===7){

let x=Math.floor(Math.random()*10)+1;

let y=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(2*x+y);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>2x + y</b><br><br>x = ${x}<br>y = ${y}`;

}

if(typ===8){

let x=Math.floor(Math.random()*10)+1;

let y=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(3*x+2*y);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>3x + 2y</b><br><br>x = ${x}<br>y = ${y}`;

}

if(typ===9){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(5+2*x+x);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>5 + 2x + x</b><br><br>für x = ${x}`;

}

if(typ===10){

let x=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(20-5*x);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>20 - 5x</b><br><br>für x = ${x}`;

}

if(typ===11){

let a=Math.floor(Math.random()*10)+1;

let b=Math.floor(Math.random()*10)+1;

aktuelleLoesung=String(4*a+b);

document.getElementById("aufgabe").innerHTML=
`Berechne:<br><br><b>4a + b</b><br><br>a = ${a}<br>b = ${b}`;

}

}



if(modus==="aufstellen"){

let typ=Math.floor(Math.random()*25);

if(typ===0){
aktuelleLoesung="x+5";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Eine Zahl plus 5`;
}

if(typ===1){
aktuelleLoesung="x-7";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Eine Zahl minus 7`;
}

if(typ===2){
aktuelleLoesung="2x";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Doppelte einer Zahl`;
}

if(typ===3){
aktuelleLoesung="3x";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Dreifache einer Zahl`;
}

if(typ===4){
aktuelleLoesung="4x";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Vierfache einer Zahl`;
}

if(typ===5){
aktuelleLoesung="x+8";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Eine Zahl vermehrt um 8`;
}

if(typ===6){
aktuelleLoesung="x-3";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Eine Zahl vermindert um 3`;
}

if(typ===7){
aktuelleLoesung="2x+5";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Doppelte einer Zahl plus 5`;
}

if(typ===8){
aktuelleLoesung="3x-4";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Dreifache einer Zahl minus 4`;
}

if(typ===9){
aktuelleLoesung="4x+9";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Vierfache einer Zahl plus 9`;
}

if(typ===10){
aktuelleLoesung="5x-2";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Fünffache einer Zahl minus 2`;
}

if(typ===11){
aktuelleLoesung="2x-8";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Doppelte einer Zahl vermindert um 8`;
}

if(typ===12){
aktuelleLoesung="3x+7";
document.getElementById("aufgabe").innerHTML=
`Stelle einen Term auf:<br><br>Das Dreifache einer Zahl vermehrt um 7`;
}

if(typ===13){
aktuelleLoesung="x+5";
document.getElementById("aufgabe").innerHTML=
`Lisa hat 5 €. Dazu kommen x €. Stelle einen Term auf.`;
}

if(typ===14){
aktuelleLoesung="x-3";
document.getElementById("aufgabe").innerHTML=
`Paul besitzt x Murmeln und verliert 3. Stelle einen Term auf.`;
}

if(typ===15){
aktuelleLoesung="x+2";
document.getElementById("aufgabe").innerHTML=
`Ein Heft kostet x €. Dazu kommen 2 € Versand. Stelle einen Term auf.`;
}

if(typ===16){
aktuelleLoesung="x+4";
document.getElementById("aufgabe").innerHTML=
`Ein Baum ist x m hoch und wächst um 4 m. Stelle einen Term auf.`;
}

if(typ===17){
aktuelleLoesung="3x";
document.getElementById("aufgabe").innerHTML=
`Ein Ticket kostet x €. Drei Tickets werden gekauft. Stelle einen Term auf.`;
}

if(typ===18){
aktuelleLoesung="x+5";
document.getElementById("aufgabe").innerHTML=
`Ein Handyvertrag kostet x € Grundgebühr und zusätzlich 5 €. Stelle einen Term auf.`;
}

if(typ===19){
aktuelleLoesung="4x";
document.getElementById("aufgabe").innerHTML=
`Ein Quadrat hat die Seitenlänge x. Gib den Umfang als Term an.`;
}

if(typ===20){
aktuelleLoesung="2x+10";
document.getElementById("aufgabe").innerHTML=
`Ein Rechteck hat die Seitenlängen x und 5. Gib den Umfang als Term an.`;
}

if(typ===21){
aktuelleLoesung="4x";
document.getElementById("aufgabe").innerHTML=
`Ein Rechteck hat die Seitenlängen x und 4. Gib den Flächeninhalt als Term an.`;
}

if(typ===22){
aktuelleLoesung="5x";
document.getElementById("aufgabe").innerHTML=
`Das Doppelte einer Zahl plus das Dreifache derselben Zahl. Stelle einen Term auf.`;
}

if(typ===23){
aktuelleLoesung="2x";
document.getElementById("aufgabe").innerHTML=
`Das Vierfache einer Zahl minus das Doppelte derselben Zahl. Stelle einen Term auf.`;
}

if(typ===24){
aktuelleLoesung="3x+3";
document.getElementById("aufgabe").innerHTML=
`Das Dreifache einer Zahl wird um 5 erhöht und anschließend um 2 vermindert. Stelle einen Term auf.`;
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