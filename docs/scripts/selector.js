function pruebaPiloto() {
    
    var selectElement = document.getElementById("selectDificultad");
    var selectedValue = selectElement.value;

    localStorage.setItem("dificultadSeleccionada", selectedValue);

    if (selectedValue === "dificil") {

        var dificultadIncrementada = document.createElement("script");
            dificultadIncrementada.src = "docs/scripts/dificultad++.js";
            dificultadIncrementada.type = "text/javascript";

        document.head.appendChild(dificultadIncrementada);
    }else if (selectedValue === "ultimate"){

        var dificultadIncrementada = document.createElement("script");
        dificultadIncrementada.src = "docs/scripts/dificultad+++.js";
        dificultadIncrementada.type = "text/javascript";

        document.head.appendChild(dificultadIncrementada);
    }else if (selectedValue === "facil"){
        var dificultadIncrementada = document.createElement("script");
        dificultadIncrementada.src = "docs/scripts/dificultad+.js";
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
function ocultarpresentacion() {
    const screen = document.getElementById('screen');
    screen.style.display = "none";

    // Guardar el tiempo en el que se oculta la pantalla
    localStorage.setItem('screenHiddenTime', Date.now());
    // Guardar el estado de ocultación
    localStorage.setItem('isScreenHidden', 'true');

    // Establecer un temporizador para mostrar la pantalla después de 40 minutos
    setTimeout(() => {
        localStorage.removeItem('isScreenHidden');
        screen.style.display = "flex"; // Mostrar el elemento nuevamente
    }, 40 * 60 * 1000); // 40 minutos en milisegundos
}


// Verificar si la pantalla debe estar oculta al cargar la página
const isScreenHidden = localStorage.getItem('isScreenHidden');
if (isScreenHidden === 'true') {
    const screenHiddenTime = parseInt(localStorage.getItem('screenHiddenTime'), 10);
    const currentTime = Date.now();
    const elapsedTime = currentTime - screenHiddenTime;

    if (elapsedTime < 40 * 60 * 1000) {
        // Mantener la pantalla oculta
        document.getElementById('screen').style.display = 'none';
        // Establecer un temporizador para mostrar la pantalla después del tiempo restante
        setTimeout(() => {
            localStorage.removeItem('isScreenHidden');
            location.reload();
        }, 40 * 60 * 1000 - elapsedTime);
    } else {
        // Restablecer el estado si ha pasado más de 40 minutos
        localStorage.removeItem('isScreenHidden');
    }
}
document.getElementById('activate').onclick = ocultarpresentacion;
