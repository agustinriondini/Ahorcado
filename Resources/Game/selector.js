function pruebaPiloto() {
    
    var selectElement = document.getElementById("selectDificultad");
    var selectedValue = selectElement.value;

    localStorage.setItem("dificultadSeleccionada", selectedValue);

    if (selectedValue === "dificil") {

        var dificultadIncrementada = document.createElement("script");
            dificultadIncrementada.src = "Resources/Game/dificultad++.js";
            dificultadIncrementada.type = "text/javascript";

        document.head.appendChild(dificultadIncrementada);
    }else if (selectedValue === "ultimate"){

        var dificultadIncrementada = document.createElement("script");
        dificultadIncrementada.src = "Resources/Game/dificultad+++.js";
        dificultadIncrementada.type = "text/javascript";

        document.head.appendChild(dificultadIncrementada);
    }else if (selectedValue === "facil"){
        var dificultadIncrementada = document.createElement("script");
        dificultadIncrementada.src = "Resources/Game/dificultad+.js";
        dificultadIncrementada.type = "text/javascript";

        document.head.appendChild(dificultadIncrementada);
    }else{
        //-->location.reload();<--- no usar, crea un loop infinito
        return; //<-- usar
    }
}
window.onload = function () {
    var storedValue = localStorage.getItem("dificultadSeleccionada");
    if (storedValue) {
        var selectElement = document.getElementById("selectDificultad");
        selectElement.value = storedValue;
    }
    pruebaPiloto();
};


