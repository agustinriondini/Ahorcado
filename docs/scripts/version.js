$(document).ready(function() {
    console.log('Script cargado correctamente.');

    var actualver = $('#updateVer').text();
    var lastUpdate = "public_release_v2.3.8_update27052024Build#37";

    console.log('Valor actual:', actualver);

    if (actualver !== lastUpdate) {
        $('#updateVer').text(lastUpdate);
        console.log('Valor actualizado a:', lastUpdate);
    }
});