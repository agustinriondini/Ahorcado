document.addEventListener('DOMContentLoaded', function () {
    function openMenu() {
        const manto = document.getElementById('manto');
        const menuWrapper = document.getElementById('menuwrapper');

        if (manto.style.display === 'none' || manto.style.display === '') {
            manto.style.display = 'flex';
        } else {
            manto.style.display = 'none';
        }

        if (menuWrapper.style.display === 'none' || menuWrapper.style.display === '') {
            menuWrapper.style.display = 'flex';
        } else {
            menuWrapper.style.display = 'none';
        }
    }

    function closeMenu() {
        document.getElementById('manto').style.display = 'none';
        document.getElementById('menuwrapper').style.display = 'none';
    }

    function back() {
        document.getElementById('trucos').style.display = 'none';
        document.getElementById('menuwrapper').style.display = 'flex';
    }

    function play() {
        document.getElementById('manto').style.display = 'none';
        document.getElementById('menuwrapper').style.display = 'none';
    }

    function menutrucos() {
        document.getElementById('menuwrapper').style.display = 'none';
        document.getElementById('trucos').style.display = 'flex';
    }   

    function pushversion() {
        window.location.href = './index-old.html';
    }

    function ocultarpresentacion() {
        const screen = document.getElementById('screen');
        screen.style.display = "none";
        // Guardar el tiempo en el que se oculta la pantalla
        localStorage.setItem('screenHiddenTime', Date.now());
        // Guardar el estado de ocultación
        localStorage.setItem('isScreenHidden', 'true');
        // Establecer un temporizador para mostrar la pantalla después de 40 minutos
        setTimeout(() => {
            localStorage.removeItem('isScreenHidden');
            location.reload();
        }, 40 * 60 * 1000); // 40 minutos en milisegundos
    }

    // Verificar si la pantalla debe estar oculta al cargar la página
    const isScreenHidden = localStorage.getItem('isScreenHidden');
    if (isScreenHidden === 'true') {
        const screenHiddenTime = parseInt(localStorage.getItem('screenHiddenTime'), 10);
        const currentTime = Date.now();
        const elapsedTime = currentTime - screenHiddenTime;

        if (elapsedTime < 40 * 60 * 1000) {
            // Mantener la pantalla oculta
            document.getElementById('screen').style.display = 'none';
            // Establecer un temporizador para mostrar la pantalla después del tiempo restante
            setTimeout(() => {
                localStorage.removeItem('isScreenHidden');
                location.reload();
            }, 40 * 60 * 1000 - elapsedTime);
        } else {
            // Restablecer el estado si ha pasado más de 40 minutos
            localStorage.removeItem('isScreenHidden');
        }
    }

    // Asignar funciones a los botones
    document.getElementById('toggleMenu').onclick = openMenu;
    document.querySelector('.controlBtn[onclick="closeMenu()"]').onclick = closeMenu;
    document.querySelector('.controlBtn[onclick="back()"]').onclick = back;
    document.querySelector('.menuBtn[onclick="play()"]').onclick = play;
    document.querySelector('.menuBtn[onclick="menutrucos()"]').onclick = menutrucos;
    document.querySelector('.menuBtn[onclick="tyc()"]').onclick = tyc; // Corregido el nombre de la función aquí
    document.querySelector('.menuBtn[onclick="pushversion()"]').onclick = pushversion;
    document.getElementById('activate').onclick = ocultarpresentacion;
});
