$(document).ready(function() {
    console.log('Script cargado correctamente.');

    var actualver = $('#updateVer').text();
    var lastUpdate = "public_release_v2.3.6_update_20022024_build#35";

    console.log('Valor actual:', actualver);

    if (actualver !== lastUpdate) {
        $('#updateVer').text(lastUpdate);
        console.log('Valor actualizado a:', lastUpdate);
    }
});