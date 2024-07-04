function showAjustes() {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("ajustes").style.display = "flex";
}
// vuelve al menu principal del togglemenu
function backToMainMenu() {
    document.getElementById("mainMenu").style.display = "flex";
    document.getElementById("ajustes").style.display = "none";
    document.getElementById("aboutGame").style.display = "none";
}
// vuelve al menu dentro de ajustes
function backToSettings() {
    document.getElementById("avatarsBox").style.display = "none";
    document.getElementById("mesasBox").style.display = "none";
    document.getElementById("helpBox").style.display = "none";
    document.getElementById("cheats").style.display = "none";
    document.getElementById("estadisticas").style.display = "none";
    document.getElementById("ajustes").style.display = "flex"; 
}
//cierra todos los menu y submenu del juego. utilizada para el registro de cambios y evitar superposiciones visuales.
function cleanScreen(){
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("ajustes").style.display = "none";
    document.getElementById("estadisticas").style.display = "none";
    document.getElementById("avatarsBox").style.display = "none";
    document.getElementById("mesasBox").style.display = "none";
    document.getElementById("helpBox").style.display = "none";
    document.getElementById("aboutGame").style.display = "none";
    document.getElementById("menuToggle").style.display = "none";
}
//Reset de estadisticas
function borrarPuntaje() {
    localStorage.clear();
    alert("Metricas reestablecidas.");
    location.reload();
}
//Cambiar nombre del jugador
function editarNombreJugador() {
    var nuevoNombre = prompt("Ingrese un nombre");
    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
        document.getElementById("player1").textContent = nuevoNombre;
    } else {
        alert("El nombre no puede estar vacio!!!");
        //forzar nombre, no permitir campo vacio
        return editarNombreJugador();
    }
}
//Cambio de avatar
function mostrarAvatars() {
    document.getElementById("avatarsBox").style.display = "flex";
    document.getElementById("ajustes").style.display = "none";
    document.getElementById("menuToggle").style.display = "none";
}

function pushAvatar(element) {
    var avatarURL = element.src;
    document.getElementById("avatarPlayer1").style.backgroundImage = "url('" + avatarURL + "')";

}
//Cambio de mesa
function mostrarMesas() {
    document.getElementById("mesasBox").style.display = "flex";
    document.getElementById("ajustes").style.display = "none";
    document.getElementById("menuToggle").style.display = "none";
}

function pushBackground(element) {
    var mesaURL = element.src;
    document.getElementById("body").style.backgroundImage = "url('" + mesaURL + "')";

}
//Boton ayuda menu
function helpme(){
    document.getElementById("helpBox").style.display = "flex";
    document.getElementById("ajustes").style.display = "none";
}
//Boton tyc menu
function tyc() {
    var popup = document.getElementById("popup");
    popup.style.display = "flex";
    document.getElementById("ajustes").style.display = "none";
    document.getElementById("menuToggle").style.display = "flex";
}
//Boton Mi puntaje
function estadisticas(){
    document.getElementById("estadisticas").style.display = "flex";
    document.getElementById("ajustes").style.display = "none";

}
//funcion de cierre especifica del area de estadisticas
function closeAll(){
    document.getElementById("estadisticas").style.display = "none";
    document.getElementById("menuToggle").style.display = "flex";
}
function openQlosucio(){
    window.location.href = 'https://agustinriondini.github.io/qlosucio/'; 
}
function newGameIntro() {
    document.getElementById("aboutGame").style.display = "flex";
    document.getElementById("mainMenu").style.display = "none";
    fetch('Resources/JarSoft/ahorcado.txt')
        .then(response => response.text())
        .then(text => {
            var gameInfoElement = document.getElementById("elAhorcadoGameInfo");
            gameInfoElement.innerHTML = text;
        })
        .catch(error => {
            console.error('Error 101! No se puede cargar la información solicitada', error);
        });
}
function newRules() {
    document.getElementById("aboutGame").style.display = "flex";
    document.getElementById("mainMenu").style.display = "none";
    fetch('Resources/JarSoft/reglas.txt')
        .then(response => response.text())
        .then(text => {
            var gameInfoElement = document.getElementById("elAhorcadoGameInfo");
            gameInfoElement.innerHTML = text;
        })
        .catch(error => {
            console.error('Error 101! No se puede cargar la información solicitada', error);
        });
}
function displayChanges() {
    cleanScreen();
    document.getElementById("changelog").style.display = "flex";
        fetch('Resources/JarSoft/changelog.txt')
        .then(response => response.text())
        .then(text => {
            var gameInfoElement = document.getElementById("changelogData");
            gameInfoElement.innerHTML = text;
        })
        .catch(error => {
            console.error('Error 101! No se puede cargar la información solicitada', error);
        });
}

function closechangelog(){
    document.getElementById("changelog").style.display = "none";
    document.getElementById("menuToggle").style.display = "flex";  
}
function menuTrucos(){
    document.getElementById("cheats").style.display = "flex";
    document.getElementById("ajustes").style.display = "none";
}
//botones meta

function redirectFb(){
    window.open('https://www.facebook.com/agustin.riondini.94', '_blank');
}

function redirectInsta(){
    window.open('https://www.instagram.com/agustinriondini/', '_blank');
}

function redirectGh(){
    window.open('https://github.com/agustinriondini', '_blank');
}

function redirectLin(){
    window.open('https://www.linkedin.com/in/juan-agustin-riondini-2226a6195/', '_blank');
}
function pushversion() {
    window.location.href = './index-old.html';
}