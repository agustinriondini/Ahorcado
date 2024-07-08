document.addEventListener('DOMContentLoaded', function() {
    var rebootButton = document.getElementById("play");
    var rebootBtn = document.getElementById("boton_finalizar");
    var player1Input = document.getElementById("player1");
    var avatarPlayer1Input = document.getElementById("avatarPlayer1");
    var playerPointsSpan = document.getElementById("playerPoints");
    var bodyBackground = document.body.style.backgroundImage;
    
    
    rebootButton.addEventListener("click", function() {
        guardarEstadoJuego();
        reiniciarJuego();
    });
    
    rebootBtn.addEventListener("click", function() {
        guardarEstadoJuego();
        reiniciarJuego();
    });
    function guardarEstadoJuego() {
        // Guardar el contenido de gameDataSection
        var gameDataSectionContent = document.getElementById("gameDataSection").innerHTML;
        localStorage.setItem('gameDataSectionContent', gameDataSectionContent);
        
        // Guardar mesa elegida
        var bodyBackgroundImage = getComputedStyle(document.body).backgroundImage;
        localStorage.setItem('bodyBackgroundImage', bodyBackgroundImage);

        // Guardar datos del jugador
        var player1 = player1Input.value;
        var avatarPlayer1 = avatarPlayer1Input.src;
        var playerPoints = playerPointsSpan.textContent;

        localStorage.setItem('player1', player1);
        localStorage.setItem('avatarPlayer1', avatarPlayer1);
        localStorage.setItem('playerPoints', playerPoints);
    }

    function cargarEstadoJuego() {
        // Cargar el contenido de gameDataSection
        var savedGameDataSectionContent = localStorage.getItem('gameDataSectionContent');
        if (savedGameDataSectionContent) {
            document.getElementById("gameDataSection").innerHTML = savedGameDataSectionContent;
        }

        // Cargar la mesa elegida
        var savedBodyBackgroundImage = localStorage.getItem('bodyBackgroundImage');
        if (savedBodyBackgroundImage) {
            document.body.style.backgroundImage = savedBodyBackgroundImage;
        }

        // Cargar datos del jugador
        var savedplayer1 = localStorage.getItem('player1');
        var savedavatarPlayer1 = localStorage.getItem('avatarPlayer1');
        var savedPlayerPoints = localStorage.getItem('playerPoints');

        if (savedplayer1) {
            player1Input.value = savedplayer1;
        }
        if (savedavatarPlayer1) {
            avatarPlayer1Input.src = savedavatarPlayer1;
        }
        if (savedPlayerPoints) {
            playerPointsSpan.textContent = savedPlayerPoints;
        }
    }

    function reiniciarJuego() {
        guardarEstadoJuego();
        location.reload();
        cargarEstadoJuego();
    }

    cargarEstadoJuego();
});
