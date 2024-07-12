function estadisticasLocales() {
    var nombreJugador = document.getElementById("ahorcadoPlayer1").textContent;
    var puntosJugador = parseFloat(document.getElementById("ahorcadoPlayerPoints").textContent);
    var acumuladorPartidasJugadas = localStorage.getItem('acumuladorPartidasJugadas') ? parseInt(localStorage.getItem('acumuladorPartidasJugadas')) : 0;
    //Porcentaje de victorias

    var porcentajeVictorias;
    if (acumuladorPartidasJugadas < 1){
        porcentajeVictorias = 0;
    }else{
        porcentajeVictorias = (puntosJugador * 100) / acumuladorPartidasJugadas;
    }
    // Calcular nivel de suciedad
    var ahorcadoNivelJugador;
    if (acumuladorPartidasJugadas < 5){
        ahorcadoNivelJugador = "Aun en revision";
    }else if (porcentajeVictorias >= 90){
        ahorcadoNivelJugador = "Genio 🧠";
    }else if (porcentajeVictorias < 90 && porcentajeVictorias > 80){
        ahorcadoNivelJugador = "Erudito 🥇";
    }else if (porcentajeVictorias <= 80 && porcentajeVictorias > 50){
        ahorcadoNivelJugador = "Buen conocimiento 🥈";
    }else if (porcentajeVictorias <= 50 && porcentajeVictorias > 30){
        ahorcadoNivelJugador = "Practicante 🥉";
    }else if(porcentajeVictorias <= 30 && porcentajeVictorias > 20){
        ahorcadoNivelJugador = "Amateur 👩🏻‍🎓";
    }else if (porcentajeVictorias <= 20 && porcentajeVictorias > 10){
        ahorcadoNivelJugador = "Oxidado 🛠️";
    }else{
        ahorcadoNivelJugador = "Sugerencia. Limpiar cache 😿";
    }
    var avatarStyle = window.getComputedStyle(document.getElementById("avatarahorcadoPlayer1")).backgroundImage;
    document.getElementById("avatarahorcadoPlayer1Estadisticas").style.backgroundImage = avatarStyle;
    document.getElementById("avatarahorcadoPlayer1Estadisticas").style.backgroundSize = "cover";
    document.getElementById("avatarahorcadoPlayer1Estadisticas").style.backgroundPosition = "center";
    document.getElementById("ahorcadoPlayer1Estadisticas").textContent = nombreJugador;
    document.getElementById("ahorcadoPlayerPointsEstadisticas").textContent = puntosJugador + "🏆";

    //push nivel suciedad
    document.getElementById("ahorcadoNivelJugador").textContent = ahorcadoNivelJugador;
    //push % de victorias
    document.getElementById("ahorcadoPerVictorias").textContent = porcentajeVictorias.toFixed(2) + "%";
    //push rondas jugadas
    document.getElementById("ahorcadoTotalRondas").textContent = acumuladorPartidasJugadas + "🎯";
    

}   

document.addEventListener('DOMContentLoaded', function() {
    estadisticasLocales();
});
