$(document).ready(function () {
    alert("Dificultad moderada. Pulsa 'aceptar' y luego 'jugar'");
    alert("Te ayudo un poco. Es un pais de america");
    
    //Array//
    var listaPalabras = [
        "Argentina", "Brasil", "Chile", "Colombia", "Ecuador", "Peru", "Uruguay", "Bolivia", "Venezuela", "Mexico", "Panama", "Canada",
        "Paraguay", "Estados Unidos",  
    ];
    function obtenerValorAleatorio(lista) {
        var indiceAleatorio = Math.floor(Math.random() * lista.length);
        return lista[indiceAleatorio];
    }
    function copiarValorAlAzar() {
        var valorAleatorio = obtenerValorAleatorio(listaPalabras);
        $("#hiddenword").val(valorAleatorio).prop({'type': 'password', 'readonly': true,
        'disabled': true });
    }
    copiarValorAlAzar();
});
