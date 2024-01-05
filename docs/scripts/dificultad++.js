$(document).ready(function () {
    alert("El juego ha cambiado el nivel de dificultad. Pulsa 'aceptar' y luego 'jugar'");
    alert("En este evento, las palabras son nombres de paises");
    
    // palabras para adivinar
    var listaPalabras = [
        "Argentina", "Australia", "Austria", "Belgica", "Brasil", "Chile", "China", "Colombia", "Cuba", "Dinamarca",
        "Ecuador", "Egipto", "España", "Francia", "Grecia", "India", "Indonesia", "Italia", "Japon", "Kenia",
        "Libano", "Mexico", "Noruega", "Panama", "Peru", "Polonia", "Portugal", "Qatar", "Rusia",
        "Serbia", "Suecia", "Suiza", "Siria", "Turquía", "Uganda", "Ucrania", "Uruguay", "Venezuela", "Vietnam",
        "Yemen", "Zambia", "Zimbabue", "Albania", "Angola", "Armenia", "Bahamas", "Camerun",
        "Chad", "Chipre", "Estonia", "Eswatini", "Fiyi", "Gambia", "Guyana",
        "Hungria", "Irak", "Irlanda", "Jamaica", "Jordania", "Kiribati", "Laos", "Lesoto", "Letonia", "Liberia",
        "Mali", "Malta", "Moldavia", "Mónaco", "Namibia", "Nauru", "Nepal", "Nigeria", "Oman", "Pakistan",
        "Guinea", "Paraguay", "Ruanda", "Samoa", "Senegal", "Singapur", "Somalia", "Tailandia", "Catar", "Zaire", "Zimbabwe", "Barbados",
    
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
