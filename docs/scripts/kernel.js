$(document).ready(function () {
    var errores, correctos, hiddenword, words, fails;

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
    }

    function cadenaPermitida(cadena) {
        let expresion = '';

        cadena = cadena.toLowerCase();
        expresion = /^[a-zñ ]+$/;

        if (expresion.test(cadena)) {
            return true;
        } else {
            return false;
        }
    }

    function verifyWords(letra) {
        letra = letra.toLowerCase();

        if (words.indexOf(letra) != -1) {
            return true;
        } else {
            return false;
        }
    }

    function verificarLetra(letra) {
        letra = letra.toLowerCase();

        if (hiddenword.indexOf(letra) != -1) {
            return true;
        } else {
            return false;
        }
    }

    function establecerEspacios() {
        let html = '';

        for (let i = 0; i < hiddenword.length; i++) {
            if (hiddenword.charAt(i) == ' ') {
                html += `
                <span class='espacio'>_</span>
                `;
            } else {
                html += `
                <span class='letra'>_</span>
                `;
            }
        }

        $('#palabra').html(html);
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
                html += `
                    <span class='espacio'>${hiddenword.charAt(i)}</span>
                `;
            } else {
                html += `
                    <span class='letra letra-${opcion}'>${hiddenword.charAt(i)}</span>
                `;
            }
        }

        $('#palabra').html(html);
    }

    function incluirLetra(letra) {
        let numero_span = 0;

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

        if (errores == 4) {
            perdida();
        }
    }

    function gane() {
        $('#probar_letra').attr('disabled', true);
        $('#boton_probar').attr('disabled', true);
        $('#adivinar').attr('disabled', true);
        $('#boton_adivinar').attr('disabled', true);
        let imagenPath = './docs/images/composite/triunfo.png';
        $('#imagen_ahorcado').attr('src', imagenPath);
        mostrarPalabra('gane');
    }

    function perdida() {
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
            } else {
                $('#etiqueta_mensaje').html('Datos Incorrectos');
                $('#cuerpo_mensaje').html('La palabra debe contener caracteres de la A a la Z únicamente.');
                $('#mensaje').modal('show')

                $('#mensaje').on('hidden.bs.modal', function () {
                    input_hiddenword.val('');
                    input_hiddenword.focus();
                })
            }
        } else {
            $('#etiqueta_mensaje').html('Datos Incorrectos');
            $('#cuerpo_mensaje').html('Debe escribir la palabra secreta.');
            $('#mensaje').modal('show')

            $('#mensaje').on('hidden.bs.modal', function () {
                input_hiddenword.focus();
            })
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
                            incluirFallo(input_probar_letra.val())
                        }

                        input_probar_letra.val('');
                        input_probar_letra.focus();
                    } else {
                        $('#etiqueta_mensaje').html('Datos Incorrectos');
                        $('#cuerpo_mensaje').html('La letra ya ha sido probada.');
                        $('#mensaje').modal('show')

                        $('#mensaje').on('hidden.bs.modal', function () {
                            input_probar_letra.val('');
                            input_probar_letra.focus();
                        })
                    }
                } else {
                    $('#etiqueta_mensaje').html('Datos Incorrectos');
                    $('#cuerpo_mensaje').html('Sólo se permiten caracteres de la A a la Z únicamente.');
                    $('#mensaje').modal('show')

                    $('#mensaje').on('hidden.bs.modal', function () {
                        input_probar_letra.val('');
                        input_probar_letra.focus();
                    })
                }
            } else {
                $('#etiqueta_mensaje').html('Datos Incorrectos');
                $('#cuerpo_mensaje').html('Debe escribir la letra a probar.');
                $('#mensaje').modal('show')

                $('#mensaje').on('hidden.bs.modal', function () {
                    input_hiddenword.focus();
                })
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
                $('#mensaje').modal('show')

                $('#mensaje').on('hidden.bs.modal', function () {
                    input_adivinar.val('');
                    input_adivinar.focus();
                })
            }
        } else {
            $('#etiqueta_mensaje').html('Datos Incorrectos');
            $('#cuerpo_mensaje').html('Debe escribir la palabra a adivinar.');
            $('#mensaje').modal('show')

            $('#mensaje').on('hidden.bs.modal', function () {
                input_adivinar.focus();
            })
        }
    }

    function finalizar() {
        //desactivada y reemplazada por la siguiente accion. modo prueba inicializar();
        location.reload();
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
    }

    main();
});