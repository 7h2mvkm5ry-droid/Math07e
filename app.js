let punkte = Number(localStorage.getItem("punkte") || 0);

let modus = "";

let aktuelleLoesung = "";

let aktuelleAufgabe = null;

let name =
localStorage.getItem("spielerName") || "";

let aufgaben =
Number(localStorage.getItem("aufgaben") || 0);

let versuche =
Number(localStorage.getItem("versuche") || 0);

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


localStorage.setItem("punkte", punkte);

localStorage.setItem("aufgaben", aufgaben);

localStorage.setItem("versuche", versuche);

let quote = 0;

if(versuche>0){
quote =
Math.round(
aufgaben/versuche*100
);
}

document.getElementById("punkteAnzeige").innerHTML =
`
👤 ${name || "Unbekannt"}
<br>
⭐ Punkte: ${punkte}
<br>
📝 Aufgaben: ${aufgaben}
<br>
🎯 Quote: ${quote} %
`;

}


window.onload = function(){

if(!name){

name =
prompt(
"Bitte gib deinen Namen ein:"
);

if(name){

localStorage.setItem(
"spielerName",
name
);

}

}

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

zeigeTrainer("🔧 Terme vereinfachen");

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

txt.style.display="none";
pruef.style.display="none";
mc.style.display="block";

let typ=Math.floor(Math.random()*30);

let frage="";
let richtig="";
let falsch=[];

/* ax + bx */

if(typ===0){

let a=Math.floor(Math.random()*8)+2;
let b=Math.floor(Math.random()*8)+2;

frage=`${a}x + ${b}x`;

richtig=`${a+b}x`;

falsch=[
`${a*b}x`,
`${a+b+1}x`,
`${Math.abs(a-b)}x`
];

}

/* ax - bx */

if(typ===1){

let a=Math.floor(Math.random()*8)+6;
let b=Math.floor(Math.random()*5)+1;

frage=`${a}x - ${b}x`;

richtig=`${a-b}x`;

falsch=[
`${a+b}x`,
`${a*b}x`,
`${b}x`
];

}

/* ax + bx + cx */

if(typ===2){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);
let c=2+Math.floor(Math.random()*5);

frage=`${a}x + ${b}x + ${c}x`;

richtig=`${a+b+c}x`;

falsch=[
`${a+b}x`,
`${a*b*c}x`,
`${a+b+c+1}x`
];

}

/* ax + zahl + bx */

if(typ===3){

let a=2+Math.floor(Math.random()*6);
let b=2+Math.floor(Math.random()*6);
let z=2+Math.floor(Math.random()*10);

frage=`${a}x + ${z} + ${b}x`;

richtig=`${a+b}x + ${z}`;

falsch=[
`${a+b+z}x`,
`${a+b}x`,
`${a*b}x + ${z}`
];

}

/* ax - zahl + bx + zahl */

if(typ===4){

let a=2+Math.floor(Math.random()*6);
let b=2+Math.floor(Math.random()*6);
let z1=2+Math.floor(Math.random()*10);
let z2=2+Math.floor(Math.random()*10);

frage=`${a}x - ${z1} + ${b}x + ${z2}`;

richtig=`${a+b}x + ${z2-z1}`;

falsch=[
`${a+b}x`,
`${a+b+1}x`,
`${a+b}x + ${z1+z2}`
];

}

/* ax² + bx² */

if(typ===5){

let a=2+Math.floor(Math.random()*8);
let b=2+Math.floor(Math.random()*8);

frage=`${a}x² + ${b}x²`;

richtig=`${a+b}x²`;

falsch=[
`${a+b}x`,
`${a*b}x²`,
`${a+b+1}x²`
];

}

/* ax² - bx² */

if(typ===6){

let a=6+Math.floor(Math.random()*8);
let b=2+Math.floor(Math.random()*4);

frage=`${a}x² - ${b}x²`;

richtig=`${a-b}x²`;

falsch=[
`${a+b}x²`,
`${a-b}x`,
`${b}x²`
];

}

/* ax³ + bx³ */

if(typ===7){

let a=2+Math.floor(Math.random()*8);
let b=2+Math.floor(Math.random()*8);

frage=`${a}x³ + ${b}x³`;

richtig=`${a+b}x³`;

falsch=[
`${a+b}x²`,
`${a*b}x³`,
`${a+b+1}x³`
];

}

/* ax + by + cx */

if(typ===8){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);
let c=2+Math.floor(Math.random()*5);

frage=`${a}x + ${b}y + ${c}x`;

richtig=`${a+c}x + ${b}y`;

falsch=[
`${a+b+c}xy`,
`${a+c}xy`,
`${a+c}x + y`
];

}

/* ax² + by + cx² */

if(typ===9){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);
let c=2+Math.floor(Math.random()*5);

frage=`${a}x² + ${b}y + ${c}x²`;

richtig=`${a+c}x² + ${b}y`;

falsch=[
`${a+c}x²`,
`${a+b+c}x²`,
`${a+c}xy`
];

}

/* ax · b */

if(typ===10){

let a=2+Math.floor(Math.random()*8);
let b=2+Math.floor(Math.random()*8);

frage=`${a}x · ${b}`;

richtig=`${a*b}x`;

falsch=[
`${a+b}x`,
`${a*b}`,
`${a+b}`
];

}

/* ax · bx */

if(typ===11){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x · ${b}x`;

richtig=`${a*b}x²`;

falsch=[
`${a*b}x`,
`${a+b}x²`,
`${a*b}x³`
];

}

/* ax² · bx */

if(typ===12){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x² · ${b}x`;

richtig=`${a*b}x³`;

falsch=[
`${a*b}x²`,
`${a+b}x³`,
`${a*b}x⁴`
];

}

/* ax : b */

if(typ===13){

let b=2+Math.floor(Math.random()*5);
let k=2+Math.floor(Math.random()*6);

let a=b*k;

frage=`${a}x : ${b}`;

richtig=`${k}x`;

falsch=[
`${a+b}x`,
`${b}x`,
`${k}`
];

}

/* ax² : bx */

if(typ===14){

let b=2+Math.floor(Math.random()*5);
let k=2+Math.floor(Math.random()*6);

let a=b*k;

frage=`${a}x² : ${b}x`;

richtig=`${k}x`;

falsch=[
`${k}x²`,
`${a+b}x`,
`${k}`
];

}

if(typ===15){

let a=2+Math.floor(Math.random()*8);
let b=2+Math.floor(Math.random()*8);

frage=`${a}x³ - ${b}x³`;

richtig=`${a-b}x³`;

falsch=[
`${a+b}x³`,
`${a-b}x²`,
`${b}x³`
];

}

if(typ===16){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}a + ${b}b - ${a}a`;

richtig=`${b}b`;

falsch=[
`${a+b}ab`,
`${a}a`,
`${b}a`
];

}

if(typ===17){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x + ${b}y - ${a}x`;

richtig=`${b}y`;

falsch=[
`${a+b}xy`,
`${b}x`,
`${a+b}y`
];

}

if(typ===18){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x² + ${b}x² - ${a}x²`;

richtig=`${b}x²`;

falsch=[
`${b}x`,
`${a+b}x²`,
`${b}x³`
];

}

if(typ===19){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x³ + ${b}x³ - ${b}x³`;

richtig=`${a}x³`;

falsch=[
`${a}x²`,
`${a+b}x³`,
`${b}x³`
];

}

if(typ===20){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}a · ${b}a`;

richtig=`${a*b}a²`;

falsch=[
`${a+b}a²`,
`${a*b}a`,
`${a*b}a³`
];

}

if(typ===21){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}a² · ${b}a`;

richtig=`${a*b}a³`;

falsch=[
`${a*b}a²`,
`${a+b}a³`,
`${a*b}a⁴`
];

}

if(typ===22){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x · ${b}y`;

richtig=`${a*b}xy`;

falsch=[
`${a+b}xy`,
`${a*b}x`,
`${a*b}y`
];

}

if(typ===23){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x² · ${b}y`;

richtig=`${a*b}x²y`;

falsch=[
`${a*b}xy`,
`${a+b}x²y`,
`${a*b}x²`
];

}

if(typ===24){

let b=2+Math.floor(Math.random()*5);
let k=2+Math.floor(Math.random()*6);

let a=b*k;

frage=`${a}x³ : ${b}x²`;

richtig=`${k}x`;

falsch=[
`${k}x²`,
`${k}`,
`${a+b}x`
];

}

if(typ===25){

let b=2+Math.floor(Math.random()*5);
let k=2+Math.floor(Math.random()*6);

let a=b*k;

frage=`${a}a² : ${b}a`;

richtig=`${k}a`;

falsch=[
`${k}`,
`${k}a²`,
`${a+b}a`
];

}

if(typ===26){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);
let c=2+Math.floor(Math.random()*5);

frage=`${a}x² + ${b}x² - ${c}x`;

richtig=`${a+b}x² - ${c}x`;

falsch=[
`${a+b-c}x²`,
`${a+b}x`,
`${a+b+c}x²`
];

}

if(typ===27){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);
let c=2+Math.floor(Math.random()*5);

frage=`${a}x³ - ${b}x³ + ${c}x³`;

richtig=`${a-b+c}x³`;

falsch=[
`${a+b+c}x³`,
`${a-b+c}x²`,
`${a*b*c}x³`
];

}

if(typ===28){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x² + ${b}y + ${a}x²`;

richtig=`${2*a}x² + ${b}y`;

falsch=[
`${a+b}x²`,
`${2*a+b}x²`,
`${2*a}xy`
];

}

if(typ===29){

let a=2+Math.floor(Math.random()*5);
let b=2+Math.floor(Math.random()*5);

frage=`${a}x · ${b}x²`;

richtig=`${a*b}x³`;

falsch=[
`${a*b}x²`,
`${a+b}x³`,
`${a*b}x⁴`
];

}
let antworten=[richtig,...falsch];

antworten.sort(()=>Math.random()-0.5);

aktuelleAufgabe={
frage:frage,
antworten:antworten,
richtig:antworten.indexOf(richtig)
};

document.getElementById("aufgabe").innerHTML=
`Vereinfache den Term:<br><br><b>${frage}</b>`;

["A","B","C","D"].forEach(function(id,index){

const button=
document.getElementById("antwort"+id);

button.innerText=
aktuelleAufgabe.antworten[index];

button.onclick=function(){

pruefeMC(index);

};

});

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

versuche++;

if(index===aktuelleAufgabe.richtig){

punkte++;

aufgaben++;

aktualisierePunkte();
aktualisierePunkte();

document.getElementById("feedback").innerHTML =
"✅ Richtig! +1 Punkt";

}
else{

document.getElementById("feedback").innerHTML =
"❌ Noch nicht richtig.";

}

}


function termAuswerten(term,x){

term = term.replace(/\s+/g,"");

term = term.replace(/(\d)(x)/g,"$1*$2");
term = term.replace(/x/g,"("+x+")");

try{
return Function("return "+term)();
}
catch{
return null;
}

}

function termeGleich(term1,term2){

for(let i=0;i<5;i++){

let x=Math.floor(Math.random()*20)+1;

let a=termAuswerten(term1,x);
let b=termAuswerten(term2,x);

if(a===null || b===null){
return false;
}

if(Math.abs(a-b)>0.0001){
return false;
}

}

return true;

}
function pruefen(){

const eingabe =
normalisiere(
document.getElementById("antwort").value
);

const loesung =
normalisiere(aktuelleLoesung);

versuche++;

aktualisierePunkte();

if(modus==="aufstellen"){

if(termeGleich(eingabe,loesung)){

punkte++;

aufgaben++;

aktualisierePunkte();

if(eingabe===loesung){

document.getElementById("feedback").innerHTML =
"✅ Richtig! +1 Punkt";

}else{

document.getElementById("feedback").innerHTML =
"✅ Inhaltlich richtig! +1 Punkt<br><br>💡 Übliche Schreibweise: "
+ aktuelleLoesung;

}

return;

}

}else{

if(eingabe===loesung){

punkte++;

aufgaben++;

aktualisierePunkte();

document.getElementById("feedback").innerHTML =
"✅ Richtig! +1 Punkt";

return;

}

}







document.getElementById("feedback").innerHTML =
"❌ Falsch<br><br>Richtige Lösung: "
+ aktuelleLoesung;

}