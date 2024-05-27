$(document).ready(function () {
    var errores, correctos, hiddenword, words, fails;
    var tiempoRestante = 45;
    var temporizadorInterval;
    var erroresMaximos = 4;

    function inicializar() {
        errores = 0;
        correctos = 0;
        hiddenword = '';
        words = '';
        fails = '';

        $('#imagen_ahorcado').attr('src', './docs/images/composite/starter_image.png');
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
        detenerTemporizador(); // Asegurarse de que no haya un temporizador corriendo
        if (!$('#tempo').prop('checked')) {
            temporizadorInterval = setInterval(function() {
                // Reducir el tiempo restante
                tiempoRestante--;

                // Actualizar el temporizador en el DOM
                $('#temporizador').text('Tiempo restante: ' + tiempoRestante);

                // Verificar si el tiempo ha llegado a cero
                if (tiempoRestante <= 0) {
                    clearInterval(temporizadorInterval);
                    perdida(); // Llamar a la función perdida cuando se acabe el tiempo
                }
            }, 1000);
        }
    }

    // Función para detener el temporizador
    function detenerTemporizador() {
        clearInterval(temporizadorInterval);
    }

    function cadenaPermitida(cadena) {
        let expresion = '';
        cadena = cadena.toLowerCase();
        expresion = /^[a-zñ ]+$/;
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
        let lista_span = $('span');
        for (let i = 0; i < lista_span.length; i++) {
            if (i == indice) {
                lista_span[i].innerHTML = letra;
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
        for (let i = 0; i < hiddenword.length; i++) {
            if (hiddenword.charAt(i) == letra) {
                correctos++;
                escribirSpan(i, letra);
                words += letra;
            }
        }
        if (correctos == hiddenword.replace(new RegExp(' ', 'g'), '').length) {
            gane();
        }
    }

    function incluirFallo(letra) {
        let div_fails = $('#fails'),
            html = div_fails.html();
        letra = letra.toLowerCase();
        errores++;
        fails += letra;
        words += letra;
        let imagenPath = `./docs/images/composite/starter_image${errores}_fallos.png`;
        $('#imagen_ahorcado').attr('src', imagenPath);  
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

    function gane() {
        detenerTemporizador();
        $('#probar_letra').attr('disabled', true);
        $('#boton_probar').attr('disabled', true);
        $('#adivinar').attr('disabled', true);
        $('#boton_adivinar').attr('disabled', true);
        let imagenPath = './docs/images/composite/triunfo.png';
        $('#imagen_ahorcado').attr('src', imagenPath);
        mostrarPalabra('gane');
    }

    function perdida() {
        detenerTemporizador();
        $('#probar_letra').attr('disabled', true);
        $('#boton_probar').attr('disabled', true);
        $('#adivinar').attr('disabled', true);
        $('#boton_adivinar').attr('disabled', true);
        let imagenPath = './docs/images/composite/starter_image4_fallos.png';
        $('#imagen_ahorcado').attr('src', imagenPath);
        mostrarPalabra('perdida');
    }

    function iniciar() {
        let input_hiddenword = $('#hiddenword');
        if (input_hiddenword.val().length > 0) {
            if (cadenaPermitida(input_hiddenword.val())) {
                hiddenword = input_hiddenword.val().toLowerCase();
                input_hiddenword.attr("disabled", true);
                input_hiddenword.attr("type", "password");
                $('#boton_iniciar').attr("disabled", true);
                $('#probar_letra').attr("disabled", false);
                $('#boton_probar').attr("disabled", false);
                $('#adivinar').attr("disabled", false);
                $('#boton_adivinar').attr("disabled", false);
                establecerEspacios();
                $('#probar_letra').focus();
                verificarCheckboxes(); // Verificar el estado de los checkboxes y ajustar el juego en consecuencia
                iniciarTemporizador(); // Iniciar el temporizador al iniciar el juego
            } else {
                $('#etiqueta_mensaje').html('Datos Incorrectos');
                $('#cuerpo_mensaje').html('La palabra debe contener caracteres de la A a la Z únicamente.');
                $('#mensaje').modal('show');
                $('#mensaje').on('hidden.bs.modal', function () {
                    input_hiddenword.val('');
                    input_hiddenword.focus();
                });
            }
        } else {
            $('#etiqueta_mensaje').html('Datos Incorrectos');
            $('#cuerpo_mensaje').html('Debe escribir la palabra secreta.');
            $('#mensaje').modal('show');
            $('#mensaje').on('hidden.bs.modal', function () {
                input_hiddenword.focus();
            });
        }
    }

    function probarLetra() {
        let input_probar_letra = $('#probar_letra');
        if (input_probar_letra.val() != ' ') {
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
                        $('#etiqueta_mensaje').html('Datos Incorrectos');
                        $('#cuerpo_mensaje').html('La letra ya ha sido probada.');
                        $('#mensaje').modal('show');
                        $('#mensaje').on('hidden.bs.modal', function () {
                            input_probar_letra.val('');
                            input_probar_letra.focus();
                        });
                    }
                } else {
                    $('#etiqueta_mensaje').html('Datos Incorrectos');
                    $('#cuerpo_mensaje').html('Sólo se permiten caracteres de la A a la Z únicamente.');
                    $('#mensaje').modal('show');
                    $('#mensaje').on('hidden.bs.modal', function () {
                        input_probar_letra.val('');
                        input_probar_letra.focus();
                    });
                }
            } else {
                $('#etiqueta_mensaje').html('Datos Incorrectos');
                $('#cuerpo_mensaje').html('Debe escribir la letra a probar.');
                $('#mensaje').modal('show');
                $('#mensaje').on('hidden.bs.modal', function () {
                    input_probar_letra.focus();
                });
            }
        } else {
            input_probar_letra.val('');
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
                $('#etiqueta_mensaje').html('Datos Incorrectos');
                $('#cuerpo_mensaje').html('Sólo se permiten caracteres de la A a la Z únicamente.');
                $('#mensaje').modal('show');
                $('#mensaje').on('hidden.bs.modal', function () {
                    input_adivinar.val('');
                    input_adivinar.focus();
                });
            }
        } else {
            $('#etiqueta_mensaje').html('Datos Incorrectos');
            $('#cuerpo_mensaje').html('Debe escribir la palabra a adivinar.');
            $('#mensaje').modal('show');
            $('#mensaje').on('hidden.bs.modal', function () {
                input_adivinar.focus();
            });
        }
    }

    function finalizar() {
        detenerTemporizador();
        location.reload();
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

    function main() {
        inicializar();
        $('#boton_iniciar').click(iniciar);
        $('#boton_probar').click(probarLetra);
        $('#boton_finalizar').click(finalizar);
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
