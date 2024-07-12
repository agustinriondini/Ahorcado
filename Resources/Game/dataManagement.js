document.addEventListener('DOMContentLoaded', function() {
    var rebootButton = document.getElementById("play");
    var rebootBtn = document.getElementById("boton_finalizar");
    var ahorcadoPlayer1Input = document.getElementById("ahorcadoPlayer1");
    var avatarahorcadoPlayer1Input = document.getElementById("avatarahorcadoPlayer1");
    var ahorcadoPlayerPointsSpan = document.getElementById("ahorcadoPlayerPoints");
    var ahorcadoBodyBackground = document.body.style.backgroundImage;
    
    
    rebootButton.addEventListener("click", function() {
        guardarEstadoJuego();
        reiniciarJuego();
    });
    
    rebootBtn.addEventListener("click", function() {
        guardarEstadoJuego();
        reiniciarJuego();
    });
    function guardarEstadoJuego() {
        // Guardar el contenido de ahorcadoDataSection
        var ahorcadoDataSectionContent = document.getElementById("ahorcadoDataSection").innerHTML;
        localStorage.setItem('ahorcadoDataSectionContent', ahorcadoDataSectionContent);
        
        // Guardar mesa elegida
        var ahorcadoBodyBackgroundImage = getComputedStyle(document.body).backgroundImage;
        localStorage.setItem('ahorcadoBodyBackgroundImage', ahorcadoBodyBackgroundImage);

        // Guardar datos del jugador
        var ahorcadoPlayer1 = ahorcadoPlayer1Input.value;
        var avatarahorcadoPlayer1 = avatarahorcadoPlayer1Input.src;
        var ahorcadoPlayerPoints = ahorcadoPlayerPointsSpan.textContent;

        localStorage.setItem('ahorcadoPlayer1', ahorcadoPlayer1);
        localStorage.setItem('avatarahorcadoPlayer1', avatarahorcadoPlayer1);
        localStorage.setItem('ahorcadoPlayerPoints', ahorcadoPlayerPoints);
    }

    function cargarEstadoJuego() {
        // Cargar el contenido de ahorcadoDataSection
        var savedahorcadoDataSectionContent = localStorage.getItem('ahorcadoDataSectionContent');
        if (savedahorcadoDataSectionContent) {
            document.getElementById("ahorcadoDataSection").innerHTML = savedahorcadoDataSectionContent;
        }

        // Cargar la mesa elegida
        var savedahorcadoBodyBackgroundImage = localStorage.getItem('ahorcadoBodyBackgroundImage');
        if (savedahorcadoBodyBackgroundImage) {
            document.body.style.backgroundImage = savedahorcadoBodyBackgroundImage;
        }

        // Cargar datos del jugador
        var savedahorcadoPlayer1 = localStorage.getItem('ahorcadoPlayer1');
        var savedavatarahorcadoPlayer1 = localStorage.getItem('avatarahorcadoPlayer1');
        var savedahorcadoPlayerPoints = localStorage.getItem('ahorcadoPlayerPoints');

        if (savedahorcadoPlayer1) {
            ahorcadoPlayer1Input.value = savedahorcadoPlayer1;
        }
        if (savedavatarahorcadoPlayer1) {
            avatarahorcadoPlayer1Input.src = savedavatarahorcadoPlayer1;
        }
        if (savedahorcadoPlayerPoints) {
            ahorcadoPlayerPointsSpan.textContent = savedahorcadoPlayerPoints;
        }
    }

    function reiniciarJuego() {
        guardarEstadoJuego();
        location.reload();
        cargarEstadoJuego();
    }

    cargarEstadoJuego();
});
