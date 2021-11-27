"use strict"

// Importaciones
import { body, avatarMenu, avatarCogiguracion, nombreUsuario, nombreUsuarioMenuConf, preImagen1, preImagen2, preImagen3, obtenerJsonIDF } from "./nav-superior.js";
import { main } from "./main.js";

// Declaraciones

const loader = document.getElementById("container-loader");

// funciones
export const generaNumeroAlAzar = (numero) => {
    let numeroAzar = Math.round(Math.random() * numero) || numero;
    return numeroAzar
}

// Elige al azar un avatar si no hay guardados
const cargarDeAvatar = () =>{
    let genero = localStorage.getItem("avatarGenero");
    let color = localStorage.getItem("tema") || "tema-predeterminado";

    if ( !genero ) {
        let generoAlAzar = generaNumeroAlAzar( 2 );
        generoAlAzar == 1 ? generoAlAzar = "mujer" : generoAlAzar = "hombre";
        genero = generoAlAzar;
    }

    avatarMenu.setAttribute("src", `./imagenes/avatares/avatar-${genero}__${color}.svg`);
    avatarCogiguracion.setAttribute("src", `./imagenes/avatares/avatar-${genero}__${color}.svg`);
}

// Carga el nombre de usuiario y si es muy largo lo edita para mostrar acortado
const cargarNombreUsuario = () => {
    let nombre = localStorage.getItem("nombreAvatar");
    if ( nombre !== null  ) {     
        // para nav superior
        nombreUsuarioMenuConf.textContent = nombre;

        if ( nombre.length > 15 ) nombre = ( nombre.slice( 0, 15 ) + "..." ) 
        // para nav inferior
        nombreUsuario.textContent = nombre;
    }
}

// Elige al azar un fondo de imagen al entrar si no hay guardados
const cargarDeFondo = () =>{
    let src = localStorage.getItem("imagenDeFondo");
    if ( !src ) {   
        let numeroAzar = generaNumeroAlAzar(18);
        main.style = 
        `background-image: url(./imagenes/imagenes-de-fondo/${(numeroAzar)}.jpg);
        background-size: cover;
        background-position-x: center;
        background-repeat: no-repeat; `;
    }
    else {
        main.style = `background-image: url(${src});
        background-size: cover;
        background-position-x: center;
        background-repeat: no-repeat;`
    }
}

// Elige el pre fondo del menu de configuracion que eligio el usuario o los pone los por defecto
const cartgarPreFondo = async () => {
    // // obtiene el numero de la imagend de fondo para centrar las pre imagenes segun esa imagen
    // let imagenElegida = localStorage.getItem("imagenDeFondo");
    
    // if ( imagenElegida ) imagenElegida = imagenElegida.slice(-6,-4);
    // else imagenElegida = main.style.backgroundImage.slice(-8,-6);

    // if ( imagenElegida[0] == "/" ) imagenElegida = imagenElegida[1];
    // imagenElegida =  parseInt(imagenElegida);
    // let preI1 = imagenElegida - 1 ;
    // let preI2 = imagenElegida + 1 ;

    // let dataJsonIDF = await obtenerJsonIDF();      

    // if ( preI1 < 1 ) preI1 = dataJsonIDF.length ;
    // if ( preI2 > dataJsonIDF.length ) preI2 = 1;

    // preImagen2.setAttribute("src", `./imagenes/imagenes-de-fondo/${imagenElegida}.jpg`);
    // preImagen1.setAttribute("src", `./imagenes/imagenes-de-fondo/${preI1}.jpg`);
    // preImagen3.setAttribute("src", `./imagenes/imagenes-de-fondo/${preI2}.jpg`);

    preImagen1.setAttribute("src", `./imagenes/imagenes-de-fondo/1.jpg`);
    preImagen2.setAttribute("src", `./imagenes/imagenes-de-fondo/2.jpg`);
    preImagen3.setAttribute("src", `./imagenes/imagenes-de-fondo/3.jpg`);
}

const cargarTema = () => {
    let tema = localStorage.getItem("tema") || "tema-predeterminado";
    body.classList.add(tema);
}

cargarDeFondo();
cargarDeAvatar();
cargarTema();
cargarNombreUsuario();
body.style.fontSize = localStorage.getItem("fuente");

// Evento

addEventListener("DOMContentLoaded" ,() => {
    setTimeout(() => {
        loader.classList.remove("activo-loader");
    }, 500);
    cartgarPreFondo();
})

