"use strict"
//Importaciones

//LocalStorage
import { body, avatarMenu, avatarCogiguracion, avatarNombre, preImagen1, preImagen2, preImagen3, obtenerJsonIDF } from "./nav-superior.js"

//Declaraciones


//funciones
const generaNumeroAlAzar = (numero) => {
    let numeroAzar = Math.round(Math.random() * numero) || numero;
    return numeroAzar
}

//Elige al azar un avatar si no hay guardados
const cargarDeAvatar = () =>{
    let genero = localStorage.getItem("avatarGenero");

    if ( !genero ) {
        let generoAlAzar = generaNumeroAlAzar(2);
        generoAlAzar == 1 ? generoAlAzar = "mujer" : generoAlAzar = "hombre";
        genero = generoAlAzar;
    }

    avatarMenu.setAttribute("src", `./images/avatares/avatar-${genero}__blanco.svg`);
    avatarCogiguracion.setAttribute("src", `./images/avatares/avatar-${genero}__blanco.svg`);
}

//Elige al azar un fondo de imagen al entrar si no hay guardados
const cargarDeFondo = () =>{
    let src = localStorage.getItem("imagenDeFondo");
    if ( !src ) {   
        let numeroAzar = generaNumeroAlAzar(8);
        body.style.backgroundImage = `url(./images/imagenes-de-fondo/${(numeroAzar)}.jpg)`
    }
    else {
        body.style.backgroundImage = `url(${src})`
    }
}

//Elige el pre fondo del menu de configuracion que eligio el usuario o los pone los por defecto
const cartgarPreFondo = async () => {
    let imagenElegida = localStorage.getItem("imagenDeFondo");
    let numeroDelElegido = parseInt( imagenElegida.slice(-5,-4) );
    let preI1 = numeroDelElegido - 1 ;
    let preI2 = numeroDelElegido + 1 ;

    let dataJsonIDF = await obtenerJsonIDF();      

    if ( preI1 < 1 ) preI1 = dataJsonIDF.length ;
    if ( preI2 > dataJsonIDF.length -1 ) preI2 = 1;

    preImagen2.setAttribute("src", imagenElegida)
    preImagen1.setAttribute("src", `./images/imagenes-de-fondo/${preI1}.jpg`)
    preImagen3.setAttribute("src", `./images/imagenes-de-fondo/${preI2}.jpg`)
}
cartgarPreFondo()

// -- ./nav-superior.js --
cargarDeAvatar()
avatarNombre.textContent = localStorage.getItem( "nombreAvatar" ) || "Anonimo001";
cargarDeFondo()



