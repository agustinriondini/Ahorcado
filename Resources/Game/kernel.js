document.addEventListener('DOMContentLoaded', function() {
    var errores, correctos, hiddenword, words, fails;
    var tiempoRestante = 45;
    var temporizadorInterval;
    var erroresMaximos = 4;
    var acumuladorPartidasJugadas = localStorage.getItem('acumuladorPartidasJugadas') ? parseInt(localStorage.getItem('acumuladorPartidasJugadas')) : 0;
    

    function inicializar() {
        errores = 0;
        correctos = 0;
        hiddenword = '';
        words = '';
        fails = '';

        $('#imagen_ahorcado').attr('src', './Resources/Images/composite/starter_image.png');
        $('#palabra').html('');
        $('#fails').html('');

        $('#hiddenword').val('');
        $('#probar_letra').val('');
        $('#adivinar').val('');

        $('#hiddenword').attr("disabled", false);
        $('#hiddenword').attr("type", "text");
        $('#boton_iniciar').attr("disabled", false);

        $('#probar_letra').attr("disabled", true);
        $('#boton_probar').attr("disabled", true);

        $('#adivinar').attr("disabled", true);
        $('#boton_adivinar').attr("disabled", true);

        $('#hiddenword').focus();

        // Restaurar valores de los checkboxes desde local storage
        $('#tempo').prop('checked', localStorage.getItem('tempo') === 'true');
        $('#incrementarIntentos').prop('checked', localStorage.getItem('incrementarIntentos') === 'true');
        $('#revelarpalabra').prop('checked', localStorage.getItem('revelarpalabra') === 'true');

        // Verificar el estado de los checkboxes
        verificarCheckboxes();
    }

    // Función para iniciar el temporizador si tempo no está marcado
    function iniciarTemporizador() {
        detenerTemporizador();//resetea el temporizador

        // Restablecer el tiempo a 45 segundos
        tiempoRestante = 45;
        $('#temporizador').text('Tiempo restante: ' + tiempoRestante);

        if (!$('#tempo').prop('checked')) {
            temporizadorInterval = setInterval(function() {
                // Reducir el tiempo restante
                tiempoRestante--;

                // Actualizar el temporizador en el DOM
                $('#temporizador').text('Tiempo restante: ' + tiempoRestante);

                // Verificar si el tiempo ye es cero
                if (tiempoRestante <= 0) {
                    clearInterval(temporizadorInterval);
                    perdida();
                }
            }, 1000);
        }
    }

    // Función para parar el temporizador
    function detenerTemporizador() {
        clearInterval(temporizadorInterval);
    }

    function cadenaPermitida(cadena) {
        let expresion = /^[a-zñ ]+$/i;
        return expresion.test(cadena);
    }

    function verifyWords(letra) {
        letra = letra.toLowerCase();
        return words.indexOf(letra) !== -1;
    }

    function verificarLetra(letra) {
        letra = letra.toLowerCase();
        return hiddenword.indexOf(letra) !== -1;
    }

    function establecerEspacios() {
        let html = '';
        for (let i = 0; i < hiddenword.length; i++) {
            if (hiddenword.charAt(i) == ' ') {
                html += `<span class='espacio'>_</span> `;
            } else {
                html += `<span class='letra'>_</span> `;
            }
        }
        $('#palabra').html(html.trim());
    }

    function escribirSpan(indice, letra) {
        let lista_span = $('span.letra');
        for (let i = 0; i < lista_span.length; i++) {
            if (i == indice) {
                lista_span.eq(i).text(letra);
            }
        }
    }

    function mostrarPalabra(opcion) {
        let html = '';
        for (let i = 0; i < hiddenword.length; i++) {
            if (hiddenword.charAt(i) == ' ') {
                html += `<span class='espacio'>${hiddenword.charAt(i)}</span> `;
            } else {
                html += `<span class='letra letra-${opcion}'>${hiddenword.charAt(i)}</span> `;
            }
        }
        $('#palabra').html(html.trim());
    }

    function incluirLetra(letra) {
        letra = letra.toLowerCase();
        let letraEncontrada = false;
        for (let i = 0; i < hiddenword.length; i++) {
            if (hiddenword.charAt(i) == letra) {
                correctos++;
                escribirSpan(i, letra);
                words += letra;
                letraEncontrada = true;
            }
        }
        if (correctos == hiddenword.replace(new RegExp(' ', 'g'), '').length) {
            gane();
        }
        if (!letraEncontrada) {
            incluirFallo(letra); //por las dudas que la letra no se encuentre
        }
    }

    function incluirFallo(letra) {
        letra = letra.toLowerCase();
        errores++;
        fails += letra;
        words += letra;
        let imagenPath = `./Resources/Images/composite/starter_image${errores}_fallos.png`;
        $('#imagen_ahorcado').attr('src', imagenPath);

        let div_fails = $('#fails');
        let html = div_fails.html();
        if (html == '') {
            html = letra;
        } else {
            html += '-' + letra;
        }
        div_fails.html(html);

        if (errores == erroresMaximos) {
            perdida();
        }
    }

    function sumarPuntos() {
        var puntosSpan = document.getElementById("ahorcadoPlayerPoints");
        var puntosActuales = parseInt(puntosSpan.textContent) || 0;
        puntosSpan.textContent = puntosActuales + 1;
    }


    function gane() {
        detenerTemporizador();
        $('#probar_letra').attr('disabled', true);
        $('#boton_probar').attr('disabled', true);
        $('#adivinar').attr('disabled', true);
        $('#boton_adivinar').attr('disabled', true);
        let imagenPath = './Resources/Images/composite/triunfo.png';
        $('#imagen_ahorcado').attr('src', imagenPath);
        mostrarPalabra('gane');
        sumarPuntos();
        guardarEstadoJuego();
        acumuladorPartidasJugadas += 1;
        localStorage.setItem('acumuladorPartidasJugadas', acumuladorPartidasJugadas);
    }

    function perdida() {
        detenerTemporizador();
        $('#probar_letra').attr('disabled', true);
        $('#boton_probar').attr('disabled', true);
        $('#adivinar').attr('disabled', true);
        $('#boton_adivinar').attr('disabled', true);
        let imagenPath = './Resources/Images/composite/starter_image4_fallos.png';
        $('#imagen_ahorcado').attr('src', imagenPath);
        mostrarPalabra('perdida');
        guardarEstadoJuego();
        acumuladorPartidasJugadas +=1;
        localStorage.setItem('acumuladorPartidasJugadas', acumuladorPartidasJugadas);
    }

    function iniciar() {
        let input_hiddenword = $('#hiddenword');
        if (input_hiddenword.val().length > 0) {
            if (cadenaPermitida(input_hiddenword.val())) {
                hiddenword = input_hiddenword.val().toLowerCase();
                input_hiddenword.attr("disabled", true);
                $('#boton_iniciar').attr("disabled", true);
                $('#probar_letra').attr("disabled", false);
                $('#boton_probar').attr("disabled", false);
                $('#adivinar').attr("disabled", false);
                $('#boton_adivinar').attr("disabled", false);
                establecerEspacios();
                $('#probar_letra').focus();
                verificarCheckboxes(); // Verificar el estado de los checkboxes y ajustar el juego en base a esto
                iniciarTemporizador(); // Iniciar el temporizador al iniciar el juego
            } else {
                mostrarMensaje('Datos Incorrectos', 'La palabra debe contener caracteres de la A a la Z únicamente.');
                input_hiddenword.val('');
                input_hiddenword.focus();
            }
        } else {
            mostrarMensaje('Datos Incorrectos', 'Debe escribir la palabra secreta.');
            input_hiddenword.focus();
        }
    }

    function probarLetra() {
        let input_probar_letra = $('#probar_letra');
        if (input_probar_letra.val().length > 0) {
            if (cadenaPermitida(input_probar_letra.val())) {
                if (!verifyWords(input_probar_letra.val())) {
                    if (verificarLetra(input_probar_letra.val())) {
                        incluirLetra(input_probar_letra.val());
                    } else {
                        incluirFallo(input_probar_letra.val());
                    }
                    input_probar_letra.val('');
                    input_probar_letra.focus();
                } else {
                    mostrarMensaje('Datos Incorrectos', 'La letra ya ha sido probada.');
                    input_probar_letra.val('');
                    input_probar_letra.focus();
                }
            } else {
                mostrarMensaje('Datos Incorrectos', 'Sólo se permiten caracteres de la A a la Z únicamente.');
                input_probar_letra.val('');
                input_probar_letra.focus();
            }
        } else {
            mostrarMensaje('Datos Incorrectos', 'Debe escribir la letra a probar.');
            input_probar_letra.focus();
        }
    }

    function adivinar() {
        let input_adivinar = $('#adivinar');
        if (input_adivinar.val().length > 0) {
            if (cadenaPermitida(input_adivinar.val())) {
                if (input_adivinar.val().toLowerCase() == hiddenword) {
                    gane();
                } else {
                    perdida();
                }
            } else {
                mostrarMensaje('Datos Incorrectos', 'Sólo se permiten caracteres de la A a la Z únicamente.');
                input_adivinar.val('');
                input_adivinar.focus();
            }
        } else {
            mostrarMensaje('Datos Incorrectos', 'Debe escribir la palabra a adivinar.');
            input_adivinar.focus();
        }
    }

    function mostrarMensaje(titulo, mensaje) {
        $('#etiqueta_mensaje').html(titulo);
        $('#cuerpo_mensaje').html(mensaje);
        $('#mensaje').modal('show');
        $('#mensaje').on('hidden.bs.modal', function () {
            $('#probar_letra').focus();
        });
    }


    function verificarCheckboxes() {
        // Verificar si incrementarIntentos está marcado
        if ($('#incrementarIntentos').prop('checked')) {
            erroresMaximos = 9999999;
        } else {
            erroresMaximos = 4; // Valor por defecto
        }

        // Verificar si revelarpalabra está marcado
        if ($('#revelarpalabra').prop('checked')) {
            $('#hiddenword').attr("type", "text");
        } else {
            $('#hiddenword').attr("type", "password");
        }

        // Guardar el estado de los checkboxes en local storage
        localStorage.setItem('tempo', $('#tempo').prop('checked'));
        localStorage.setItem('incrementarIntentos', $('#incrementarIntentos').prop('checked'));
        localStorage.setItem('revelarpalabra', $('#revelarpalabra').prop('checked'));
    }

    function guardarEstadoJuego() {
    }

    function main() {
        inicializar();
        $('#boton_iniciar').click(iniciar);
        $('#boton_probar').click(probarLetra);
        $('#boton_adivinar').click(adivinar);

        $('#hiddenword').on("keydown", function (event) {
            if (event.which == 13) {
                iniciar();
            }
        });

        $('#probar_letra').on("keydown", function (event) {
            if (event.which == 13) {
                probarLetra();
            }
        });

        $('#adivinar').on("keydown", function (event) {
            if (event.which == 13) {
                adivinar();
            }
        });

        // Verificar cambios en los checkboxes
        $('#tempo, #incrementarIntentos, #revelarpalabra').change(verificarCheckboxes);
    }

    main();
});
