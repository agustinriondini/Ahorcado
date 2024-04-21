$(document).ready(function () {
    alert("Dificultad baja. Pulsa 'aceptar' y luego 'jugar'");
    alert("Te ayudo un poco. Es un animal");  
    //Array//
    var listaPalabras =[
        "Perro", "Gato", "Conejo", "Serpiente", "Alcon",
        "Oso", "Raton", "Loro", "Gaviota", "Pajaro",
        "Lechuza", "Tero", "Liebre", "Caballo", "Erizo",
        "Vaca", "Lobo", "Rata", "Hamster"
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
