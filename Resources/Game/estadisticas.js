function estadisticasLocales() {
    var nombreJugador = document.getElementById("player1").textContent;
    var puntosJugador = parseFloat(document.getElementById("playerPoints").textContent);
    var totalPartidas = localStorage.getItem('totalPartidas') ? parseInt(localStorage.getItem('totalPartidas')) : 0;
    //Porcentaje de victorias

    var porcentajeVictorias;
    if (totalPartidas < 1){
        porcentajeVictorias = 0;
    }else{
        porcentajeVictorias = (puntosJugador * 100) / totalPartidas;
    }
    // Calcular nivel de suciedad
    var nivelJugador;
    if (totalPartidas < 5){
        nivelJugador = "Aun en revision";
    }else if (porcentajeVictorias >= 90){
        nivelJugador = "Genio 🧠";
    }else if (porcentajeVictorias < 90 && porcentajeVictorias > 80){
        nivelJugador = "Erudito 🥇";
    }else if (porcentajeVictorias <= 80 && porcentajeVictorias > 50){
        nivelJugador = "Buen conocimiento 🥈";
    }else if (porcentajeVictorias <= 50 && porcentajeVictorias > 30){
        nivelJugador = "Practicante 🥉";
    }else if(porcentajeVictorias <= 30 && porcentajeVictorias > 20){
        nivelJugador = "Amateur 👩🏻‍🎓";
    }else if (porcentajeVictorias <= 20 && porcentajeVictorias > 10){
        nivelJugador = "Oxidado 🛠️";
    }else{
        nivelJugador = "Sugerencia. Limpiar cache 😿";
    }
    var avatarStyle = window.getComputedStyle(document.getElementById("avatarPlayer1")).backgroundImage;
    document.getElementById("avatarPlayer1Estadisticas").style.backgroundImage = avatarStyle;
    document.getElementById("avatarPlayer1Estadisticas").style.backgroundSize = "cover";
    document.getElementById("avatarPlayer1Estadisticas").style.backgroundPosition = "center";
    document.getElementById("player1Estadisticas").textContent = nombreJugador;
    document.getElementById("playerPointsEstadisticas").textContent = puntosJugador + "🏆";

    //push nivel suciedad
    document.getElementById("nivelJugador").textContent = nivelJugador;
    //push % de victorias
    document.getElementById("perVictorias").textContent = porcentajeVictorias.toFixed(2) + "%";
    //push rondas jugadas
    document.getElementById("totalRondas").textContent = totalPartidas + "🎯";
    

}   

document.addEventListener('DOMContentLoaded', function() {
    estadisticasLocales();
});
