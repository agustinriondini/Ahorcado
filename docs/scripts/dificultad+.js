$(document).ready(function () {
    alert("El juego ha cambiado el nivel de dificultad. Pulsa 'aceptar' y luego 'jugar'");
    alert("Te ayudo un poco. UN objeto, UNA palabra");
    
    // palabras para adivinar
    var listaPalabras =[
        "Computadora", "Libro", "Telefono", "Cafetera", "Silla",
        "Guitarra", "Bicicleta", "Pelota", "Reloj", "Lampara",
        "Camara", "Teclado", "Zapatos", "Bolso", "Paraguas",
        "Gafas", "Tijera", "Auriculares", "Mesa", "Pintura"
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
