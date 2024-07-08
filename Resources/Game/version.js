$(document).ready(function() {

    var actualver = $('#updateVer').text();
    var checkChannel = $('#channel').text();
    var lastUpdate = "v3.1.2 build#42(08072024)";
    var releaseChannel = "Stable";

    if (actualver !== lastUpdate) {
        $('#updateVer').text(lastUpdate);
    }
    if (checkChannel !== releaseChannel){
        $('#channel').text(releaseChannel);
    }
});

