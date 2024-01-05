function pruebaPiloto() {
    
    var selectElement = document.getElementById("selectDificultad");
    var selectedValue = selectElement.value;

    if (selectedValue === "dificil") {

        var dificultadIncrementada = document.createElement("script");
            dificultadIncrementada.src = "docs/scripts/dificultad++.js";
            dificultadIncrementada.type = "text/javascript";

        document.head.appendChild(dificultadIncrementada);
    }else if (selectedValue === "unlu"){

        var dificultadIncrementada = document.createElement("script");
        dificultadIncrementada.src = "docs/scripts/unluevent.js";
        dificultadIncrementada.type = "text/javascript";

        document.head.appendChild(dificultadIncrementada);
    }else if (selectedValue === "facil"){
        var dificultadIncrementada = document.createElement("script");
        dificultadIncrementada.src = "docs/scripts/dificultad+.js";
        dificultadIncrementada.type = "text/javascript";

        document.head.appendChild(dificultadIncrementada);
    }else{
        location.reload();
    }
    

}
