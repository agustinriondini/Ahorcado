$(document).ready(function () {
    
    //Array//
    var listaPalabras = [
        "Barco", "Ship","Bote","Boat", "Nave", "Spacecraft", "Edificio", "Building", "Departamento", "Flat", "Basura", "Garbage", "Trash", "Corrector", "Eraser", "Escuela", "School", "Mesa", "Table", "Computadora", "Computer", "Camion", "Truck",
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
