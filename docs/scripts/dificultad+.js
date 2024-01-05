$(document).ready(function () {
    alert("El juego ha cambiado el nivel de dificultad. Pulsa 'aceptar' y luego 'jugar'");
    alert("Te ayudo un poco. Es un animal");
    
    // palabras para adivinar
    var listaPalabras =[
        "Perro", "Gato", "Conejo", "Serpiente", "Alcon",
        "Oso", "Raton", "Loro", "Gaviota", "Pajaro",
        "Lechuza", "Tero", "Liebre", "Caballo", "Erizo",
        "Vaca", "Lobo", "Rata", "Hamster"
    ];
    

    // solucion para copiar el valor de la lista al input de la palabra secreta
    function obtenerValorAleatorio(lista) {
        var indiceAleatorio = Math.floor(Math.random() * lista.length);
        return lista[indiceAleatorio];
    }

    // Función para copiar el valor al azar en el input hiddenword
    function copiarValorAlAzar() {
        var valorAleatorio = obtenerValorAleatorio(listaPalabras);
        $("#hiddenword").val(valorAleatorio).prop({'type': 'password', 'readonly': true,
        'disabled': true });
    }

    copiarValorAlAzar();
});
