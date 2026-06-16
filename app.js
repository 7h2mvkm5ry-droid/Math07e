function pruefen() {

    const antwort =
        Number(document.getElementById("antwort").value);

    if (antwort === 17) {

        document.getElementById("ergebnis").innerHTML =
            "✅ Richtig!";

    } else {

        document.getElementById("ergebnis").innerHTML =
            "❌ Leider falsch.";

    }

}