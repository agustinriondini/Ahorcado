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

    

    // Asignar funciones a los botones
    document.getElementById('toggleMenu').onclick = openMenu;
    document.querySelector('.controlBtn[onclick="closeMenu()"]').onclick = closeMenu;
    document.querySelector('.controlBtn[onclick="back()"]').onclick = back;
    document.querySelector('.menuBtn[onclick="play()"]').onclick = play;
    document.querySelector('.menuBtn[onclick="menutrucos()"]').onclick = menutrucos;
    document.querySelector('.menuBtn[onclick="pushversion()"]').onclick = pushversion;
    
});
