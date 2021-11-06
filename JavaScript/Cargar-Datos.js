"use strict"

//Importaciones
import { body, avatarMenu, avatarCogiguracion, nombreUsuario, nombreUsuarioMenuConf, preImagen1, preImagen2, preImagen3, obtenerJsonIDF } from "./nav-superior.js";

//Declaraciones

//funciones
export const generaNumeroAlAzar = (numero) => {
    let numeroAzar = Math.round(Math.random() * numero) || numero;
    return numeroAzar
}

//Elige al azar un avatar si no hay guardados
const cargarDeAvatar = () =>{
    let genero = localStorage.getItem("avatarGenero");
    let color = localStorage.getItem("tema") || "tema-predeterminado";

    if ( !genero ) {
        let generoAlAzar = generaNumeroAlAzar( 2 );
        generoAlAzar == 1 ? generoAlAzar = "mujer" : generoAlAzar = "hombre";
        genero = generoAlAzar;
    }

    avatarMenu.setAttribute("src", `./images/avatares/avatar-${genero}__${color}.svg`);
    avatarCogiguracion.setAttribute("src", `./images/avatares/avatar-${genero}__${color}.svg`);
}

//Carga el nombre de usuiario y si es muy largo lo edita para mostrar acortado
const cargarNombreUsuario = () => {
    let nombre = localStorage.getItem("nombreAvatar") || "Anonimo001";
    if ( nombre.length > 15 ) nombre = (nombre.slice( 0, 15 ) + "...");
    nombreUsuario.textContent = nombre;
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

    // obtiene el numero de la imagend de fondo para centrar las pre imagenes segun esa imagen
    imagenElegida = parseInt(body.style.backgroundImage.slice(-7,-6)) ;
    let preI1 = imagenElegida - 1 ;
    let preI2 = imagenElegida + 1 ;

    let dataJsonIDF = await obtenerJsonIDF();      

    if ( preI1 < 1 ) preI1 = dataJsonIDF.length ;
    if ( preI2 > dataJsonIDF.length ) preI2 = 1;

    preImagen2.setAttribute("src", `./images/imagenes-de-fondo/${imagenElegida}.jpg`);
    preImagen1.setAttribute("src", `./images/imagenes-de-fondo/${preI1}.jpg`);
    preImagen3.setAttribute("src", `./images/imagenes-de-fondo/${preI2}.jpg`);
}

const cargarTema = () => {
    let tema = localStorage.getItem("tema") || "tema-predeterminado";
    body.classList.add(tema);
}

cargarDeAvatar();
nombreUsuarioMenuConf.textContent = localStorage.getItem("nombreAvatar") || "Anonimo001";
cargarNombreUsuario();
cargarDeFondo();
cartgarPreFondo();
cargarTema();
body.style.fontSize = localStorage.getItem("fuente");


