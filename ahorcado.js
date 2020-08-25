document.addEventListener('DOMContentLoaded', () => {

    //VARIABLES DEL DOM
    var ingresoUsuario = document.getElementById('ingreso');
    var boton1 = document.getElementById('juga');
    var palabraGuiones = document.getElementById('palabraIn');
    var cookies = document.getElementById('historial');
    var intentos = document.getElementById('intentos');
    var boton2 = document.getElementById('reinit');

    //ELEGIMOS UN ELEMENTO DEL ARRAY AL AZAR CON UNA FUNCION
    var palabraElegida;
    var arrayPalabraElegida = [];
    var arrayGuiones = [];
    function elegiPalabra() {
        //HACEMOS FOCO EN EL INPUT
        ingresoUsuario.focus();
        //ARRAY DE PALABRAS
        var palabras = ['gato', 'perro', 'rata', 'serpiente', 'iguana', 'cebra', 'jirafa'];
        //INDICE RANDOM
        var indice = Math.floor(Math.random() * palabras.length);
        //USAMOS EL INDICE PARA ELEGIR LA PALABRA
        palabraElegida = palabras[indice];
        //LA CONVERTIMOS EN UN ARRAY
        arrayPalabraElegida = palabraElegida.split('');
        //MOSTRAMOS EN PANTALLA LOS GUIONES=CANTIDADLETRAS DE PALABRA ELEGIDA
        for (var i = 0; i < arrayPalabraElegida.length; i++) {
            arrayGuiones.push('-');
        };
        //PARA QUE AL IMPRIMIRSE EN PANTALLA NO LE APAREZCAN LAS COMAS LE PONEMOS EL .JOIN(' ')

        palabraGuiones.textContent = arrayGuiones.join(' ');
        //RETORNAMOS LAS VARIABLES QUE VAMOS A USAR MAS ADELANTE
        return palabraElegida, arrayGuiones, arrayPalabraElegida;
    };
    //INICIAMOS LA FUNCION PARA QUE LA ELIJA
    elegiPalabra()
    //console.log(arrayGuiones);
    console.log(palabraElegida);
    // console.log(arrayPalabraElegida);

    var letraIngresada;
    var historial = [];
    var posicion;
    var posiciones = [];
    var chances = 6;
    intentos.textContent = chances;

    function jugar() {

        letraIngresada = ingresoUsuario.value;
        posicion = arrayPalabraElegida.indexOf(letraIngresada);

        if (arrayPalabraElegida.includes(letraIngresada)) {

            console.log(posicion)
            console.log(letraIngresada)
            //SUPONIENDO QUE HAY LETRAS REPETIDAS HAY QUE BUSCAR VARIOS INDICES
            while (posicion != -1) {
                //AÑADIMOS TODOS LOS INDICES DE LETRAS IGUALES A UN ARRAY
                posiciones.push(posicion);
                //UTILIZANDO EL, O LOS INDICES ENCONTRADOS Y REEMPLAZAMOS LOS GUIONES QUE SE MUESTRAN EN EL DOM
                arrayGuiones.splice(posicion, 1, letraIngresada);
                //ESTO FRENA EL BUCLE SI NO, NO PARA
                posicion = arrayPalabraElegida.indexOf(letraIngresada, posicion + 1);
                console.log(posiciones);
                //MOSTRAMOS EN EL DOM EL NUEVO ARRAY CON GUIONES PERO CON LAS LETRAS ADIVINADAS
                palabraGuiones.textContent = arrayGuiones.join(' ');
                console.log(arrayGuiones);
                //UNA VEZ HECHO LO ANTERIOR EL INPUT QUEDA VACIO Y HACEMOS FOCO EN EL
                ingresoUsuario.value = '';
                ingresoUsuario.focus();

            };
            //SI YA NO QUEDAN MAS GUIONES, GANASTE Y REINICIA
            if (arrayGuiones.indexOf('-') == -1) {
                alert('ganaste!!!!!')
                document.location.reload();
            };

        } else {
            //EN CASO DE FALLAR RESTAMOS UNA CHANCE
            chances = chances - 1;
            //AGREGAMOS AL HISTORIAL LA LETRA QUE FALLO
            historial.push(letraIngresada);
            //LE SACAMOS LAS COMAS Y LO MOSTRAMOS EN PANTALLA
            cookies.textContent = historial.join(' ');
            intentos.textContent = chances;
            //VACIAMOS EL INPUT Y HACEMOS FOCO EN EL
            ingresoUsuario.value = '';
            ingresoUsuario.focus();
        };

        //EN CASO DE QUEDARNOS SIN CHANCES, AVISAMOS
        if (chances == 0) {
            alert('perdiste bobo');
        };
    };
    //INICIAMOS EL JUEGO CON UN CLICK
    boton1.addEventListener('click', () => {
        jugar();
    });
    //INICIAMOS EL JUEGO CON UN ENTER
    ingresoUsuario.addEventListener('keyup', (e) => {
        if (e.keyCode == 13) {
            jugar();
        };
    });
    //REINICIAMOS TODO 
    boton2.addEventListener('click', () => {
        document.location.reload();
    });

});

