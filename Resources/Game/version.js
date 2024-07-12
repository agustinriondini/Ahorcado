$(document).ready(function() {

    var actualver = $('#updateVer').text();
    var checkChannel = $('#channel').text();
    var lastUpdate = "v3.1.3-HF-build#43(11072024)";
    var releaseChannel = "Stable";

    if (actualver !== lastUpdate) {
        $('#updateVer').text(lastUpdate);
    }
    if (checkChannel !== releaseChannel){
        $('#channel').text(releaseChannel);
    }
});

